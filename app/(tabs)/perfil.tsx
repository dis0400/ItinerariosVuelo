import { useState, useEffect } from 'react';
import { Button,Layout, Text, Card, Input } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useVuelos } from '@/components/VuelosContext';
import AvionLoader from '@/components/AvionLoader';
import ErrorScreen from '@/components/ErrorScreen';


export default function PerfilScreen() {
  const { vuelos, loading, error, retry } = useVuelos();
  const [nombre, setNombre] = useState('');
  const [base, setBase] = useState('');
  const router = useRouter();

const cerrarSesion = async () => {
  await AsyncStorage.clear(); 
  router.replace('../auth/login'); 
};


  // Cargar desde AsyncStorage
  useEffect(() => {
    const cargarDatos = async () => {
      const nombreGuardado = await AsyncStorage.getItem('nombreTripulante');
      const baseGuardada = await AsyncStorage.getItem('baseTripulante');
      if (nombreGuardado) setNombre(nombreGuardado);
      else setNombre('Bugs Bunny');
      if (baseGuardada) setBase(baseGuardada);
      else setBase('La Paz (LPB)');
    };
    cargarDatos();
  }, []);

  // Guardar en AsyncStorage y Backend
  useEffect(() => {
    const guardar = async () => {
      if (nombre) await AsyncStorage.setItem('nombreTripulante', nombre);
      if (base) await AsyncStorage.setItem('baseTripulante', base);
    };
    guardar();

    // Enviar al backend
    if (nombre && base) {

        fetch('http://192.168.87.22:3000/tripulantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, base }),
      }).catch(() => {
        Alert.alert('Advertencia', 'No se pudo guardar el perfil en el servidor.');
      });
    }
  }, [nombre, base]);

  if (loading) return <AvionLoader />;
  if (error) return <ErrorScreen mensaje={error} onRetry={retry} />;

  const vuelosAsignados = vuelos.filter(v => v.nombreTripulante === nombre);
  const rutasSeleccionadas = vuelosAsignados.map(v => `${v.origen} ➜ ${v.destino}`);
  const notificaciones = vuelosAsignados.map(v => (
    `Vuelo ${v.origen} → ${v.destino} a las ${new Date(v.horaSalidaUTC).toLocaleTimeString()}`
  ));

  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text category="h4" style={{ marginBottom: 20 }}>
          Resumen del Tripulante
        </Text>

        <Card style={{ marginBottom: 16 }}>
          <Text category="s1" style={{ marginBottom: 5 }}>Nombre:</Text>
          <Input value={nombre} onChangeText={setNombre} />

          <Text category="s1" style={{ marginTop: 10, marginBottom: 5 }}>Base Operativa:</Text>
          <Input value={base} onChangeText={setBase} />

          <Text category="s1" style={{ marginTop: 10 }}>Diferencia Horaria Actual:</Text>
          <Text>-4 horas (respecto a Zulu)</Text>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Text category="s1">Rutas Seleccionadas:</Text>
          {rutasSeleccionadas.length === 0 ? (
            <Text appearance="hint">No se han seleccionado rutas.</Text>
          ) : (
            rutasSeleccionadas.map((ruta, i) => (
              <Text key={i}>• {ruta}</Text>
            ))
          )}
        </Card>

        <Card>
          <Text category="s1">Últimas Notificaciones:</Text>
          {notificaciones.length === 0 ? (
            <Text appearance="hint">No hay notificaciones recientes.</Text>
          ) : (
            notificaciones.slice(0, 3).map((n, i) => (
              <Text key={i}>• {n}</Text>
            ))
          )}
        </Card>
        <Button 
          status="danger" 
          style={{ marginTop: 30 }} 
          onPress={cerrarSesion}>
          Cerrar Sesión
        </Button>

      </ScrollView>
    </Layout>
  );
}

export const unstable_settings = {
  title: 'Perfil',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="person-outline" size={size} color={color} />
  ),
};
