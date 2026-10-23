// App.tsx
// Punto de entrada principal de la app.
// NavigationContainer debe envolver TODA la navegación de la app.
// Este archivo no necesita cambios — todo el trabajo de navegación
// va en src/navigation/RootNavigator.tsx

import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { COLORS } from './src/theme';


const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: COLORS.background,
    card: COLORS.surface,
    primary: COLORS.accent,
    text: COLORS.textPrimary,
    border: COLORS.border,
  },
};

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />
      <RootNavigator />
    </NavigationContainer>
  );
}