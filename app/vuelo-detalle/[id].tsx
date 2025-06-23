import { useLocalSearchParams, useRouter } from 'expo-router';
import { Layout, Text, Card, Button } from '@ui-kitten/components';
import { ScrollView, ToastAndroid, Platform, Alert } from 'react-native';
import { useState } from 'react';
import vuelosData from '../assets/data/cronograma_vuelos.json';

const usuario = "Bugs Bunny";

const mostrarToast = (mensaje: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(mensaje, ToastAndroid.SHORT);
  } else {
    Alert.alert('Confirmación', mensaje);
  }
};
export const options = {
  title: 'Detalle del Vuelo',
};


export default function VueloDetalle() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [vuelo, setVuelo] = useState(() =>
    vuelosData.find(v => v.id.toString() === id)
  );

  if (!vuelo) {
    return (
      <Layout style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text category="h5">Vuelo no encontrado</Text>
        <Button style={{ marginTop: 20 }} onPress={() => router.back()}>
          Volver
        </Button>
      </Layout>
    );
  }

  const estaAsignado = vuelo.nombreTripulante === usuario;

  const toggleAsignacion = () => {
    const mensaje = estaAsignado
      ? 'Vuelo eliminado del itinerario'
      : 'Vuelo añadido al itinerario';

    mostrarToast(mensaje);

    // Actualiza el estado local (opcional si no estás guardando en archivo o BD)
    setVuelo({
      ...vuelo,
      nombreTripulante: estaAsignado ? "" : usuario,
    });

    // Aquí podrías también guardar en una base de datos si lo necesitaras
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text category="h4" style={{ marginBottom: 10 }}>Detalle del Vuelo</Text>
      <Card>
        <Text>Origen: {vuelo.origen}</Text>
        <Text>Destino: {vuelo.destino}</Text>
        <Text>Salida Zulu: {new Date(vuelo.horaSalidaUTC).toLocaleString()}</Text>
        <Text>Llegada Zulu: {new Date(vuelo.horaLlegadaUTC).toLocaleString()}</Text>
        <Text>Aerolínea: {vuelo.aerolinea}</Text>
        <Text>Avión: {vuelo.avion}</Text>
        <Text>Tipo de Vuelo: {vuelo.tipoVuelo}</Text>
        <Text>Asignado a: {vuelo.nombreTripulante || "No asignado"}</Text>
      </Card>

      <Button style={{ marginTop: 20 }} onPress={toggleAsignacion}>
        {estaAsignado ? 'Quitar del Itinerario' : 'Agregar al Itinerario'}
      </Button>

      <Button style={{ marginTop: 10 }} onPress={() => router.back()} appearance="ghost">
        Volver
      </Button>
    </ScrollView>
  );
}
