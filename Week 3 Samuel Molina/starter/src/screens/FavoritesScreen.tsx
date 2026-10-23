// src/screens/FavoritesScreen.tsx
// Segunda pestaña del Tab Navigator.
// Muestra una lista de elementos favoritos del dominio.

import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { FAVORITES } from '../data/mockData';
import { COLORS } from '../theme';
import ItemCard from '../components/ItemCard';

export default function FavoritesScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={FAVORITES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Aún no tienes equipos favoritos</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { paddingVertical: 12 },
  separator: { height: 10 },
  empty: { textAlign: 'center', color: COLORS.textMuted, marginTop: 40 },
});