// src/types/index.ts
// Interface principal del dominio.
// TODO: adaptar a tu dominio asignado.

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
