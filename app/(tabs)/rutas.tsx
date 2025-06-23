import { Ionicons } from '@expo/vector-icons';
import { Button, Layout, Text, Card } from '@ui-kitten/components';
import { ScrollView, Alert } from 'react-native';
import { useVuelos } from '@/components/VuelosContext';
import AvionLoader from '@/components/AvionLoader';
import ErrorScreen from '@/components/ErrorScreen';
import { useRouter } from 'expo-router';

export default function RutasScreen() {
  const { rutasSeleccionadas, loading, error, retry, eliminarRuta } = useVuelos();
  const router = useRouter();

  if (loading) return <AvionLoader />;
  if (error) return <ErrorScreen mensaje={error} onRetry={retry} />;

  // Ordenar por fecha y hora
  const rutasOrdenadas = [...rutasSeleccionadas].sort((a, b) =>
    new Date(a.horaSalidaUTC).getTime() - new Date(b.horaSalidaUTC).getTime()
  );
  const confirmarEliminacionRuta = (id: number) => {
  Alert.alert(
    'Eliminar Ruta',
    '¿Estás seguro que deseas eliminar esta ruta de tu itinerario?',
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => eliminarRuta(id) },
    ]
  );
};


  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text category="h4" style={{ marginBottom: 20 }}>
          Rutas Seleccionadas
        </Text>

        {rutasOrdenadas.length === 0 ? (
        <Text appearance="hint">No se ha seleccionado ninguna ruta aún.</Text>
      ) : (
        rutasOrdenadas.map((ruta) => (
          <Card key={ruta.id} style={{ marginBottom: 16 }}>
            <Text category="s1">{ruta.origen} ➜ {ruta.destino}</Text>
            <Text appearance="hint">
              Salida: {new Date(ruta.horaSalidaUTC).toLocaleString()}
            </Text>
            <Text appearance="hint">Aerolínea: {ruta.aerolinea}</Text>
            <Text appearance="hint">Avión: {ruta.avion}</Text>
            <Text appearance="hint">Tipo de Vuelo: {ruta.tipoVuelo}</Text>
            <Button
              size="small"
              style={{ marginTop: 10 }}
              onPress={() => router.push(`/vuelo-detalle/${ruta.id}`)}
            >
              Ver Detalle
            </Button>

            <Button
            size="small"
            status="danger"
            style={{ marginTop: 10 }}
            onPress={() => confirmarEliminacionRuta(ruta.id)}
          >
            Eliminar Ruta
          </Button>

          </Card>
          ))
        )}
      </ScrollView>
    </Layout>
  );
}

export const unstable_settings = {
  title: 'Rutas',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="map-outline" size={size} color={color} />
  ),
};
