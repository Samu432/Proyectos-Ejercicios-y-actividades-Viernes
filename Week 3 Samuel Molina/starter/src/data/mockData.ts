// src/data/mockData.ts
// Datos de prueba genéricos para la app.
// TODO: reemplazar con datos de tu dominio asignado.



// ============================================
// LISTA PRINCIPAL DE ELEMENTOS
// ============================================
// Estos son datos genéricos de placeholder.
// Debes reemplazarlos con datos coherentes a tu dominio.
//
// Ejemplos:
//   Biblioteca  → libros con autor, ISBN, páginas
//   Farmacia    → medicamentos con precio, stock, dosis
//   Gimnasio    → rutinas con duración, grupos musculares
//   Restaurante → platillos con precio, ingredientes
//   Cine        → películas con director, año, género

import type { Item } from '../types';

export const ITEMS: Item[] = [
  { id: '1', name: 'Taladro percutor', category: 'Herramienta eléctrica', pricePerDay: 35000, description: 'Taladro de 850W con función percutora. Ideal para concreto y mampostería.', available: true, emoji: '🔨' },
  { id: '2', name: 'Mezcladora de concreto', category: 'Maquinaria', pricePerDay: 90000, description: 'Mezcladora de 1 bulto con motor eléctrico. Perfecta para obras pequeñas.', available: true, emoji: '🏗️' },
  { id: '3', name: 'Andamio tubular', category: 'Estructuras', pricePerDay: 25000, description: 'Módulo de andamio de 1.5 m con crucetas y plataforma.', available: true, emoji: '🪜' },
  { id: '4', name: 'Compactadora (rana)', category: 'Maquinaria', pricePerDay: 120000, description: 'Compactadora de impacto a gasolina para suelos y rellenos.', available: false, emoji: '🚜' },
  { id: '5', name: 'Cortadora de piso', category: 'Herramienta eléctrica', pricePerDay: 80000, description: 'Cortadora con disco diamantado para pisos y andenes.', available: true, emoji: '⚙️' },
  { id: '6', name: 'Vibrador de concreto', category: 'Maquinaria', pricePerDay: 60000, description: 'Vibrador de inmersión para eliminar burbujas de aire en la fundición.', available: true, emoji: '🔧' },
];

// Favoritos estáticos (mínimo 3, como pide el README)
export const FAVORITES: Item[] = [ITEMS[0], ITEMS[2], ITEMS[5]];

// ============================================
// LISTA DE FAVORITOS
// ============================================
// Subconjunto de elementos para la pestaña Favorites.
// TODO: seleccionar elementos coherentes con tu dominio.

