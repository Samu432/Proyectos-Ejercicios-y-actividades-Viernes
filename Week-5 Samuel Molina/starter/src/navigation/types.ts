// src/navigation/types.ts
// Tipos de los parámetros de navegación del proyecto.

export type RootStackParamList = {
  // Lista principal de equipos (no recibe datos)
  Home: undefined;
  // Detalle — recibe el id (para pedir la ficha) y el nombre (para el encabezado)
  Detail: { id: string; name: string };
  // Formulario de creación (no recibe datos)
  Create: undefined;
};