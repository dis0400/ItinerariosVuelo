import { useState } from 'react';
import { Layout, Text, Card, Button } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import vuelosData from '../assets/data/cronograma_vuelos.json'; 

const usuario = "Bugs Bunny";

export default function VuelosScreen() {
  const [vuelos, setVuelos] = useState(vuelosData);

  const vuelosDisponibles = vuelos.filter(v => !v.nombreTripulante || v.nombreTripulante === '');

  const [seleccionados, setSeleccionados] = useState<number[]>([]);

  const toggleSeleccion = (id: number) => {
    const actualizado = vuelos.map(v => {
      if (v.id === id) {
        return {
          ...v,
          nombreTripulante: v.nombreTripulante === usuario ? "" : usuario
        };
      }
      return v;
    });

    setVuelos(actualizado);

    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter(s => s !== id));
    } else {
      setSeleccionados([...seleccionados, id]);
    }
  };

  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <Text category="h4" style={{ marginBottom: 20 }}>
        Vuelos Disponibles
      </Text>

      {vuelosDisponibles.map(vuelo => (
        <Card key={vuelo.id} style={{ marginBottom: 16 }}>
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
    </Layout>
  );
}

export const unstable_settings = {
  title: 'Vuelos',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="airplane-outline" size={size} color={color} />
  ),
};
