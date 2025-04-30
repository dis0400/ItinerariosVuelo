import { useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const destinos = [
  { ciudad: 'La Paz', offset: -4 },
  { ciudad: 'Madrid', offset: 2 },
  { ciudad: 'Nueva York', offset: -4 },
  { ciudad: 'Tokio', offset: 9 },
];

export default function HorasScreen() {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(destinos[0]);

  const diferencia = ciudadSeleccionada.offset - (-4); // LPB es -4

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text category="h4" style={styles.titulo}>
          Cálculo de Diferencia Horaria
        </Text>

        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => {
              const destino = destinos.find((d) => d.ciudad === value);
              if (destino) setCiudadSeleccionada(destino);
            }}
            items={destinos.map((d) => ({
              label: d.ciudad,
              value: d.ciudad,
            }))}
            value={ciudadSeleccionada.ciudad}
            placeholder={{ label: 'Seleccionar ciudad', value: null }}
          />
        </View>

        <Text category="s1">
          Diferencia horaria con {ciudadSeleccionada.ciudad}: {diferencia} horas
        </Text>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    marginBottom: 10,
  },
  pickerContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#fff',
  },
});

export const unstable_settings = {
  title: 'Horas',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="time-outline" size={size} color={color} />
  ),
};
