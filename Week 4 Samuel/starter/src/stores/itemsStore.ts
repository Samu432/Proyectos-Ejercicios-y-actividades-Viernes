// src/stores/itemsStore.ts
// Store Zustand del equipo seleccionado para la pantalla de detalle.

import { create } from 'zustand';
import type { Item } from '../types';

interface ItemsStore {
  // Equipo que se está viendo en el detalle (null si no hay ninguno)
  selectedItem: Item | null;

  // Marca un equipo como seleccionado
  selectItem: (item: Item) => void;

  // Limpia la selección
  clearSelection: () => void;
}

export const useItemsStore = create<ItemsStore>((set) => ({
  selectedItem: null,

  selectItem: (item) => {
    set({ selectedItem: item });
  },

  clearSelection: () => {
    set({ selectedItem: null });
  },
}));