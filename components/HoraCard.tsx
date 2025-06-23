import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Icon } from '@ui-kitten/components';

interface HoraCardProps {
  titulo: string;
  hora: string;
  iconName: string;
  color?: string;
}

export const HoraCard = ({ titulo, hora, iconName, color = '#3366FF' }: HoraCardProps) => {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <Icon name={iconName} fill={color} style={styles.icon} />
        <View>
          <Text
            category="s2"
            style={styles.title}
            numberOfLines={2}
            adjustsFontSizeToFit
            >
            {titulo}
            </Text>
            <Text category="h6" style={styles.hora}>
            {hora}
            </Text>

        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    minWidth: 100,
    maxWidth: 120,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 4,
  },
  hora: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

