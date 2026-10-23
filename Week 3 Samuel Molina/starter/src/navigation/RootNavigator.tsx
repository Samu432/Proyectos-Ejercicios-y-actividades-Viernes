// src/navigation/RootNavigator.tsx
// Configura la estructura completa de navegación:
//   Tab Navigator (raíz)
//     └── Home tab  → HomeStack (Stack Navigator anidado)
//           ├── HomeList  (lista de elementos)
//           └── HomeDetail (detalle de un elemento con params)
//     └── Favorites tab → FavoritesScreen

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList, RootTabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { COLORS } from '../theme';

// Cada navegador se crea con su tipo de params
const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

type IconName = React.ComponentProps<typeof Ionicons>['name'];

// Stack que vive dentro de la pestaña Home
function HomeStackNavigator(): React.JSX.Element {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.accent, // color de la flecha de volver
        headerTitleStyle: { color: COLORS.textPrimary, fontWeight: '700' },
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <HomeStack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ title: 'Equipos disponibles' }}
      />
      <HomeStack.Screen
        name="HomeDetail"
        component={DetailScreen}
        // El título se lee de los params que llegaron al navegar
        options={({ route }) => ({ title: route.params.name })}
      />
    </HomeStack.Navigator>
  );
}

export default function RootNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IconName;
          if (route.name === 'Home') {
            iconName = focused ? 'construct' : 'construct-outline';
          } else {
            iconName = focused ? 'star' : 'star-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { fontWeight: '700' },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          title: 'Equipos',
          headerShown: false, // el Stack ya trae su propio header
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Favoritos' }}
      />
    </Tab.Navigator>
  );
}