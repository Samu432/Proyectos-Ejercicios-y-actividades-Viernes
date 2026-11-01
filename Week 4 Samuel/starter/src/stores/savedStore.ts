// src/stores/savedStore.ts
// Store Zustand para gestionar los equipos guardados.

import { create } from 'zustand';
import type { Item } from '../types';

interface SavedStore {
  // Lista de equipos guardados
  items: Item[];

  // Agrega un equipo (sin duplicados)
  addItem: (item: Item) => void;

  // Elimina un equipo por id
  removeItem: (id: string) => void;

  // Vacía todos los guardados
  clearAll: () => void;

  // Devuelve true si el equipo con ese id está guardado
  isItemSaved: (id: string) => boolean;
}

export const useSavedStore = create<SavedStore>((set, get) => ({
  items: [],

  addItem: (item) => {
    const alreadySaved = get().items.some((i) => i.id === item.id);
    if (alreadySaved) return;
    set((state) => ({ items: [...state.items, item] }));
  },

  removeItem: (id) => {
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
  },

  clearAll: () => {
    set({ items: [] });
  },

  isItemSaved: (id) => {
    return get().items.some((i) => i.id === id);
  },
}));