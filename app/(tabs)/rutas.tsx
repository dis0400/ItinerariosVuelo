import { useState } from 'react';
import { Layout, Text, Button, Card } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

const rutasDisponibles = [
  { id: '1', origen: 'LPB', destino: 'CBB', hora: '10:00' },
  { id: '2', origen: 'LPB', destino: 'SCZ', hora: '13:30' },
  { id: '3', origen: 'LPB', destino: 'MIA', hora: '22:00' },
];

export default function RutasScreen() {
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);

  const seleccionarRuta = (id: string) => {
    if (!seleccionadas.includes(id)) {
      setSeleccionadas([...seleccionadas, id]);
    }
  };

  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>    
      <Text category="h4" style={{ marginBottom: 20 }}>
        Rutas Disponibles
      </Text>

      {rutasDisponibles.map((ruta) => (
        <Card key={ruta.id} style={{ marginBottom: 16 }}>
          <Text category="s1">{ruta.origen} ➜ {ruta.destino}</Text>
          <Text appearance="hint">Hora: {ruta.hora}</Text>
          <Button
            size="small"
            status={seleccionadas.includes(ruta.id) ? 'success' : 'primary'}
            style={{ marginTop: 10 }}
            onPress={() => seleccionarRuta(ruta.id)}
          >
            {seleccionadas.includes(ruta.id) ? 'Ruta Seleccionada' : 'Seleccionar Ruta'}
          </Button>
        </Card>
      ))}
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
