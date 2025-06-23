import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Animated, Easing } from 'react-native';

export default function AvionLoader() {
  const [progress] = useState(new Animated.Value(0));
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Image
       source={require('../app/assets/images/avion.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressFill, { width }]} />
      </View>
      <Text style={styles.text}>{percentage}% Cargando vuelos...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 100,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  progressBar: {
    width: 200,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#ccc',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3366FF',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },
});
