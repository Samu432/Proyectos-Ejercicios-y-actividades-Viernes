// src/services/api.ts
// Instancia Axios centralizada para el proyecto.
// Todas las peticiones a la API de equipos pasan por aquí.

import axios from 'axios';

// ============================================================
// BASE URL
// ============================================================
// Dirección base de la API en MockAPI.
// OJO: aquí NO va "/equipment"; eso se añade en cada petición.
//
// Si existe la variable EXPO_PUBLIC_API_URL (archivo .env.local) se usa esa;
// si no existe, se usa la URL de MockAPI de abajo. Así el proyecto funciona
// en cualquier computador sin configuración extra.
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'https://6af66a0ce844c7ff741b53a0.mockapi.io';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ============================================================
// INTERCEPTOR DE RESPUESTA — manejo global de errores
// ============================================================
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log de red para debugging en desarrollo
    if (__DEV__) {
      console.error('[API Error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  }
);