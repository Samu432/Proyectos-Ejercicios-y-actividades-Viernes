// src/screens/HomeScreen.tsx
// Pantalla principal: lista de equipos con botón Guardar y navegación al detalle.

import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { CATEGORY_LABELS, ITEMS } from '../data/mockData';
import { useItemsStore } from '../stores/itemsStore';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import type { HomeStackParamList } from '../navigation/types';

type HomeScreenNavProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;

// ============================================================
// SUB-COMPONENTE: ItemCard
// ============================================================

interface ItemCardProps {
  item: Item;
  onPress: () => void;
}

function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  // Selectores específicos: cada uno lee solo lo que necesita
  const isSaved = useSavedStore((s) => s.items.some((i) => i.id === item.id));
  const addItem = useSavedStore((s) => s.addItem);
  const removeItem = useSavedStore((s) => s.removeItem);

  // No se puede guardar un equipo no disponible (sí quitarlo si ya estaba)
  const saveDisabled = !isSaved && !item.available;

  const handleToggleSave = (): void => {
    if (isSaved) {
      removeItem(item.id);
    } else if (item.available) {
      addItem(item);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      testID={`item-card-${item.id}`}
    >
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailText}>{item.name.charAt(0)}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardCategory}>{CATEGORY_LABELS[item.category]}</Text>
        <Text style={styles.cardPrice}>
          ${item.pricePerDay.toLocaleString('es-CO')} / día
        </Text>
        {!item.available && (
          <Text style={styles.unavailableText}>No disponible</Text>
        )}
      </View>

      <Pressable
        style={[
          styles.saveButton,
          isSaved && styles.saveButtonActive,
          saveDisabled && styles.saveButtonDisabled,
        ]}
        onPress={handleToggleSave}
        disabled={saveDisabled}
        testID={`save-button-${item.id}`}
      >
        <Text
          style={[
            styles.saveButtonText,
            isSaved && styles.saveButtonTextActive,
            saveDisabled && styles.saveButtonTextDisabled,
          ]}
        >
          {isSaved ? 'Quitar' : 'Guardar'}
        </Text>
      </Pressable>
    </Pressable>
  );
}

// ============================================================
// PANTALLA: HomeScreen
// ============================================================

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavProp>();
  const selectItem = useItemsStore((s) => s.selectItem);

  const items = ITEMS;

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <ItemCard
      item={item}
      onPress={() => {
        selectItem(item);
        navigation.navigate('HomeDetail', { id: item.id, name: item.name });
      }}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <Text style={styles.sectionLabel}>
            {items.length} equipo{items.length !== 1 ? 's' : ''}
          </Text>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay equipos disponibles.</Text>
        }
      />
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
  },
  list: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
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
  cardPressed: {
    opacity: 0.7,
  },
  thumbnail: {
    width: 48,
    height: 48,
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
  },
  cardPrice: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
    fontWeight: '600',
  },
  unavailableText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
  saveButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  saveButtonActive: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.textMuted,
  },
  saveButtonDisabled: {
    borderColor: COLORS.border,
    opacity: 0.5,
  },
  saveButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
    fontWeight: '600',
  },
  saveButtonTextActive: {
    color: COLORS.textSecondary,
  },
  saveButtonTextDisabled: {
    color: COLORS.textMuted,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginTop: SPACING.xl,
    color: COLORS.textSecondary,
  },
});