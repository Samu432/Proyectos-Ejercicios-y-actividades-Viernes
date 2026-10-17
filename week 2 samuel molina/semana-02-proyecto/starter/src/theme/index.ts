// ============================================
// THEME — Semana 02
// Constantes de estilo globales.
// Úsalas en todos los StyleSheet del proyecto.
// ============================================

export const COLORS = {
  // Fondos (marrones muy oscuros, para que el texto claro se lea bien y contraste)
  background: '#1A1410',
  surface: '#261D17',
  surfaceAlt: '#33271F',

  // Bordes
  border: '#4A3A2E',
  borderLight: '#3A2C22',

  // Texto
  textPrimary: '#F5EDE4',
  textSecondary: '#B8A596',
  textMuted: '#8C7B6D',

  // Acento: naranja de seguridad y tipo construccion (conos, chalecos, señales de obra)
  accent: '#F28C28',
  accentDim: '#F28C2833', // el mismo naranja con 20% de opacidad

  // Semánticos
  success: '#3fb950',
  warning: '#E3B341',
  error: '#f85149',
  info: '#58a6ff',
} as const;

export const TYPOGRAPHY = {
  // Tamaños de fuente
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    xxl: 30,
  },

  // Pesos
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const RADIUS = {
  sm: 6,
  md: 8,
  lg: 12,
  full: 9999,
} as const;