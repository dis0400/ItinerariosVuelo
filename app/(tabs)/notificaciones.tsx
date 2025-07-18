import { useEffect, useState, useCallback } from 'react';
import { Layout, Text, List, ListItem, Button } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

const notificacionesSimuladas = [
  'Cambio de horario en vuelo LPB → MIA: ahora 11:30 AM',
  'Asiento disponible en vuelo CBB → SCZ',
  'Ruta alternativa disponible para LPB → TOKIO',
  'Demora detectada en vuelo MIA → BOG',
];

export default function NotificacionesScreen() {
  const [notificaciones, setNotificaciones] = useState<string[]>([]);

  const agregarNotificacion = useCallback(() => {
    const nueva = notificacionesSimuladas[Math.floor(Math.random() * notificacionesSimuladas.length)];
    setNotificaciones((prev) => [nueva, ...prev]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      agregarNotificacion();
    }, 10000);
    return () => clearInterval(interval);
  }, [agregarNotificacion]);

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text category="h4" style={{ marginBottom: 10 }}>
          Notificaciones
        </Text>

        <Button onPress={agregarNotificacion} style={{ marginBottom: 15 }}>
          Generar notificación
        </Button>

        <List
          data={notificaciones}
          renderItem={({ item }) => <ListItem title={item} />}
        />
      </ScrollView>
    </Layout>
  );
}

export const unstable_settings = {
  title: 'Notificaciones',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="notifications-outline" size={size} color={color} />
  ),
};
