import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme'; 

const colorScheme = useColorScheme();
export default function TabLayout() {
  return(
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    headerShown: false,
  }}
>
  <Tabs.Screen
    name="index"
    options={{
      title: 'Inicio',
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home-outline" size={size} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="vuelos"
    options={{
      title: 'Vuelos',
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="airplane-outline" size={size} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="rutas"
    options={{
      title: 'Rutas',
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="map-outline" size={size} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="horas"
    options={{
      title: 'Horas',
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="time-outline" size={size} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="notificaciones"
    options={{
      title: 'Notificaciones',
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="notifications-outline" size={size} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="perfil"
    options={{
      title: 'Perfil',
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person-outline" size={size} color={color} />
      ),
    }}
  />
</Tabs>
  )
}

