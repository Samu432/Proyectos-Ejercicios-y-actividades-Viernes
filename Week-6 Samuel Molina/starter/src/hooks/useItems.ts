// 3-proyecto/starter/src/hooks/useItems.ts
// Hooks CRUD de equipos con TanStack Query + Axios.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../services/api';
import type { CreateItemPayload, Item, UpdateItemPayload } from '../types';

export const ITEMS_QUERY_KEY = ['items'] as const;

// ─────────────────────────────────────────
// READ — lista de equipos
// ─────────────────────────────────────────

export function useItems() {
  return useQuery<Item[]>({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: () => apiClient.get<Item[]>('/equipment').then((r) => r.data),
  });
}

// ─────────────────────────────────────────
// READ — un equipo (para el formulario Edit)
// ─────────────────────────────────────────

export function useItemById(id: number | string) {
  return useQuery<Item>({
    queryKey: [...ITEMS_QUERY_KEY, id],
    queryFn: () => apiClient.get<Item>(`/equipment/${id}`).then((r) => r.data),
    enabled: !!id,
  });
}

// ─────────────────────────────────────────
// CREATE
// ─────────────────────────────────────────

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation<Item, Error, CreateItemPayload>({
    mutationFn: (payload) =>
      apiClient.post<Item>('/equipment', payload).then((r) => r.data),
    onSuccess: () => {
      // Refresca la lista para que aparezca el equipo nuevo
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
}

// ─────────────────────────────────────────
// UPDATE
// ─────────────────────────────────────────

export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation<Item, Error, UpdateItemPayload>({
    mutationFn: ({ id, ...body }) =>
      apiClient.put<Item>(`/equipment/${id}`, body).then((r) => r.data),
    onSuccess: (_, variables) => {
      // Refresca la lista y también el equipo individual
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: [...ITEMS_QUERY_KEY, variables.id],
      });
    },
  });
}