// src/screens/SettingsScreen.tsx
// Pantalla de ajustes con preferencias persistidas en MMKV
// y un dato sensible persistido con Expo SecureStore (vía useSecureValue).

import React, { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { usePreferences } from '../hooks/usePreferences';
import { useSecureValue } from '../hooks/useSecureValue';

// Clave (etiqueta del compartimento) del dato sensible: código de acceso de la bodega.
// El valor NO está escrito aquí: lo escribe la persona en el campo de abajo.
const SENSITIVE_KEY = 'bodega_access_code';

export function SettingsScreen(): React.JSX.Element {
  const {
    sortOrder,
    setSortOrder,
    compactMode,
    setCompactMode,
    itemsPerPage,
    setItemsPerPage,
  } = usePreferences();

  // Caja fuerte (SecureStore) encapsulada en un hook
  const { isSaved, maskedValue, save, read, remove } = useSecureValue(SENSITIVE_KEY);

  // Texto que la persona está escribiendo (temporal, no es persistencia)
  const [code, setCode] = useState('');

  async function handleSave(): Promise<void> {
    const trimmed = code.trim();
    if (trimmed.length < 4) {
      Alert.alert('Código inválido', 'El código debe tener al menos 4 caracteres.');
      return;
    }
    try {
      await save(trimmed);
      setCode(''); // limpiar el campo: el secreto no queda en pantalla
      Alert.alert('Guardado', 'El código quedó guardado de forma cifrada.');
    } catch {
      Alert.alert('Error', 'No se pudo guardar el dato sensible.');
    }
  }

  async function handleRead(): Promise<void> {
    try {
      const found = await read();
      if (!found) {
        Alert.alert('No encontrado', 'No hay dato sensible guardado aún.');
      }
    } catch {
      Alert.alert('Error', 'No se pudo leer el dato sensible.');
    }
  }

  async function handleDelete(): Promise<void> {
    try {
      await remove();
      Alert.alert('Eliminado', 'El código fue removido de SecureStore.');
    } catch {
      Alert.alert('Error', 'No se pudo eliminar el dato sensible.');
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* ──────────────────────────────────────────────────────
          SECCIÓN MMKV — Preferencias de la app
      ────────────────────────────────────────────────────── */}
      <Text style={styles.sectionTitle}>Preferencias de la app</Text>
      <Text style={styles.sectionHint}>
        Estos valores se persisten con MMKV. Cambian en tiempo real sin
        necesidad de pulsar "Guardar".
      </Text>

      {/* Preferencia: Modo compacto */}
      <View style={styles.row}>
        <View style={styles.rowInfo}>
          <Text style={styles.rowLabel}>Modo compacto</Text>
          <Text style={styles.rowDesc}>
            Muestra menos información por equipo en la lista
          </Text>
        </View>
        <Switch
          value={compactMode}
          onValueChange={(v) => setCompactMode(v)}
          trackColor={{ false: COLORS.border, true: COLORS.accent }}
          thumbColor={COLORS.background}
        />
      </View>

      {/* Preferencia: Orden de la lista */}
      <View style={[styles.row, styles.rowColumn]}>
        <Text style={styles.rowLabel}>Orden de la lista</Text>
        <View style={styles.segmented}>
          {(['asc', 'desc'] as const).map((opt) => (
            <Pressable
              key={opt}
              style={[
                styles.segment,
                sortOrder === opt && styles.segmentActive,
              ]}
              onPress={() => setSortOrder(opt)}
            >
              <Text
                style={[
                  styles.segmentText,
                  sortOrder === opt && styles.segmentTextActive,
                ]}
              >
                {opt === 'asc' ? 'A → Z' : 'Z → A'}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.rowDesc}>
          Valor actual: <Text style={styles.mono}>{sortOrder}</Text>
        </Text>
      </View>

      {/* Preferencia: Ítems por página */}
      <View style={[styles.row, styles.rowColumn]}>
        <Text style={styles.rowLabel}>Equipos por página</Text>
        <View style={styles.segmented}>
          {([5, 10, 20] as const).map((n) => (
            <Pressable
              key={n}
              style={[
                styles.segment,
                itemsPerPage === n && styles.segmentActive,
              ]}
              onPress={() => setItemsPerPage(n)}
            >
              <Text
                style={[
                  styles.segmentText,
                  itemsPerPage === n && styles.segmentTextActive,
                ]}
              >
                {n}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.rowDesc}>
          Valor actual: <Text style={styles.mono}>{itemsPerPage}</Text>
        </Text>
      </View>

      {/* ──────────────────────────────────────────────────────
          SECCIÓN SecureStore — Código de acceso de la bodega
      ────────────────────────────────────────────────────── */}
      <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>
        Seguridad (SecureStore)
      </Text>
      <Text style={styles.sectionHint}>
        El código de acceso de la bodega se guarda cifrado en Keychain (iOS)
        o Keystore (Android). Nunca se muestra completo en pantalla.
      </Text>

      <Text style={styles.rowDesc}>
        Estado:{' '}
        <Text style={styles.mono}>
          {isSaved ? 'código guardado ✓' : 'sin código guardado'}
        </Text>
      </Text>

      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="Escribe el código de acceso…"
        placeholderTextColor={COLORS.textMuted}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />

      {maskedValue && (
        <View style={styles.maskedContainer}>
          <Text style={styles.rowLabel}>Valor leído (enmascarado):</Text>
          <Text style={styles.maskedValue}>{maskedValue}</Text>
        </View>
      )}

      <View style={styles.secureActions}>
        <Pressable style={styles.btnSecure} onPress={handleSave}>
          <Text style={styles.btnSecureText}>💾 Guardar</Text>
        </Pressable>
        <Pressable
          style={[styles.btnSecure, styles.btnSecureAlt]}
          onPress={handleRead}
        >
          <Text style={[styles.btnSecureText, { color: COLORS.accent }]}>
            🔍 Leer
          </Text>
        </Pressable>
        <Pressable
          style={[styles.btnSecure, styles.btnDanger]}
          onPress={handleDelete}
        >
          <Text style={[styles.btnSecureText, { color: COLORS.error }]}>
            🗑️ Eliminar
          </Text>
        </Pressable>
      </View>

      {/* Nota pedagógica */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 <Text style={{ fontWeight: '700' }}>Tip:</Text> En una app real
          guardarías en SecureStore el token JWT, el PIN del usuario o la
          clave de cifrado local — nunca en AsyncStorage ni MMKV sin cifrar.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, paddingBottom: SPACING.xxl, gap: SPACING.sm },

  sectionTitle: { ...TYPOGRAPHY.subtitle, marginBottom: SPACING.xs },
  sectionHint: { ...TYPOGRAPHY.caption, marginBottom: SPACING.md, fontStyle: 'italic' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
  },
  rowColumn: { flexDirection: 'column', alignItems: 'flex-start', gap: SPACING.sm },
  rowInfo: { flex: 1, marginRight: SPACING.md },
  rowLabel: { ...TYPOGRAPHY.body, fontWeight: '600' },
  rowDesc: { ...TYPOGRAPHY.caption, marginTop: 2 },
  mono: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },

  segmented: { flexDirection: 'row', gap: SPACING.xs },
  segment: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  segmentActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  segmentText: { ...TYPOGRAPHY.caption },
  segmentTextActive: { color: COLORS.background, fontWeight: '700' },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
    fontSize: 16,
  },

  maskedContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    gap: SPACING.xs,
  },
  maskedValue: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.accent,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  secureActions: { flexDirection: 'row', gap: SPACING.sm },
  btnSecure: {
    flex: 1,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  btnSecureAlt: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  btnDanger: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  btnSecureText: { ...TYPOGRAPHY.caption, fontWeight: '700', color: COLORS.background },

  infoBox: {
    backgroundColor: COLORS.surface,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
    borderRadius: RADIUS.xs,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  infoText: { ...TYPOGRAPHY.caption },
});