// src/screens/HomeScreen.tsx
// Pantalla de lista — muestra todos los elementos del dominio.
// Al presionar un ítem navega al DetailScreen pasando los params.

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';
import { ITEMS } from '../data/mockData';
import { COLORS } from '../theme';
import ItemCard from '../components/ItemCard';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeList'>;

export default function HomeScreen({ navigation }: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => navigation.navigate('HomeDetail', { id: item.id, name: item.name })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { paddingVertical: 12 },
  separator: { height: 10 },
});
