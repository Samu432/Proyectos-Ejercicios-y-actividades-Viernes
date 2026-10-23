// Convierte 35000 en "$35.000"
export function formatPrice(value: number): string {
  return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}