// tripulantes.tsx
import { useState } from 'react';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { Alert, ScrollView } from 'react-native';
export default function TripulantesScreen() {
  const [nombre, setNombre] = useState('');
  const [base, setBase] = useState('');
  const [cargo, setCargo] = useState('');

  const handleSubmit = async () => {
    if (!nombre || !base || !cargo) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    try {
      const res = await fetch('http://192.168.87.22:3000/tripulantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, base, cargo }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert('Éxito', 'Tripulante registrado');
        setNombre('');
        setBase('');
        setCargo('');
      } else {
        Alert.alert('Error', data.message || 'Ocurrió un error');
      }
    } catch (err) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <ScrollView contentContainerStyle={{ gap: 20 }}>
        <Text category="h4">Registrar Tripulante</Text>

        <Input
          label="Nombre"
          placeholder="Ej. Bugs Bunny"
          value={nombre}
          onChangeText={setNombre}
        />
        <Input
          label="Base Operativa"
          placeholder="Ej. La Paz (LPB)"
          value={base}
          onChangeText={setBase}
        />
        <Input
          label="Cargo"
          placeholder="Ej. Tripulante de cabina"
          value={cargo}
          onChangeText={setCargo}
        />

        <Button onPress={handleSubmit}>Guardar Tripulante</Button>
      </ScrollView>
    </Layout>
  );
}
