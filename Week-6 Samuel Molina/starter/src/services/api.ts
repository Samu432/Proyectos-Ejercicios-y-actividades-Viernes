// 3-proyecto/starter/src/services/api.ts
// Instancia centralizada de Axios apuntando a la MockAPI de equipos.

import axios from 'axios';

export const apiClient = axios.create({
  // Sin "/equipment" al final: esa parte la agrega cada hook
  baseURL:
    process.env.EXPO_PUBLIC_API_URL ??
    'https://6af66a0ce844c7ff741b53a0.mockapi.io',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor global de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (__DEV__) {
      console.error('[API error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  },
);