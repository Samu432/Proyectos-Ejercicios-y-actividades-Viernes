// src/types/index.ts
// Tipos globales del proyecto: dominio alquiler de equipos de construcción.

export interface Item {
  id: string;          // MockAPI entrega el id como texto ("1", "2", ...)
  name: string;        // Nombre del equipo (ej. "Taladro percutor")
  category: string;    // Categoría (ej. "Herramientas eléctricas")
  pricePerDay: number; // Precio de alquiler por día
  available: boolean;  // true = disponible, false = alquilado
  description: string; // Descripción corta
}

// Tipo para el estado offline de la lista
export interface ItemsWithSource {
  items: Item[];
  source: 'network' | 'cache';
}