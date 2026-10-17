import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Equipment } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

interface ItemCardProps {
  item: Equipment;
  onPress: (item: Equipment) => void;
}

// Convierte 45000 en "45.000" osea a pesos colombianos o algo asi nos vasamos en miles
function formatPrice(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    //y bueno el Pressable que se uso la semana pasada para añadirle el estilo scundario cuando apretemos el boton
    <Pressable 
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(item)}
      accessibilityRole="button"
      accessibilityLabel={item.name}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.fieldText}>{item.brand}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>${formatPrice(item.pricePerDay)} / día</Text>
        <Text style={item.available ? styles.statusOn : styles.statusOff}>
          {item.available ? 'Disponible' : 'Alquilado'}
        </Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.category}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    marginHorizontal: SPACING.base,
    marginVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardPressed: {
    backgroundColor: COLORS.surfaceAlt,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  fieldText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  footer: {
    flexDirection: 'row', //Aqui para poner el precio a la izquierda y el estado a la derecha
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  price: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
  },
  statusOn: {
  fontSize: TYPOGRAPHY.size.sm,
  fontWeight: TYPOGRAPHY.weight.semibold,
  color: COLORS.success,   
  },
  statusOff: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
  },
  badge: { //categoria con etiqueta redondeada para que se vea bonito y por sugerencias
    alignSelf: 'flex-start',
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentDim,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.accent,
    textTransform: 'capitalize',
  },
});