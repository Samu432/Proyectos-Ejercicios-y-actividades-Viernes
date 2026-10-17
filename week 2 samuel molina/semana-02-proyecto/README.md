# Alquiler de Equipos de Construcción — Semana 02

App móvil hecha con React Native y Expo que lista equipos de construcción disponibles para alquilar y permite buscarlos en tiempo real por nombre.

## Dominio

**Alquiler de equipos de construcción.** Cada equipo tiene:

| Campo | Descripción |
|---|---|
| `name` | Nombre del equipo (campo por el que se busca) |
| `brand` | Marca |
| `category` | Herramienta eléctrica, Maquinaria, Maquinaria pesada o Estructuras |
| `pricePerDay` | Precio por día en pesos colombianos |
| `available` | Si está disponible o ya está alquilado |

Hay 12 equipos de ejemplo en `src/data/mockData.ts`.

## Capturas de pantalla

| Lista | Búsqueda | Sin resultados |
|---|---|---|
| ![Lista](screenshots/lista.png) | ![Búsqueda](screenshots/busqueda.png) | ![Vacío](screenshots/vacio.png) |

Probado en: [Expo Go en Android ]

## Cómo ejecutar

```bash
cd starter
pnpm install
pnpm start
```

## Decisiones de diseño

- **Búsqueda con `useMemo`:** la lista filtrada solo se recalcula cuando cambia el texto, y la comparación ignora mayúsculas y minúsculas para hacerlo mas dinamico.
- **`useCallback` en `renderItem` y en el estado vacío:** evita crear las funciones de nuevo en cada render.
- **`keyExtractor` por `id`:** cada fila tiene una clave estable, nunca el índice del array.
- **Tema centralizado:** todos los colores, tamaños y espacios vienen de `COLORS`, `TYPOGRAPHY`, `SPACING` y `RADIUS` en `src/theme/index.ts`.
- **Paleta de obra:** fondos marrones oscuros para que el texto claro se lea bien, y naranja de seguridad como color de acento, por su asociación con señales y elementos de construcción.
- **Colores semánticos:** verde para "Disponible" y ámbar para "Alquilado", de modo que el estado se distingue a simple vista sin depender del color de acento.
- **`ItemCard` con 5 campos:** nombre, marca, precio por día, disponibilidad y categoría como etiqueta.
- **Teclado:** `KeyboardAvoidingView` para que no tape la lista y `TouchableWithoutFeedback` para cerrarlo al tocar fuera del buscador.
- **Estado vacío personalizado:** un mensaje que muestra lo que se buscó y sugiere qué intentar.
- **Tipado estricto:** sin `any`, y `EquipmentCategory` es una lista cerrada de categorías.