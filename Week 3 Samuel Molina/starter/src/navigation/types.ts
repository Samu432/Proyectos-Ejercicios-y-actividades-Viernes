// src/navigation/types.ts
// Define los tipos de parámetros para cada navigator.
// Esto habilita autocompletado y verificación en tiempo de compilación.

// ============================================
// TAB NAVIGATOR — pantallas de nivel raíz
// ============================================

import type { NavigatorScreenParams } from '@react-navigation/native';

// Pantallas del Stack que vive dentro de la pestaña Home
export type HomeStackParamList = {
  HomeList: undefined; // la lista no recibe params
  HomeDetail: { id: string; name: string }; // el detalle recibe id y name
};

// Pestañas del Tab Navigator
export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>; // Home contiene otro navegador
  Favorites: undefined;
};
