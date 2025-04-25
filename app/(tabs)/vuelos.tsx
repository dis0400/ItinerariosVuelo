import { useState } from 'react';
import { ToastAndroid, Platform, Alert, ScrollView } from 'react-native';
import { Layout, Text, Card, Button } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import vuelosData from '../assets/data/cronograma_vuelos.json';
import { useRouter } from 'expo-router';

const usuario = "Bugs Bunny";

const mostrarToast = (mensaje: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(mensaje, ToastAndroid.SHORT);
  } else {
    Alert.alert('Confirmación', mensaje);
  }
};

export default function VuelosScreen() {
  const [vuelos, setVuelos] = useState(vuelosData);
  const vuelosDisponibles = vuelos.filter(v => v.nombreTripulante?.trim() !== "Bugs Bunny");
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const router = useRouter();

  const toggleSeleccion = (id: number) => {
    const actualizado = vuelos.map(v => {
      if (v.id === id) {
        const yaAsignado = v.nombreTripulante === usuario;
        mostrarToast(yaAsignado ? 'Vuelo eliminado del itinerario' : 'Vuelo añadido al itinerario');

        return {
          ...v,
          nombreTripulante: yaAsignado ? "" : usuario
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
          onPress={() =>
            router.push({
              pathname: '/vuelo-detalle',
              params: {
                id: vuelo.id.toString(),
                origen: vuelo.origen,
                destino: vuelo.destino,
                horaSalidaUTC: vuelo.horaSalidaUTC,
                horaLlegadaUTC: vuelo.horaLlegadaUTC,
                aerolinea: vuelo.aerolinea,
                avion: vuelo.avion,
                tipoVuelo: vuelo.tipoVuelo,
              },
            })
          }
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
