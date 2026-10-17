import { Equipment } from '../types';

// ============================================
// MOCK DATA — Semana 02
// Reemplaza estos items genéricos con datos
// reales de tu dominio asignado.
//
// REQUISITO: mínimo 10 items
// ============================================

// TODO: Renombra ITEMS a algo descriptivo de tu dominio
//       Ejemplo: BOOKS, MEDICINES, MEMBERS, DISHES...
// TODO: Actualiza el tipo Item con los campos de tu dominio
// TODO: Rellena con datos reales y variados de tu dominio

// week-02-listas_inputs_y_estilos/3-proyecto/starter/src/data/mockData.ts

//cree una lista de equipos de construccion para alquilar, con sus respectivos campos como id, nombre, marca, categoria, precio por dia y disponibilidad
export const EQUIPMENT: Equipment[] = [
  { id: '1', name: 'Taladro percutor', brand: 'Bosch', category: 'Herramienta eléctrica', pricePerDay: 45000, available: true },
  { id: '2', name: 'Mezcladora de concreto', brand: 'Honda', category: 'Maquinaria', pricePerDay: 80000, available: true },
  { id: '3', name: 'Andamio tubular', brand: 'Alumiandamios', category: 'Estructuras', pricePerDay: 30000, available: true },
  { id: '4', name: 'Compactador de placa', brand: 'Wacker', category: 'Maquinaria', pricePerDay: 120000, available: false },
  { id: '5', name: 'Retroexcavadora', brand: 'Caterpillar', category: 'Maquinaria pesada', pricePerDay: 450000, available: true },
  { id: '6', name: 'Rotomartillo', brand: 'Hilti', category: 'Herramienta eléctrica', pricePerDay: 60000, available: true },
  { id: '7', name: 'Pulidora angular', brand: 'Makita', category: 'Herramienta eléctrica', pricePerDay: 25000, available: true },
  { id: '8', name: 'Vibrador de concreto', brand: 'Honda', category: 'Maquinaria', pricePerDay: 70000, available: false },
  { id: '9', name: 'Cortadora de piso', brand: 'Husqvarna', category: 'Maquinaria', pricePerDay: 150000, available: true },
  { id: '10', name: 'Generador eléctrico 5 kW', brand: 'Honda', category: 'Maquinaria', pricePerDay: 110000, available: true },
  { id: '11', name: 'Hidrolavadora industrial', brand: 'Karcher', category: 'Maquinaria', pricePerDay: 55000, available: true },
  { id: '12', name: 'Escalera telescópica', brand: 'Werner', category: 'Estructuras', pricePerDay: 20000, available: true },
];