import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@ui-kitten/components';

type ErrorScreenProps = {
  mensaje: string;
  onRetry: () => void;
};

export default function ErrorScreen({ mensaje, onRetry }: ErrorScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>😢</Text>
      <Text style={styles.text}>{mensaje}</Text>
      <Button onPress={onRetry} style={{ marginTop: 20 }}>
        Reintentar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    fontSize: 48,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});
