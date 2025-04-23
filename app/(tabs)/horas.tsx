import { useState } from 'react';
import { Layout, Text, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

const destinos = [
  { ciudad: 'La Paz', offset: -4 },
  { ciudad: 'Madrid', offset: 2 },
  { ciudad: 'Nueva York', offset: -4 },
  { ciudad: 'Tokio', offset: 9 },
];

export default function HorasScreen() {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const destino = destinos[selectedIndex.row];
  const diferencia = destino.offset - (-4); // Simulamos que estás en La Paz

  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <Text category="h4" style={{ marginBottom: 10 }}>
        Cálculo de Diferencia Horaria
      </Text>

      <Select
        selectedIndex={selectedIndex}
        value={destino.ciudad}
        onSelect={(index) => setSelectedIndex(index as IndexPath)}
        style={{ marginBottom: 20 }}
      >
        {destinos.map((d) => (
          <SelectItem key={d.ciudad} title={d.ciudad} />
        ))}
      </Select>

      <Text category="s1">
        Diferencia horaria con {destino.ciudad}: {diferencia} horas
      </Text>
    </Layout>
  );
}

export const unstable_settings = {
  title: 'Horas',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="time-outline" size={size} color={color} />
  ),
};
