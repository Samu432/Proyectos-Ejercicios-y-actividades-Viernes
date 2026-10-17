// ============================================================
// COMPONENT: ItemCard
// ============================================================
// Tarjeta reutilizable para mostrar un elemento del dominio.
// Este componente se renderiza por cada item en HomeScreen.
// ============================================================

import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Equipment } from '../types';

interface ItemCardProps {
  item: Equipment;
  onPress: (item: Equipment) => void;
}

// Convierte 45000 en "45.000" (separador de miles al estilo colombiano)
function formatPrice(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Image
        source={item.image}
        style={styles.cardImage}
        resizeMode="contain" /* Lo tenia en cover pero las imagenes se veian incompletas */
      />

      <View style={styles.cardBody}>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>

        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>
            ${formatPrice(item.pricePerDay)}
            <Text style={styles.cardPriceUnit}> / día</Text>
          </Text>

          <Pressable
            disabled={!item.available}
            onPress={() => onPress(item)}
            style={({ pressed }) => [
              styles.button,
              !item.available && styles.buttonDisabled,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>
              {item.available ? 'Alquilar' : 'No disponible'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#ffffff', /*  Como ya cambien el cover por contain, para que no se vea la imagen hay flotando cambio el color del espacio sobrante a blanco para que encaje mas o menos  */
  },
  cardBody: {
    padding: 16,
    gap: 4,
  },
  cardCategory: {
    fontSize: 12,
    color: '#61DAFB',
    textTransform: 'uppercase',
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#8b949e',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardPriceUnit: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#8b949e',
  },
  button: {
    backgroundColor: '#61DAFB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonPressed: {
    opacity: 0.7,
    backgroundColor: '#1fdb1f', /* El segundo estilo para el boton por que como usamos pressable */
    transform: [{ scale: 0.95 }],
  },
  buttonDisabled: {
    backgroundColor: '#30363d',
  },
  buttonText: {
    color: '#0d1117',
    fontSize: 14,
    fontWeight: 'bold',
  },
});