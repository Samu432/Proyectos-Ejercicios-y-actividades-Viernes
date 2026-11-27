# Semana 07 — Persistencia Local · Alquiler de equipos de construcción

App móvil (Expo + React Native + TypeScript) que gestiona un catálogo de **equipos de construcción para alquiler** y aplica tres capas de persistencia local.

**Autor:** Samuel Esteban Molina Diaz

## Dominio

Alquiler de equipos de construcción. Cada equipo tiene nombre, categoría, precio por día, disponibilidad y descripción. Los datos vienen de una API en MockAPI (`/equipment`).

## Qué se implementó

| Capa | Para qué se usa en la app | Archivos |
|------|---------------------------|----------|
| **MMKV** | Preferencias del usuario: orden de la lista (A→Z / Z→A), modo compacto y equipos por página. Se guardan en tiempo real, sin `async/await` y sin botón "Guardar". | `src/storage/mmkv.ts`, `src/hooks/usePreferences.ts`, `src/screens/SettingsScreen.tsx`, `src/screens/HomeScreen.tsx` |
| **AsyncStorage** | Caché offline de la lista de equipos. Si no hay red, se muestra la última lista guardada con un banner de aviso. | `src/hooks/useItems.ts` |
| **Expo SecureStore** | Código de acceso de la bodega, guardado cifrado. La app nunca lo muestra completo (solo enmascarado) y no está escrito en el código. | `src/hooks/useSecureValue.ts`, `src/screens/SettingsScreen.tsx` |

La lógica de almacenamiento está encapsulada en hooks (`usePreferences`, `useItems`, `useSecureValue`); las pantallas solo los usan.

## Cómo probar la app

La app usa MMKV, que necesita código nativo, así que **no funciona en Expo Go**. Hay dos formas de probarla.

### Opción A — Instalar el APK (sin instalar herramientas)

1. Descarga el APK: **https://expo.dev/accounts/samu432/projects/week-07-persistencia-local/builds/5b77fc37-1b4f-42dc-93c6-5b033af56119**
2. Cópialo a un celular Android e instálalo (permite "instalar apps de orígenes desconocidos" si el celular lo pide).
3. Abre la app. Necesita internet para la primera carga de datos.

### Opción B — Compilar desde el código

**Requisitos**

- Node.js 20 o superior (desarrollado con Node 22) y pnpm
- JDK 17
- Android Studio con el SDK de Android instalado (incluye `adb`)
- Variable de entorno `ANDROID_HOME` apuntando al SDK
  - Linux/macOS: `export ANDROID_HOME=$HOME/Android/Sdk` y agregar `$ANDROID_HOME/platform-tools` al `PATH`
  - Windows: crearla en "Variables de entorno del sistema" (normalmente `C:\Users\<usuario>\AppData\Local\Android\Sdk`)
- Un celular Android con **Depuración USB** activada y conectado por cable, o un emulador

**Pasos**

```bash
cd starter          # la carpeta que contiene este README
pnpm install
adb devices         # el celular debe aparecer como "device"
pnpm expo run:android
```

La primera compilación puede tardar bastante porque Gradle descarga componentes. Las siguientes son mucho más rápidas.

Para generar un APK independiente, que no necesita servidor de desarrollo:

```bash
pnpm expo run:android --variant release
# El APK queda en android/app/build/outputs/apk/release/app-release.apk
```

### Verificar TypeScript

```bash
pnpm tsc
```

## Pruebas manuales

- [ ] **COMPLETAR tras probar en el celular:**
- [ ] La app abre sin errores y carga la lista de equipos
- [ ] Cambiar el orden en Ajustes reordena la lista
- [ ] El modo compacto muestra solo nombre y precio
- [ ] "Equipos por página" limita cuántos equipos se muestran
- [ ] Al cerrar y reabrir la app, las preferencias se mantienen
- [ ] Con el modo avión activado, la lista aparece desde la caché con el banner de aviso
- [ ] En Seguridad, guardar, leer (enmascarado) y eliminar el código funciona

## Estructura principal

```
starter/
├── index.ts                  # Punto de entrada
├── App.tsx                   # QueryClient + navegación
└── src/
    ├── storage/mmkv.ts       # Instancia global de MMKV
    ├── hooks/                # usePreferences, useItems, useSecureValue
    ├── screens/              # Home, Create, Settings
    ├── services/api.ts       # Cliente Axios hacia MockAPI
    ├── schemas/itemSchema.ts # Validación con Zod
    ├── components/           # FormField
    ├── navigation/           # Rutas
    ├── theme/                # Colores, espacios, tipografía
    └── types/                # Tipos del dominio
```