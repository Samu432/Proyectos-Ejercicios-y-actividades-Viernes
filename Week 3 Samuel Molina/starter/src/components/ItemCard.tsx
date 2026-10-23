import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import type { Item } from '../types';
import { COLORS } from '../theme';
import { formatPrice } from '../utils/format';

interface ItemCardProps {
  item: Item;
  onPress?: () => void; // opcional: en Favoritos la tarjeta no navega
}

export default function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>{formatPrice(item.pricePerDay)} / día</Text>
      </View>

      <View style={[styles.badge, { backgroundColor: item.available ? COLORS.success : COLORS.error }]}>
        <Text style={styles.badgeText}>{item.available ? 'Disponible' : 'Alquilado'}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
  },
  cardPressed: { backgroundColor: COLORS.surfaceAlt },
  emoji: { fontSize: 32, marginRight: 14 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 2 },
  category: { fontSize: 13, color: COLORS.textMuted, marginBottom: 4 },
  price: { fontSize: 14, fontWeight: '600', color: COLORS.accent },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 11, fontWeight: '700', color: COLORS.background },
});