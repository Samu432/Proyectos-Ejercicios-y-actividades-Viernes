// src/screens/DetailScreen.tsx
// Pantalla de detalle — recibe los datos del ítem seleccionado via params.
// Los params llegan del Stack Navigator cuando se llama navigate('HomeDetail', {...}).

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';
import { ITEMS } from '../data/mockData';
import { COLORS } from '../theme';
import { formatPrice } from '../utils/format';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeDetail'>;

export default function DetailScreen({ route }: Props): React.JSX.Element {
  const { id, name } = route.params; // llegan desde HomeScreen
  const item = ITEMS.find((i) => i.id === id); // buscamos el resto de datos por id

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.emoji}>{item?.emoji}</Text>

      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{item?.category}</Text>
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.id}>Código: {id}</Text>

      {item && (
        <>
          <Text style={styles.price}>{formatPrice(item.pricePerDay)} por día</Text>
          <Text style={[styles.status, { color: item.available ? COLORS.success : COLORS.error }]}>
            {item.available ? '● Disponible para alquiler' : '● Actualmente alquilado'}
          </Text>
          <Text style={styles.description}>{item.description}</Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20 },
  emoji: { fontSize: 64, marginBottom: 12 },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentDim,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: { fontSize: 12, fontWeight: '600', color: COLORS.accent },
  name: { fontSize: 26, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4 },
  id: { fontSize: 13, color: COLORS.textMuted, marginBottom: 16 },
  price: { fontSize: 22, fontWeight: '700', color: COLORS.accent, marginBottom: 8 },
  status: { fontSize: 14, fontWeight: '600', marginBottom: 20 },
  description: { fontSize: 15, color: COLORS.textSecondary, lineHeight: 22 },
});