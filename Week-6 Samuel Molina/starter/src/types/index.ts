// 3-proyecto/starter/src/types/index.ts
// Tipos de datos del dominio: alquiler de equipos de construcción.

// Un equipo tal como lo devuelve la MockAPI
export interface Item {
  id: string;            // MockAPI usa texto ("1", "2"...), no números
  name: string;          // Nombre del equipo (ej. "Taladro percutor")
  category: string;      // Categoría (ej. "Herramienta eléctrica")
  pricePerDay: number;   // Precio de alquiler por día
  available: boolean;    // true = disponible, false = alquilado
  description: string;   // Detalle opcional
}

// Datos para CREAR un equipo (sin id: lo asigna el servidor)
export interface CreateItemPayload {
  name: string;
  category: string;
  pricePerDay: number;
  available: boolean;
  description: string;
}

// Datos para ACTUALIZAR un equipo (id obligatorio + campos editables)
export interface UpdateItemPayload {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  available: boolean;
  description: string;
}