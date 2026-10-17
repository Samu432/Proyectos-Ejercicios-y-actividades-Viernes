// ============================================================
// MOCK DATA — src/data/mockData.ts
// ============================================================
// Datos de ejemplo para tu dominio asignado.
// Reemplaza estos datos con información coherente a tu dominio.
// ============================================================

// 3-proyecto/starter/src/data/mockData.ts

import { Equipment } from '../types';

// Datos de ejemplo: mi dominio: equipos de construcción en alquiler
export const MOCK_ITEMS: Equipment[] = [
  {
    id: '1',
    name: 'Taladro percutor',
    subtitle: 'Ideal para perforar concreto y mampostería',
    category: 'Herramienta eléctrica',
    pricePerDay: 45000,
    available: true,
    image: require('../assets/taladro_percutor.jpg'),
  },
  {
    id: '2',
    name: 'Mezcladora de concreto',
    subtitle: 'Capacidad de 9 pies cúbicos, motor eléctrico',
    category: 'Maquinaria',
    pricePerDay: 80000,
    available: true,
    image: require('../assets/mezcladora_concreto.jpg'),  
  },
  {
    id: '3',
    name: 'Andamio tubular',
    subtitle: 'Cuerpo de andamio de 1.5 m con plataforma',
    category: 'Estructuras',
    pricePerDay: 30000,
    available: true,
    image: require('../assets/Andamio_tubular.png'), 
  },
  {
    id: '4',
    name: 'Compactador de placa',
    subtitle: 'Compacta suelos y gravilla antes de fundir',
    category: 'Maquinaria',
    pricePerDay: 120000,
    available: false,
    image: require('../assets/compactador_de_placa.jpg'),
  },
  {
    id: '5',
    name: 'Retroexcavadora',
    subtitle: 'Excavación y movimiento de tierra, con operario',
    category: 'Maquinaria pesada',
    pricePerDay: 450000,
    available: true,
    image: require('../assets/retroexcavadora.jpg'), 
  },
];
