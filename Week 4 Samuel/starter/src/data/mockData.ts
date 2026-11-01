// src/data/mockData.ts
// Datos de ejemplo genéricos para el proyecto.
// El estudiante debe reemplazar estos datos con los de su dominio asignado.

import type { Item } from '../types';

export const ITEMS: Item[] = [
  {
    id: '1',
    name: 'Taladro percutor industrial',
    description:
      'Taladro de 1200 W con función de percusión, ideal para perforar concreto y mampostería. Incluye maletín y juego de brocas.',
    category: 'herramientas',
    pricePerDay: 45000,
    available: true,
  },
  {
    id: '2',
    name: 'Rotomartillo demoledor',
    description:
      'Rotomartillo de alto impacto para demolición ligera y picado de pisos y muros. Incluye cinceles y empuñadura antivibración.',
    category: 'herramientas',
    pricePerDay: 70000,
    available: true,
  },
  {
    id: '3',
    name: 'Mezcladora de concreto 1 saco',
    description:
      'Mezcladora con motor eléctrico y capacidad para un saco de cemento. Perfecta para obras pequeñas y medianas.',
    category: 'maquinaria',
    pricePerDay: 90000,
    available: true,
  },
  {
    id: '4',
    name: 'Compactador tipo rana',
    description:
      'Compactador de suelos a gasolina para zanjas, andenes y rellenos. Alta fuerza de impacto con poco mantenimiento.',
    category: 'maquinaria',
    pricePerDay: 120000,
    available: false,
  },
  {
    id: '5',
    name: 'Andamio tubular (módulo)',
    description:
      'Módulo de andamio certificado de 1.5 m de altura con crucetas y plataforma. Se pueden combinar varios módulos.',
    category: 'andamios',
    pricePerDay: 25000,
    available: true,
  },
  {
    id: '6',
    name: 'Escalera telescópica 6 m',
    description:
      'Escalera de aluminio extensible hasta 6 metros con seguros de bloqueo y patas antideslizantes.',
    category: 'andamios',
    pricePerDay: 30000,
    available: true,
  },
  {
    id: '7',
    name: 'Arnés de seguridad con línea de vida',
    description:
      'Arnés de cuerpo completo con línea de vida y absorbedor de impacto para trabajo en alturas. Certificado para uso en obra.',
    category: 'seguridad',
    pricePerDay: 20000,
    available: true,
  },
  {
    id: '8',
    name: 'Kit de seguridad básico',
    description:
      'Casco, gafas, guantes y protectores auditivos. Dotación mínima para ingresar a una obra en construcción.',
    category: 'seguridad',
    pricePerDay: 15000,
    available: false,
  },
];
