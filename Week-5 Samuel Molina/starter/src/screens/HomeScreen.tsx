// src/screens/HomeScreen.tsx
// Pantalla principal: lista de equipos de construcción cargada desde la API.
// Maneja los estados: cargando, error, lista vacía y pull-to-refresh.

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Equipment } from '../types';
import type { RootStackParamList } from '../navigation/types';
import { useEquipment } from '../hooks/useEquipment';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// ============================================================
// SUB-COMPONENTE: EquipmentCard
// ============================================================
// La tarjeta de UN equipo dentro de la lista.

interface EquipmentCardProps {
  item: Equipment;
  onPress: () => void;
}

function EquipmentCard({ item, onPress }: EquipmentCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
      onPress={onPress}
      testID={`equipment-card-${item.id}`}
    >
      <View style={styles.cardAvatar}>
        <Text style={styles.cardAvatarText}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>
          {item.category}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.price}>
            ${item.pricePerDay.toLocaleString('es-CO')} / día
          </Text>
          <Text
            style={[
              styles.availability,
              { color: item.available ? COLORS.success : COLORS.error },
            ]}
          >
            {item.available ? 'Disponible' : 'Alquilado'}
          </Text>
        </View>
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

// Línea de espacio entre una tarjeta y otra
function Separator(): React.JSX.Element {
  return <View style={styles.separator} />;
}

// ============================================================
// PANTALLA: HomeScreen
// ============================================================

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavProp>();

  // El "asistente con libreta" nos entrega el estado del pedido
  const { data, isLoading, isError, isFetching, refetch, error } = useEquipment();

  // ── Estado 1: cargando por primera vez ──────────────────
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Cargando equipos...</Text>
      </View>
    );
  }

  // ── Estado 2: error, con botón para reintentar ──────────
  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>❌ No se pudo cargar la lista</Text>
        <Text style={styles.errorDetail}>{error?.message}</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  // Si llegamos aquí, la carga terminó bien. Por seguridad usamos [] si no hubiera datos.
  const equipment = data ?? [];

  const renderItem: ListRenderItem<Equipment> = ({ item }) => (
    <EquipmentCard
      item={item}
      onPress={() =>
        navigation.navigate('Detail', {
          id: item.id,
          name: item.name,
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={equipment}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.list,
          equipment.length === 0 && styles.listEmpty,
        ]}
        ItemSeparatorComponent={Separator}
        // ── Pull-to-refresh: arrastrar hacia abajo para recargar ──
        onRefresh={() => refetch()}
        refreshing={isFetching}
        // ── Estado 3: lista vacía ──
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No hay equipos disponibles.</Text>
            <Text style={styles.hint}>
              Toca el + de arriba para agregar el primero.
            </Text>
          </View>
        }
        ListHeaderComponent={
          equipment.length > 0 ? (
            <Text style={styles.countLabel}>
              {equipment.length} equipo{equipment.length !== 1 ? 's' : ''}
            </Text>
          ) : null
        }
      />
    </View>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.md, paddingBottom: SPACING.xl },
  listEmpty: { flexGrow: 1 },
  separator: { height: SPACING.sm },
  countLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
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
  cardAvatar: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAvatarText: { ...TYPOGRAPHY.h3, color: COLORS.accent },
  cardContent: { flex: 1, gap: SPACING.xs },
  cardTitle: { ...TYPOGRAPHY.body, fontWeight: '600' },
  cardSubtitle: { ...TYPOGRAPHY.caption },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: { ...TYPOGRAPHY.caption, color: COLORS.textPrimary },
  availability: { fontSize: 12, fontWeight: '600' },
  chevron: { ...TYPOGRAPHY.h2, color: COLORS.textMuted },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  loadingText: { ...TYPOGRAPHY.caption },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.error },
  errorDetail: { ...TYPOGRAPHY.caption, textAlign: 'center' },
  retryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  retryButtonText: { ...TYPOGRAPHY.body, color: COLORS.background, fontWeight: '600' },
  emptyText: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, textAlign: 'center' },
  hint: { ...TYPOGRAPHY.caption, textAlign: 'center', color: COLORS.textMuted },
});