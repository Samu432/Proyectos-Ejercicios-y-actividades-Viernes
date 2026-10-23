// ============================================
// THEME — Semana 03
// Constantes de estilo globales.
// Úsalas en todos los StyleSheet del proyecto.
// ============================================

export const COLORS = {
  // Fondos
  background: '#1c1c1e',   // gris carbón, como asfalto
  surface: '#2a2a2d',      // gris acero para tarjetas y barras
  surfaceAlt: '#343438',   // gris más claro para estados presionados

  // Bordes
  border: '#4a4a4f',       // gris concreto
  borderLight: '#38383c',  // separadores sutiles

  // Texto
  textPrimary: '#f5f5f0',   // blanco hueso
  textSecondary: '#c4c4bc', // gris claro para subtítulos
  textMuted: '#8e8e86',     // gris cemento para detalles

  // Acento: amarillo de seguridad 
  accent: '#FFB400',
  accentDim: '#FFB40033',   // mismo amarillo con ~20% de opacidad (fondos de etiquetas)

  // Semánticos
  success: '#4caf50',  // disponible
  warning: '#f0883e',  // pocas unidades, mantenimiento
  error: '#e5533d',    // no disponible
  info: '#5aa9e6',     // información neutral
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
