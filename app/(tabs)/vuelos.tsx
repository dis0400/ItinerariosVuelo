import { useState } from 'react';
import { ToastAndroid, Platform, Alert, ScrollView } from 'react-native';
import { Layout, Text, Card, Button } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useVuelos } from '@/components/VuelosContext';
import AvionLoader from '@/components/AvionLoader';
import ErrorScreen from '@/components/ErrorScreen';


const usuario = "Bugs Bunny";

const mostrarToast = (mensaje: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(mensaje, ToastAndroid.SHORT);
  } else {
    Alert.alert('Confirmación', mensaje);
  }
};

export default function VuelosScreen() {
  const {
    vuelos,
    setVuelos,
    loading,
    error,
    retry,
    rutasSeleccionadas,
    setRutasSeleccionadas
  } = useVuelos();

  const vuelosDisponibles = vuelos.filter(v => v.nombreTripulante?.trim() !== usuario);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const router = useRouter();

  if (loading) return <AvionLoader />;
  if (error) return <ErrorScreen mensaje={error} onRetry={retry} />;

  const toggleSeleccion = (id: number) => {
    const actualizado = vuelos.map(v => {
      if (v.id === id) {
        const yaAsignado = v.nombreTripulante === usuario;
        mostrarToast(yaAsignado ? 'Vuelo eliminado del itinerario' : 'Vuelo añadido al itinerario');

        if (yaAsignado) {
          // Eliminar de rutas seleccionadas
          setRutasSeleccionadas(prev => prev.filter(r => r.id !== id));
        } else {
          // Agregar a rutas seleccionadas
          setRutasSeleccionadas(prev => [...prev, v]);
        }

        return {
          ...v,
          nombreTripulante: yaAsignado ? "" : usuario,
        };
      }
      return v;
    });

    setVuelos(actualizado);
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text category="h4" style={{ marginBottom: 20 }}>
          Vuelos Disponibles
        </Text>

        {vuelosDisponibles.map(vuelo => (
          <Card
            key={vuelo.id}
            style={{ marginBottom: 16 }}
            onPress={() => router.push(`../vuelo-detalle/${vuelo.id}`)}
          >
            <Text category="s1">{vuelo.origen} ➜ {vuelo.destino}</Text>
            <Text appearance="hint">Salida: {new Date(vuelo.horaSalidaUTC).toLocaleString()}</Text>
            <Text appearance="hint">Aerolínea: {vuelo.aerolinea}</Text>
            <Text appearance="hint">Avión: {vuelo.avion}</Text>
            <Text appearance="hint">Tipo: {vuelo.tipoVuelo}</Text>
            <Text appearance="hint">ID: {vuelo.id}</Text>

            <Button
              size="small"
              status={seleccionados.includes(vuelo.id) ? 'danger' : 'primary'}
              style={{ marginTop: 10 }}
              onPress={() => toggleSeleccion(vuelo.id)}
            >
              {seleccionados.includes(vuelo.id) ? 'Eliminar Selección' : 'Seleccionar Vuelo'}
            </Button>
          </Card>
        ))}
      </ScrollView>
    </Layout>
  );
}

export const unstable_settings = {
  title: 'Vuelos',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="airplane-outline" size={size} color={color} />
  ),
};
