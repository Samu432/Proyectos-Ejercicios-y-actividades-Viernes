// ============================================
// TYPES — Semana 02
// Define aquí la interfaz de tu dominio
// ============================================

//primero cree una lista pequeña con cuatro categorias para nuestros equipos en alquiler
export type EquipmentCategory =
  | 'Herramienta eléctrica'
  | 'Maquinaria'
  | 'Maquinaria pesada'
  | 'Estructuras';

export interface Equipment {
  id: string;
  name: string; //este es el nombre por el que vamos a filtrar lo que voy a alquilar
  brand: string;
  category: EquipmentCategory; //la categoria de la herramienta que vamos a alquilar
  pricePerDay: number; //el presio por dia en pesos colombianos para la gaseosa
  available: boolean;
}
