import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TestScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Ionicons name="home-outline" size={50} color="black" />
    </View>
  );
}

export const unstable_settings = {
  title: 'Test',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="home-outline" size={size} color={color} />
  ),
};
