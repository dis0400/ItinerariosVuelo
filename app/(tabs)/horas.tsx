import React, { useState, useRef } from 'react';
import { Layout, Select, SelectItem, IndexPath, Text } from '@ui-kitten/components';
import { ScrollView, View, StyleSheet } from 'react-native';
import { HoraCard } from '@/components/HoraCard';
import MapView, { Marker } from 'react-native-maps';

const destinos = [
  { ciudad: 'La Paz', offset: -4, lat: -16.5, lng: -68.15 },
  { ciudad: 'Madrid', offset: 2, lat: 40.4168, lng: -3.7038 },
  { ciudad: 'Nueva York', offset: -4, lat: 40.7128, lng: -74.0060 },
  { ciudad: 'Tokio', offset: 9, lat: 35.6895, lng: 139.6917 },
];

export default function HorasScreen() {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const destino = destinos[selectedIndex.row];

  const mapRef = useRef<MapView>(null);

  const now = new Date();
  const horaZulu = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  const horaLaPaz = new Date(horaZulu.getTime() - 4 * 60 * 60000);
  const horaDestino = new Date(horaZulu.getTime() + destino.offset * 60 * 60000);
  const diferencia = destino.offset - (-4);

  const handleSelect = (index: IndexPath) => {
    setSelectedIndex(index);
    const nuevoDestino = destinos[index.row];

    mapRef.current?.animateToRegion({
      latitude: nuevoDestino.lat,
      longitude: nuevoDestino.lng,
      latitudeDelta: 10,
      longitudeDelta: 10,
    }, 1000);
  };

  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text category="h4" style={{ marginBottom: 10 }}>Cálculo de Diferencia Horaria</Text>

        <Select
          selectedIndex={selectedIndex}
          onSelect={(index) => handleSelect(index as IndexPath)}
          value={destino.ciudad}
          style={{ marginBottom: 20 }}
        >
          {destinos.map((d) => <SelectItem key={d.ciudad} title={d.ciudad} />)}
        </Select>

        <View style={styles.cardGroup}>
          <HoraCard titulo="Hora ZULU (GMT 0)" hora={horaZulu.toTimeString().substring(0, 5)} iconName="clock-outline" />
          <HoraCard titulo="Hora en La Paz (GMT-4)" hora={horaLaPaz.toTimeString().substring(0, 5)} iconName="pin-outline" />
          <HoraCard titulo={`Hora en ${destino.ciudad} (GMT${destino.offset >= 0 ? '+' : ''}${destino.offset})`} hora={horaDestino.toTimeString().substring(0, 5)} iconName="globe-2-outline" />
        </View>

        <Text style={styles.diferencia}>
          Diferencia horaria: {diferencia >= 0 ? '+' : ''}{diferencia} horas respecto a La Paz
        </Text>

        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: destino.lat,
            longitude: destino.lng,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}
        >
          <Marker
            coordinate={{
              latitude: destino.lat,
              longitude: destino.lng,
            }}
            title={destino.ciudad}
            description={`GMT${destino.offset >= 0 ? '+' : ''}${destino.offset}`}
          />
        </MapView>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  cardGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  diferencia: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  map: {
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
