// src/schemas/itemSchema.ts
// Schema Zod para validar el formulario de crear un equipo.

import { z } from 'zod';

export const itemSchema = z.object({
  name: z
    .string({ error: 'El nombre es requerido' })
    .min(1, 'El nombre no puede estar vacío')
    .max(80, 'Máximo 80 caracteres'),
  category: z
    .string({ error: 'La categoría es requerida' })
    .min(1, 'La categoría no puede estar vacía')
    .max(40, 'Máximo 40 caracteres'),
  // El precio se escribe en un campo de texto; se valida aquí y se convierte
  // a número al enviar el formulario.
  pricePerDay: z
    .string({ error: 'El precio es requerido' })
    .min(1, 'El precio es requerido')
    .refine(
      (v) => !Number.isNaN(Number(v)) && Number(v) > 0,
      'Ingresa un precio válido mayor a 0',
    ),
  description: z
    .string()
    .max(500, 'Máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
});

// El tipo se infiere del schema — no duplicar con interface manual
export type ItemFormData = z.infer<typeof itemSchema>;