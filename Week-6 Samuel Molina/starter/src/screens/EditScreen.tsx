// 3-proyecto/starter/src/screens/EditScreen.tsx
// Formulario para editar un equipo existente.
// Carga los datos actuales de la API y rellena el formulario con reset().

import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { itemSchema, type ItemFormData, type ItemFormInput } from '../schemas/itemSchema';
import { useItemById, useUpdateItem } from '../hooks/useItems';

type EditNavProp = NativeStackNavigationProp<RootStackParamList, 'Edit'>;
type EditRouteProp = RouteProp<RootStackParamList, 'Edit'>;

// ──────────────────────────────────────────────
// PANTALLA
// ──────────────────────────────────────────────

export function EditScreen(): React.JSX.Element {
  const navigation = useNavigation<EditNavProp>();
  const route = useRoute<EditRouteProp>();
  const { id } = route.params;

  // 1) Pedir el equipo actual a la API
  const { data: item, isLoading, isError, refetch } = useItemById(id);

  // 2) El "recepcionista": mismo formulario que en Create
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ItemFormInput, unknown, ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: '',
      category: '',
      pricePerDay: '',
      description: '',
    },
  });

  // 3) Cuando el equipo llega de la API, rellenar la hoja con sus datos
  useEffect(() => {
    if (item) {
      reset({
        name: item.name,
        category: item.category,
        pricePerDay: String(item.pricePerDay),
        description: item.description ?? '',
      });
    }
  }, [item, reset]);

  // 4) El mensajero que hace el PUT a la API
  const { mutateAsync: updateItem } = useUpdateItem();

  // Solo se ejecuta si Zod aprobó todos los campos
  async function onSubmit(data: ItemFormData): Promise<void> {
    try {
      await updateItem({
        id,
        name: data.name,
        category: data.category,
        pricePerDay: data.pricePerDay,
        available: item?.available ?? true, // se conserva el valor que ya tenía
        description: data.description,
      });
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'No se pudo guardar el equipo. Intenta de nuevo.');
    }
  }

  // Solo se puede guardar si hubo cambios y no se está enviando
  const canSubmit = !isSubmitting && isDirty;

  // Mientras carga los datos del servidor, mostrar indicador de carga
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  // Si la API falló al traer el equipo, ofrecer reintentar
  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar el equipo</Text>
        <Pressable style={styles.retryBtn} onPress={() => void refetch()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
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
        <Text style={styles.hint}>
          Los campos se rellenan con los datos actuales del equipo.
          Modifica lo que necesites y guarda.
        </Text>

        <FormField
          control={control}
          name="name"
          label="Nombre *"
          placeholder="Ej. Taladro percutor"
          returnKeyType="next"
          errorMessage={errors.name?.message}
        />

        <FormField
          control={control}
          name="category"
          label="Categoría *"
          placeholder="Ej. Herramienta eléctrica"
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
            {isSubmitting
              ? <ActivityIndicator size="small" color={COLORS.background} />
              : <Text style={styles.buttonText}>Guardar cambios</Text>
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

// ──────────────────────────────────────────────
// ESTILOS
// ──────────────────────────────────────────────

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: SPACING.md, backgroundColor: COLORS.background },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.errorLight },
  retryBtn: { backgroundColor: COLORS.accent, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.xl, paddingVertical: SPACING.sm },
  retryText: { ...TYPOGRAPHY.body, fontWeight: '600', color: COLORS.text },
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