// src/hooks/useSecureValue.ts
// Hook que encapsula Expo SecureStore (la "caja fuerte").
// Las pantallas usan este hook y no tocan SecureStore directamente.

import { useCallback, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

// Muestra solo una pista del valor, nunca el valor completo
function maskValue(value: string): string {
  if (value.length <= 6) return '•'.repeat(value.length);
  return value.slice(0, 2) + '•••' + value.slice(-2);
}

export function useSecureValue(key: string) {
  const [isSaved, setIsSaved] = useState(false);
  const [maskedValue, setMaskedValue] = useState<string | null>(null);

  // Al abrir la pantalla, saber si ya hay algo guardado (sin mostrarlo)
  useEffect(() => {
    SecureStore.getItemAsync(key)
      .then((value) => setIsSaved(value !== null))
      .catch(() => setIsSaved(false));
  }, [key]);

  // Guardar en la caja fuerte
  const save = useCallback(
    async (value: string): Promise<void> => {
      await SecureStore.setItemAsync(key, value);
      setIsSaved(true);
      setMaskedValue(null);
    },
    [key],
  );

  // Leer y mostrar solo la versión enmascarada. Devuelve false si no hay nada.
  const read = useCallback(async (): Promise<boolean> => {
    const value = await SecureStore.getItemAsync(key);
    if (!value) {
      setMaskedValue(null);
      return false;
    }
    setMaskedValue(maskValue(value));
    return true;
  }, [key]);

  // Vaciar el compartimento
  const remove = useCallback(async (): Promise<void> => {
    await SecureStore.deleteItemAsync(key);
    setIsSaved(false);
    setMaskedValue(null);
  }, [key]);

  return { isSaved, maskedValue, save, read, remove };
}