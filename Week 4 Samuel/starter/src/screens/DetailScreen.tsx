// src/screens/DetailScreen.tsx
// Pantalla de detalle: muestra la información completa de un equipo
// y permite guardarlo / quitarlo usando el store de Zustand.

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { useItemsStore } from '../stores/itemsStore';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import type { HomeStackParamList } from '../navigation/types';

type DetailRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

// ============================================================
// PANTALLA: DetailScreen
// ============================================================

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id, name } = route.params;

  // Equipo seleccionado en Home (solo se usa si coincide con el id)
  const selectedItem = useItemsStore((s) => s.selectedItem);
  const item: Item | null = selectedItem?.id === id ? selectedItem : null;

  // Selectores específicos del store de guardados
  const isSaved = useSavedStore((s) => s.isItemSaved(id));
  const addItem = useSavedStore((s) => s.addItem);
  const removeItem = useSavedStore((s) => s.removeItem);

  const handleToggleSave = (): void => {
    if (isSaved) {
      removeItem(id);
    } else if (item) {
      addItem(item);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroLetter}>{name.charAt(0)}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.id}>ID: {id}</Text>

        {item ? (
          <>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.price}>
              ${item.pricePerDay.toLocaleString('es-CO')} / día
            </Text>
            <Text style={item.available ? styles.available : styles.unavailable}>
              {item.available ? 'Disponible' : 'No disponible'}
            </Text>
            <Text style={styles.description}>{item.description}</Text>
          </>
        ) : (
          <Text style={styles.description}>
            No se encontró la información de este equipo.
          </Text>
        )}
      </View>

      {/* Botón conectado al store: al guardar aquí, el badge del tab
          y el botón de Home se actualizan sin pasar props. */}
      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          isSaved && styles.saveButtonActive,
          pressed && styles.saveButtonPressed,
        ]}
        onPress={handleToggleSave}
        testID="save-button"
      >
        <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextActive]}>
          {isSaved ? '★  Quitar de guardados' : '☆  Guardar'}
        </Text>
      </Pressable>
    </View>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  hero: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  heroLetter: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.accent,
  },
  info: {
    gap: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.h2,
  },
  id: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  category: {
    ...TYPOGRAPHY.caption,
    textTransform: 'capitalize',
  },
  price: {
    ...TYPOGRAPHY.body,
    color: COLORS.accent,
    fontWeight: '700',
  },
  available: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
  },
  unavailable: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginTop: SPACING.sm,
  },
  saveButton: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: 'auto',
  },
  saveButtonActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  saveButtonPressed: {
    opacity: 0.7,
  },
  saveButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  saveButtonTextActive: {
    color: COLORS.background,
  },
});