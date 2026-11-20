// Week-6 Samuel Molina/starter/src/components/FormField.tsx
// Componente reutilizable que encapsula Controller + TextInput + mensaje de error.

import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

// ──────────────────────────────────────────────────────────
// Props del componente
// ──────────────────────────────────────────────────────────

interface FormFieldProps<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> extends TextInputProps {
  // El "recepcionista" del formulario (viene de useForm)
  control: Control<TFieldValues, unknown, TTransformedValues>;
  // Nombre del campo: solo acepta nombres que existan en el formulario
  name: FieldPath<TFieldValues>;
  label: string;
  errorMessage?: string;
}

// ──────────────────────────────────────────────────────────
// Componente
// ──────────────────────────────────────────────────────────

export function FormField<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  label,
  errorMessage,
  ...textInputProps
}: FormFieldProps<TFieldValues, TTransformedValues>): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, !!errorMessage && styles.inputError]}
            value={value === undefined || value === null ? '' : String(value)}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={COLORS.textMuted}
            {...textInputProps}
          />
        )}
      />

      {/* Mensaje de error: siempre reserva espacio para evitar saltos de diseño */}
      <Text style={styles.error} numberOfLines={1}>
        {errorMessage ?? ''}
      </Text>
    </View>
  );
}

// ──────────────────────────────────────────────────────────
// Estilos
// ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { gap: SPACING.xs },
  label: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.6 },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  inputError: { borderColor: COLORS.error },
  error: { ...TYPOGRAPHY.error, minHeight: 16 },
});