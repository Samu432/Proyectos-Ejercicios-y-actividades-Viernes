// index.ts  (en la raíz de starter, junto a App.tsx y package.json)
// Punto de entrada de la app: le dice a Expo cuál es el componente principal.

import { registerRootComponent } from 'expo';

import App from './App';

// Registra App como la raíz de la aplicación.
// Funciona igual en Expo Go y en una compilación nativa.
registerRootComponent(App);