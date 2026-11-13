// src/screens/CreateScreen.tsx
// Pantalla modal para crear un nuevo equipo de construcción.
// Usa useCreateEquipment (useMutation) y vuelve a la lista al terminar.

import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { useCreateEquipment } from '../hooks/useCreateEquipment';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

// ============================================================
// PANTALLA: CreateScreen
// ============================================================

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();

  // Un "estado" por cada campo del formulario.
  // El precio se guarda como texto mientras se escribe y se convierte a número al enviar.
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  const [description, setDescription] = useState('');

  // mutate = función para enviar el pedido; isPending = true mientras viaja
  const { mutate: createEquipment, isPending } = useCreateEquipment();

  // El botón solo se activa si los datos obligatorios están completos
  const priceNumber = Number(price);
  const canSubmit =
    name.trim().length > 0 &&
    category.trim().length > 0 &&
    priceNumber > 0 &&
    !isPending;

  function handleSubmit(): void {
    if (!canSubmit) return;

    createEquipment(
      {
        name: name.trim(),
        category: category.trim(),
        pricePerDay: priceNumber,
        available,
        // Si la descripción quedó vacía, no la enviamos
        description: description.trim() || undefined,
      },
      {
        // Se ejecuta DESPUÉS de que el hook actualizó la lista
        onSuccess: () => navigation.goBack(),
        onError: (error) =>
          Alert.alert('No se pudo crear el equipo', error.message),
      },
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionLabel}>Datos del nuevo equipo</Text>

        {/* Campo: nombre (obligatorio) */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Nombre <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ej: Taladro percutor"
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="next"
          />
        </View>

        {/* Campo: categoría (obligatorio) */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Categoría <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="Ej: Maquinaria"
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="next"
          />
        </View>

        {/* Campo: precio por día (obligatorio, solo números) */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Precio por día (COP) <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={price}
            // Quitamos cualquier carácter que no sea un dígito
            onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ''))}
            placeholder="Ej: 45000"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
          />
        </View>

        {/* Campo: disponibilidad (interruptor sí/no) */}
        <View style={styles.switchRow}>
          <Text style={styles.fieldLabel}>Disponible para alquilar</Text>
          <Switch
            value={available}
            onValueChange={setAvailable}
            trackColor={{ false: COLORS.border, true: COLORS.accent }}
          />
        </View>

        {/* Campo: descripción (opcional) */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={description}
            onChangeText={setDescription}
            placeholder="Descripción opcional…"
            placeholderTextColor={COLORS.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Botón de envío */}
        <Pressable
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={COLORS.background} />
          ) : (
            <Text style={styles.buttonText}>Crear equipo</Text>
          )}
        </Pressable>

        {/* Botón cancelar */}
        <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  sectionLabel: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.8 },
  field: { gap: SPACING.xs },
  fieldLabel: { ...TYPOGRAPHY.body, fontWeight: '600' },
  required: { color: COLORS.error },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  multiline: { minHeight: 96, paddingTop: SPACING.sm },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.background },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});