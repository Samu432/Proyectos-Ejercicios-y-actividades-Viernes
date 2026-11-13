// src/hooks/useEquipment.ts
// Hooks de lectura (GET) para el dominio de equipos de construcción.
// Las pantallas usan estos hooks; no llaman a apiClient directamente.

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { Equipment } from '../types';

// ============================================================
// QUERY KEY
// ============================================================
// Etiqueta con la que TanStack Query guarda los datos en su libreta.
// La exportamos para reutilizarla al invalidar después de crear un equipo.
export const EQUIPMENT_QUERY_KEY = ['equipment'] as const;

// ============================================================
// useEquipment — obtener la lista de equipos
// ============================================================
export function useEquipment() {
  return useQuery<Equipment[]>({
    queryKey: EQUIPMENT_QUERY_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<Equipment[]>('/equipment');
      return data;
    },
  });
}

// ============================================================
// useEquipmentById — obtener un equipo por su id
// ============================================================
// Se usa en DetailScreen para mostrar todos los campos del equipo.
export function useEquipmentById(id: string) {
  return useQuery<Equipment>({
    queryKey: [...EQUIPMENT_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<Equipment>(`/equipment/${id}`);
      return data;
    },
    // La consulta solo corre si hay un id válido
    enabled: !!id,
  });
}