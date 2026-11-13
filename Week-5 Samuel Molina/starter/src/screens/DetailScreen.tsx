// src/screens/DetailScreen.tsx
// Pantalla de detalle: muestra los campos completos de un equipo.
// Pide los datos frescos al servidor con useEquipmentById.

import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { useEquipmentById } from '../hooks/useEquipment';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

// ============================================================
// SUB-COMPONENTE: FieldRow
// ============================================================
// Una fila "etiqueta ........ valor" dentro de la ficha.

interface FieldRowProps {
  label: string;
  value: string;
  valueColor?: string;
}

function FieldRow({ label, value, valueColor }: FieldRowProps): React.JSX.Element {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={[styles.fieldValue, valueColor ? { color: valueColor } : null]}>
        {value}
      </Text>
    </View>
  );
}

// ============================================================
// PANTALLA: DetailScreen
// ============================================================

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  // id y name llegan desde HomeScreen al tocar una tarjeta
  const { id, name } = route.params;

  // Pedimos la ficha completa del equipo al servidor
  const { data: item, isLoading, isError, refetch, error } = useEquipmentById(
    String(id),
  );

  // ── Estado: cargando ─────────────────────────────────────
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  // ── Estado: error, con botón para reintentar ─────────────
  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar el detalle</Text>
        <Text style={styles.errorDetail}>{error?.message}</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Encabezado: inicial del equipo, nombre e id */}
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Text style={styles.heroLetter}>{name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.idBadge}>ID: {id}</Text>
      </View>

      {/* Ficha con los campos del equipo */}
      {item && (
        <View style={styles.fieldsCard}>
          <FieldRow label="Categoría" value={item.category} />
          <FieldRow
            label="Precio por día"
            value={`$${item.pricePerDay.toLocaleString('es-CO')}`}
          />
          <FieldRow
            label="Estado"
            value={item.available ? 'Disponible' : 'Alquilado'}
            valueColor={item.available ? COLORS.success : COLORS.error}
          />
        </View>
      )}

      {/* Descripción: solo si el equipo tiene una */}
      {item?.description ? (
        <View style={styles.descriptionCard}>
          <Text style={styles.fieldLabel}>Descripción</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.lg, paddingBottom: SPACING.xxl },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  hero: { alignItems: 'center', gap: SPACING.sm },
  heroIcon: {
    width: 88,
    height: 88,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLetter: { fontSize: 36, fontWeight: '700', color: COLORS.accent },
  title: { ...TYPOGRAPHY.h2, textAlign: 'center' },
  idBadge: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 1 },
  fieldsCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.md,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.md,
  },
  fieldLabel: { ...TYPOGRAPHY.caption },
  fieldValue: { ...TYPOGRAPHY.body, fontWeight: '600', flexShrink: 1, textAlign: 'right' },
  descriptionCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  descriptionText: { ...TYPOGRAPHY.body },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.error },
  errorDetail: { ...TYPOGRAPHY.caption, textAlign: 'center' },
  retryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  retryButtonText: { ...TYPOGRAPHY.body, color: COLORS.background, fontWeight: '600' },
});