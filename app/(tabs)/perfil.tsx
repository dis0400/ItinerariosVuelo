import { Layout, Text, Card } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

const usuario = {
  nombre: 'Alexia Marin',
  base: 'La Paz (LPB)',
  rutasSeleccionadas: ['LPB ➜ CBB', 'LPB ➜ MIA'],
  diferenciaHoraria: '-4 horas (con Madrid)',
  notificaciones: [
    'Cambio de horario en vuelo LPB → MIA: ahora 11:30 AM',
    'Asiento disponible en vuelo CBB → SCZ',
  ],
};

export default function PerfilScreen() {
  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <Text category="h4" style={{ marginBottom: 20 }}>
        Resumen del Tripulante
      </Text>

      <Card style={{ marginBottom: 16 }}>
        <Text category="s1">Nombre:</Text>
        <Text>{usuario.nombre}</Text>

        <Text category="s1" style={{ marginTop: 10 }}>Base Operativa:</Text>
        <Text>{usuario.base}</Text>

        <Text category="s1" style={{ marginTop: 10 }}>Diferencia Horaria Actual:</Text>
        <Text>{usuario.diferenciaHoraria}</Text>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Text category="s1">Rutas Seleccionadas:</Text>
        {usuario.rutasSeleccionadas.map((ruta, i) => (
          <Text key={i}>• {ruta}</Text>
        ))}
      </Card>

      <Card>
        <Text category="s1">Últimas Notificaciones:</Text>
        {usuario.notificaciones.map((n, i) => (
          <Text key={i}>• {n}</Text>
        ))}
      </Card>
    </Layout>
  );
}

export const unstable_settings = {
  title: 'Perfil',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="person-outline" size={size} color={color} />
  ),
};
