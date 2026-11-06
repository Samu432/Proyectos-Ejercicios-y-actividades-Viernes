// src/types/index.ts
// Interface principal del dominio.

export type EquipmentCategory =
  | 'herramientas'
  | 'maquinaria'
  | 'andamios'
  | 'seguridad';

export interface Item {
  id: string;
  name: string;
  description: string;
  category: EquipmentCategory;
  pricePerDay: number; // en pesos colombianos (COP)
  available: boolean;
}
