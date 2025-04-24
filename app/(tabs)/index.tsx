import { Layout, Text, Card } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import vuelosData from '../assets/data/cronograma_vuelos.json'; 

const usuario = "Bugs Bunny";

export default function ItinerarioScreen() {
  const vuelosAsignados = vuelosData.filter(v => v.nombreTripulante === usuario);

  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <Text category="h4" style={{ marginBottom: 20 }}>
        Itinerario de {usuario}
      </Text>

      {vuelosAsignados.length === 0 ? (
        <Text appearance="hint">No tienes vuelos asignados por el momento.</Text>
      ) : (
        vuelosAsignados.map((vuelo) => (
          <Card key={vuelo.id} style={{ marginBottom: 16 }}>
            <Text category="s1">{vuelo.origen} ➜ {vuelo.destino}</Text>
            <Text appearance="hint">Salida Zulu: {new Date(vuelo.horaSalidaUTC).toLocaleString()}</Text>
            <Text appearance="hint">Llegada Zulu: {new Date(vuelo.horaLlegadaUTC).toLocaleString()}</Text>
            <Text appearance="hint">Aerolínea: {vuelo.aerolinea}</Text>
            <Text appearance="hint">Avión: {vuelo.avion}</Text>
            <Text appearance="hint">Tipo: {vuelo.tipoVuelo}</Text>
          </Card>
        ))
      )}
    </Layout>
  );
}

export const unstable_settings = {
  title: 'Itinerario',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="calendar-outline" size={size} color={color} />
  ),
};
