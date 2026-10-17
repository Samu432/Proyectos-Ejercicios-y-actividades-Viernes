// ============================================================
// TYPES — src/types/index.ts
// ============================================================
// Define aquí la interfaz del elemento de tu dominio asignado.
// Este type se usará en mockData.ts, ItemCard.tsx y HomeScreen.tsx
// ============================================================

// TODO: Renombra esta interfaz con el nombre de tu elemento
// Ejemplos: Book, Medication, Member, Dish, Movie, Destination
import { ImageSourcePropType } from 'react-native';

// Molde de un equipo de construcción disponible para alquiler.
// Se usa en mockData.ts, ItemCard.tsx y HomeScreen.tsx
export interface Equipment {
  id: string;
  name: string;
  subtitle: string;
  image: ImageSourcePropType; // foto local (require) o URL
  category: string;
  pricePerDay: number;
  available: boolean;
}