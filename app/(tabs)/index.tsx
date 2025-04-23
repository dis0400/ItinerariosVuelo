import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

const vuelosHardcodeados = [
  {
    id: '1',
    origen: 'LPB',
    destino: 'MIA',
    horaZulu: '2025-04-21T10:00:00Z',
  },
  {
    id: '2',
    origen: 'MIA',
    destino: 'BOG',
    horaZulu: '2025-04-22T15:00:00Z',
  },
];

export default function ItinerarioScreen() {
  const [vuelos, setVuelos] = useState<any[]>([]);

  useEffect(() => {
    const convertidos = vuelosHardcodeados.map((vuelo) => {
      const horaLocal = new Date(vuelo.horaZulu).toLocaleString();
      return { ...vuelo, horaLocal };
    });
    setVuelos(convertidos);
  }, []);

  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <Text category='h4' style={{ marginBottom: 20 }}>
        Itinerario de Vuelos
      </Text>
      <FlatList
        data={vuelos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 16 }}>
            <Text category='s1'>{item.origen} ➜ {item.destino}</Text>
            <Text appearance='hint'>Hora Zulu: {item.horaZulu}</Text>
            <Text appearance='hint'>Hora Local: {item.horaLocal}</Text>
          </Card>
        )}
      />
    </Layout>
  );
}

export const unstable_settings = {
  title: 'Itinerario',
    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="home-outline" size={size} color={color} />
    ),
};
