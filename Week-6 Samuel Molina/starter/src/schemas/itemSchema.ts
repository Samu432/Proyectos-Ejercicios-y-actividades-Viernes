// 3-proyecto/starter/src/schemas/itemSchema.ts
// Reglas de validación (Zod) del formulario de equipos de construcción.

import { z } from 'zod';

export const itemSchema = z.object({
  // Nombre del equipo: obligatorio, entre 3 y 80 caracteres
  name: z
    .string()
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(80, 'Máx. 80 caracteres'),

  // Categoría: obligatoria
  category: z
    .string()
    .trim()
    .min(1, 'La categoría es requerida'),

  // Precio por día: el TextInput entrega texto, coerce lo convierte a número
  pricePerDay: z.coerce
    .number({ error: 'El precio debe ser un número' })
    .positive('El precio debe ser mayor que 0'),

  // Descripción: opcional, máx. 500 caracteres
  description: z
    .string()
    .max(500, 'Máx. 500 caracteres'),
});

// Tipo de lo que ESCRIBE el usuario en el formulario (antes de validar)
export type ItemFormInput = z.input<typeof itemSchema>;

// Tipo de los datos YA validados y convertidos (lo que recibe onSubmit)
export type ItemFormData = z.output<typeof itemSchema>;