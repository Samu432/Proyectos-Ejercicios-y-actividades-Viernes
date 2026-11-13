<!-- Week-5 Samuel Molina/README.md -->

# Semana 05 — Networking y TanStack Query v5

**Autor:** Samuel Esteban Molina Diaz
**Dominio asignado:** Alquiler de equipos de construcción

App móvil hecha con Expo y React Native que consume una API REST con **Axios** y **TanStack Query v5**. Muestra la lista de equipos disponibles para alquilar, el detalle de cada uno y permite registrar equipos nuevos.

## 🌐 API utilizada

Se usa **MockAPI** (mockapi.io), un servicio en internet donde se creó una API propia para el dominio.

- **Endpoint:** `https://6af66a0ce844c7ff741b53a0.mockapi.io/equipment`
- **Métodos usados:** `GET /equipment`, `GET /equipment/:id` y `POST /equipment`

La URL está como valor por defecto en `starter/src/services/api.ts`, así que la app funciona sin configurar nada. Opcionalmente se puede cambiar con la variable `EXPO_PUBLIC_API_URL`.

### Modelo de datos

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | string | Lo asigna el servidor |
| `name` | string | Nombre del equipo |
| `category` | string | Tipo de equipo (Maquinaria, Herramienta eléctrica...) |
| `pricePerDay` | number | Precio de alquiler por día, en COP |
| `available` | boolean | `true` si está libre para alquilar |
| `description` | string (opcional) | Detalles del equipo |

### Si la API ya no está disponible

Crea un proyecto gratis en MockAPI, añade un recurso llamado `equipment` con los campos de la tabla anterior, pega este JSON de ejemplo en "Resource data" y cambia la URL en `api.ts`:

```json
[
  { "id": "1", "name": "Taladro percutor", "category": "Herramienta eléctrica", "pricePerDay": 45000, "available": true, "description": "Ideal para perforar concreto y mampostería" },
  { "id": "2", "name": "Mezcladora de concreto", "category": "Maquinaria", "pricePerDay": 120000, "available": true, "description": "Capacidad de 350 litros, motor eléctrico" },
  { "id": "3", "name": "Andamio tubular", "category": "Estructuras", "pricePerDay": 30000, "available": false, "description": "Módulo de 2 metros con plataforma y barandas" }
]
```

## 🚀 Cómo ejecutar

```bash
cd starter
pnpm install
pnpm start
```

Escanea el código QR con **Expo Go**.

> ⚠️ **Este proyecto usa Expo SDK 57.** Expo Go debe ser la versión para SDK 57. Si la tienda ya instaló una más nueva, verás el error "Project is incompatible with this version of Expo Go". En Android, descarga la versión correcta desde [expo.dev/go](https://expo.dev/go). En iOS, usa [sign.expo.dev](https://sign.expo.dev/).

## ✅ Requisitos cumplidos

| Requisito | Dónde está |
|---|---|
| Lista con `useQuery` y `FlatList` | `src/hooks/useEquipment.ts` y `src/screens/HomeScreen.tsx` |
| Detalle del equipo | `src/screens/DetailScreen.tsx` con `useEquipmentById` |
| Crear con `useMutation` | `src/hooks/useCreateEquipment.ts` y `src/screens/CreateScreen.tsx` |
| `invalidateQueries` en `onSuccess` | `src/hooks/useCreateEquipment.ts` |
| Pull-to-refresh | `HomeScreen`: `onRefresh` y `refreshing` |
| Estado de carga | `ActivityIndicator` mientras `isLoading` |
| Estado de error | Mensaje y botón "Reintentar" cuando `isError` |
| Estado vacío | `ListEmptyComponent` cuando no hay equipos |

## 🏗️ Estructura

```
starter/
├── App.tsx                        # QueryClientProvider + NavigationContainer
├── index.ts                       # Punto de entrada de Expo
└── src/
    ├── services/api.ts            # Instancia de Axios con la baseURL
    ├── hooks/
    │   ├── useEquipment.ts        # useQuery: lista y detalle
    │   └── useCreateEquipment.ts  # useMutation: crear equipo
    ├── navigation/                # Stack con 3 pantallas y sus tipos
    ├── screens/                   # HomeScreen, DetailScreen, CreateScreen
    ├── types/index.ts             # Interfaces Equipment y CreateEquipmentPayload
    └── theme/index.ts             # Colores, tipografía y espaciado
```