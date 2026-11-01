// src/navigation/types.ts
// Tipos de parámetros para los navigators del proyecto.

export type RootTabParamList = {
  Home: undefined;
  Saved: undefined;
};

export type HomeStackParamList = {
  HomeList: undefined;
  // El resto de los datos del equipo se lee desde itemsStore
  HomeDetail: {
    id: string;
    name: string;
  };
};
