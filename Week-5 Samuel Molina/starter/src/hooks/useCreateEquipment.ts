// src/hooks/useCreateEquipment.ts
// Hook de escritura (POST) para crear un equipo nuevo.

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { CreateEquipmentPayload, Equipment } from '../types';
import { EQUIPMENT_QUERY_KEY } from './useEquipment';

// ============================================================
// useCreateEquipment — crear un equipo nuevo
// ============================================================
export function useCreateEquipment() {
  // Acceso a la "libreta" de TanStack Query
  const queryClient = useQueryClient();

  return useMutation<Equipment, Error, CreateEquipmentPayload>({
    // El pedido real: POST a /equipment con los datos del formulario
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<Equipment>('/equipment', payload);
      return data;
    },

    // Se ejecuta SOLO si el POST salió bien
    onSuccess: () => {
      // Marca la lista como "vieja" para que se vuelva a pedir al servidor.
      // El return hace que la mutación espere a que la lista se actualice.
      return queryClient.invalidateQueries({ queryKey: EQUIPMENT_QUERY_KEY });
    },

    // Se ejecuta SOLO si el POST falló
    onError: (error) => {
      console.error('No se pudo crear el equipo:', error.message);
    },
  });
}