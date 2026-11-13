// src/types/index.ts
// Interfaces del dominio: alquiler de equipos de construcción.

// ============================================================
// MODELO PRINCIPAL — Equipment
// ============================================================
// Representa un equipo disponible para alquilar.
// Los campos coinciden con los de la API en MockAPI.

export interface Equipment {
  // Lo asigna el servidor al crear el equipo
  id: string;
  // Nombre del equipo, por ejemplo "Taladro percutor"
  name: string;
  // Tipo de equipo, por ejemplo "Maquinaria"
  category: string;
  // Precio de alquiler por día, en pesos colombianos
  pricePerDay: number;
  // true si está libre para alquilar, false si ya está alquilado
  available: boolean;
  // Texto opcional con más detalles del equipo
  description?: string;
}

// ============================================================
// PAYLOAD DE CREACIÓN
// ============================================================
// Lo que enviamos en el POST para crear un equipo nuevo.
// Es el mismo modelo pero SIN `id`, porque el servidor lo genera.

export type CreateEquipmentPayload = Omit<Equipment, 'id'>;