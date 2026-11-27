// src/hooks/useItems.ts
// TanStack Query hooks con caché AsyncStorage para soporte offline.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createItem, fetchItemById, fetchItems, updateItem } from '../services/api';
import type { Item, ItemsWithSource } from '../types';

// ─── Query keys ───────────────────────────────────────────────────────────────
const ITEMS_QUERY_KEY = ['items'] as const;

// ─── AsyncStorage key para caché offline ─────────────────────────────────────
const CACHE_KEY = '@items_cache';

// ─── useItems — lista con caché offline ───────────────────────────────────────
export function useItems() {
  return useQuery<ItemsWithSource>({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: async (): Promise<ItemsWithSource> => {
      try {
        // 1. Intentar traer los datos frescos de internet
        const data = await fetchItems();
        // 2. Si funcionó, guardar una copia en el "armario"
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
        return { items: data, source: 'network' };
      } catch {
        // 3. Sin red: buscar la última copia guardada
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          return { items: JSON.parse(cached) as Item[], source: 'cache' };
        }
        // 4. Sin red y sin copia: ahora sí es un error de verdad
        throw new Error('Sin red y sin caché disponible');
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}

// ─── useItemById ───────────────────────────────────────────────────────────────
export function useItemById(id: number | string | undefined) {
  return useQuery({
    queryKey: [...ITEMS_QUERY_KEY, id],
    queryFn: () => fetchItemById(id!),
    enabled: id !== undefined,
  });
}

// ─── useCreateItem ─────────────────────────────────────────────────────────────
export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Omit<Item, 'id'>) => createItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
}

// ─── useUpdateItem ─────────────────────────────────────────────────────────────
export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number | string } & Partial<Omit<Item, 'id'>>) =>
      updateItem(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...ITEMS_QUERY_KEY, variables.id] });
    },
  });
}