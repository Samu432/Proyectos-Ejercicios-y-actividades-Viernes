// src/hooks/usePreferences.ts
// Hook de preferencias del usuario almacenadas con MMKV.

import { useMMKVBoolean, useMMKVNumber, useMMKVString } from 'react-native-mmkv';
import { storage } from '../storage/mmkv';

// ─── Claves de preferencias (evitar strings sueltos) ─────────────────────────
const PREF_KEYS = {
  SORT_ORDER:     'pref_sortOrder',
  COMPACT_MODE:   'pref_compactMode',
  ITEMS_PER_PAGE: 'pref_itemsPerPage',
} as const;

// ─── Tipo de los valores de sortOrder ─────────────────────────────────────────
export type SortOrder = 'asc' | 'desc';

// ─── Hook principal ────────────────────────────────────────────────────────────
export function usePreferences() {
  const [sortOrder, setSortOrder]       = useMMKVString(PREF_KEYS.SORT_ORDER, storage);
  const [compactMode, setCompactMode]   = useMMKVBoolean(PREF_KEYS.COMPACT_MODE, storage);
  const [itemsPerPage, setItemsPerPage] = useMMKVNumber(PREF_KEYS.ITEMS_PER_PAGE, storage);

  return {
    // Si no hay nada guardado todavía, usamos un valor por defecto
    sortOrder: (sortOrder === 'desc' ? 'desc' : 'asc') as SortOrder,
    setSortOrder: (value: SortOrder) => setSortOrder(value),

    compactMode: compactMode ?? false,
    setCompactMode: (value: boolean) => setCompactMode(value),

    itemsPerPage: itemsPerPage ?? 10,
    setItemsPerPage: (value: number) => setItemsPerPage(value),
  };
}