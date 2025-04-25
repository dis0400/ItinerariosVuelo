import { useLocalSearchParams, useRouter } from 'expo-router';
import { Layout, Text, Card, Button } from '@ui-kitten/components';

export default function VueloDetalle() {
    const {
        origen,
        destino,
        horaSalidaUTC,
        horaLlegadaUTC,
        aerolinea,
        avion,
        tipoVuelo
      } = useLocalSearchParams() as {
        origen: string;
        destino: string;
        horaSalidaUTC: string;
        horaLlegadaUTC: string;
        aerolinea: string;
        avion: string;
        tipoVuelo: string;
      };          

  const router = useRouter();

  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <Text category="h4" style={{ marginBottom: 10 }}>Detalle del Vuelo</Text>

      <Card>
        <Text>Origen: {origen}</Text>
        <Text>Destino: {destino}</Text>
        <Text>Salida: {new Date(horaSalidaUTC as string).toLocaleString()}</Text>
        <Text>Llegada: {new Date(horaLlegadaUTC as string).toLocaleString()}</Text>
        <Text>Aerolínea: {aerolinea}</Text>
        <Text>Avión: {avion}</Text>
        <Text>Tipo de Vuelo: {tipoVuelo}</Text>
      </Card>

      <Button style={{ marginTop: 20 }} onPress={() => router.back()}>
        Volver
      </Button>
    </Layout>
  );
}
