// src/screens/CreateScreen.tsx
// Formulario para registrar un nuevo equipo de construcción.
// RHF + Zod (de semana 06), adaptado al dominio.

import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { itemSchema, type ItemFormData } from '../schemas/itemSchema';
import { useCreateItem } from '../hooks/useItems';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: { name: '', category: '', pricePerDay: '', description: '' },
  });

  const { mutate: createItem, isPending } = useCreateItem();

  function onSubmit(data: ItemFormData): void {
    createItem(
      {
        name: data.name,
        category: data.category,
        pricePerDay: Number(data.pricePerDay), // texto → número
        available: true,                       // un equipo nuevo parte disponible
        description: data.description ?? '',
      },
      { onSuccess: () => navigation.goBack() },
    );
  }

  const canSubmit = !isSubmitting && !isPending;

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
        <Text style={styles.hint}>
          Registra un equipo disponible para alquiler.
        </Text>

        <FormField
          control={control}
          name="name"
          label="Nombre *"
          placeholder="Ej. Taladro percutor…"
          returnKeyType="next"
          errorMessage={errors.name?.message}
        />

        <FormField
          control={control}
          name="category"
          label="Categoría *"
          placeholder="Ej. Herramientas eléctricas…"
          returnKeyType="next"
          errorMessage={errors.category?.message}
        />

        <FormField
          control={control}
          name="pricePerDay"
          label="Precio por día *"
          placeholder="Ej. 45000"
          keyboardType="numeric"
          returnKeyType="next"
          errorMessage={errors.pricePerDay?.message}
        />

        <FormField
          control={control}
          name="description"
          label="Descripción"
          placeholder="Descripción opcional…"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          errorMessage={errors.description?.message}
        />

        <View style={styles.actions}>
          <Pressable
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!canSubmit}
          >
            {isSubmitting || isPending
              ? <ActivityIndicator size="small" color={COLORS.background} />
              : <Text style={styles.buttonText}>Crear equipo</Text>
            }
          </Pressable>

          <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  hint: { ...TYPOGRAPHY.caption, fontStyle: 'italic' },
  actions: { gap: SPACING.sm, marginTop: SPACING.sm },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700' },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});