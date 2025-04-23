import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

const vuelosDisponibles = [
  { id: '1', vuelo: 'LPB -> CBB', disponibles: 5 },
  { id: '2', vuelo: 'LPB -> SCZ', disponibles: 2 },
  { id: '3', vuelo: 'CBB -> MIA', disponibles: 0 },
];

export default function VuelosScreen() {
  const [vuelos, setVuelos] = useState<any[]>([]);

  useEffect(() => {
    setVuelos(vuelosDisponibles);
  }, []);

  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <Text category='h4' style={{ marginBottom: 20 }}>
        Vuelos Disponibles
      </Text>
      <FlatList
        data={vuelos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 16 }}>
            <Text category='s1'>{item.vuelo}</Text>
            <Text appearance='hint'>
              Asientos disponibles: {item.disponibles}
            </Text>
          </Card>
        )}
      />
    </Layout>
  );
}

export const unstable_settings = {
  title: 'Vuelos',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="airplane-outline" size={size} color={color} />
  ),
};
