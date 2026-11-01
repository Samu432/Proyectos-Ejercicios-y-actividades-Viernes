// src/screens/SavedScreen.tsx
// Pantalla de guardados: muestra todos los equipos que el usuario guardó.
// Lee el estado directamente desde el savedStore (sin props).

import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';

import { useSavedStore } from '../stores/savedStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

// ============================================================
// SUB-COMPONENTE: SavedItem
// ============================================================

interface SavedItemProps {
  item: Item;
  onRemove: () => void;
}

function SavedItem({ item, onRemove }: SavedItemProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailText}>{item.name.charAt(0)}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <Text style={styles.cardPrice}>
          ${item.pricePerDay.toLocaleString('es-CO')} / día
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.removeButton, pressed && { opacity: 0.6 }]}
        onPress={onRemove}
        accessibilityLabel={`Quitar ${item.name} de guardados`}
        testID={`remove-button-${item.id}`}
      >
        <Text style={styles.removeButtonText}>✕</Text>
      </Pressable>
    </View>
  );
}

// ============================================================
// PANTALLA: SavedScreen
// ============================================================

export function SavedScreen(): React.JSX.Element {
  // Selectores específicos: cada uno lee solo lo que necesita
  const items = useSavedStore((state) => state.items);
  const removeItem = useSavedStore((state) => state.removeItem);
  const clearAll = useSavedStore((state) => state.clearAll);

  // Total por día de todos los equipos guardados
  const totalPerDay = items.reduce((sum, item) => sum + item.pricePerDay, 0);

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <SavedItem item={item} onRemove={() => removeItem(item.id)} />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          items.length > 0 ? (
            <View style={styles.headerWrapper}>
              <View style={styles.header}>
                <Text style={styles.sectionLabel}>
                  {items.length} guardado{items.length !== 1 ? 's' : ''}
                </Text>
                <Pressable
                  onPress={clearAll}
                  style={styles.clearButton}
                  testID="clear-all-button"
                >
                  <Text style={styles.clearButtonText}>Limpiar todo</Text>
                </Pressable>
              </View>
              <Text style={styles.totalText}>
                Total por día: ${totalPerDay.toLocaleString('es-CO')}
              </Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>☆</Text>
            <Text style={styles.emptyTitle}>Sin guardados aún</Text>
            <Text style={styles.emptySubtitle}>
              Ve a la lista de equipos y guarda los que quieras alquilar.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },
  headerWrapper: {
    marginBottom: SPACING.sm,
    gap: SPACING.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  totalText: {
    ...TYPOGRAPHY.body,
    color: COLORS.accent,
    fontWeight: '700',
  },
  clearButton: {
    padding: SPACING.xs,
  },
  clearButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
  },
  separator: {
    height: SPACING.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.accent,
  },
  cardContent: {
    flex: 1,
    gap: SPACING.xs,
  },
  cardTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  cardCategory: {
    ...TYPOGRAPHY.caption,
    textTransform: 'capitalize',
  },
  cardPrice: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
    fontWeight: '600',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
    gap: SPACING.md,
  },
  emptyIcon: {
    fontSize: 52,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textSecondary,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
  },
});