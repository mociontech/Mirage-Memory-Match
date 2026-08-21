# Kick and Match — Mirage

Juego de memoria de marca para tótem táctil vertical de bajas prestaciones.
React 18 + Vite + TypeScript estricto, sin dependencias de runtime más allá
de React.

## Requisitos del entorno

- Node 22+
- `npm install`
- Copiar `.env.example` a `.env.local` y llenar `VITE_KIOSK_ID`,
  `VITE_DATA_HUB_URL`, `VITE_RANKING_DB_URL` (ver sección "Pendientes" —
  hoy están vacías a propósito).

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | `tsc` (type-check estricto) + build de producción |
| `npm run preview` | Sirve el build de `dist/` |
| `npm run test` | Suite de Vitest |

## Estado del bundle (presupuesto: <150 KB JS gzip)

Última medición (`npm run build`):

```
dist/assets/index-*.js    165.47 kB │ gzip: 54.97 kB   (65% bajo el presupuesto)
dist/assets/index-*.css     9.56 kB │ gzip:  2.57 kB
```

Fuentes autohospedadas (no cuentan contra el presupuesto de JS, pero sí pesan
en la carga inicial): ~61 KB en 4 archivos `.woff2` (Poppins 400/700/800 +
Lora variable 400-700), todas subset latino con `font-display: swap`.

## Arquitectura

```
src/
  app/        FlowMachine (useReducer + Context) — máquina de estados de pantallas
  screens/    Una carpeta por pantalla + ScreenShell (layout compartido: BrandFrame + Logo + fondo)
  components/ Design system: Button, TextField, IdInput, Modal, ProductPopup, BrandFrame, Logo, Badge, AttemptsBadge
  game/       Lógica del juego, sin JSX: useMemoryGame, scoring, shuffle, game.config, products
  services/   api.ts (único punto de salida) + outbox.ts (patrón outbox) + ranking.ts, idService.ts
  hooks/      useIdleReset
  styles/     tokens.css (design tokens), reset.css (kiosk hardening), fonts.css (@font-face)
  types/      Participation
```

### Por qué máquina de estados en vez de router

El flujo es lineal y cerrado (tótem público): un router expondría URLs
manipulables y el botón atrás del navegador, ninguno de los dos deseable en
un kiosco. `FlowMachine` (`useReducer` + `Context`) modela las 8 pantallas
como estados explícitos; "Advertencia" (ID ya usado) **no** es una pantalla
sino un modal sobre `RegisterId`, porque el diseño la muestra como overlay
sin salida hacia el juego, no como destino navegable.

### Patrón outbox (`services/outbox.ts`)

Al terminar la partida, `Result.tsx` escribe el resultado en `localStorage`
(`kam:outbox`) **antes** de que la UI dependa de la red — nunca se bloquea al
participante. Un flush en background reintenta con backoff 1s/2s/4s/8s (5
intentos), reintenta también al recuperar el evento `online`, y purga la
entrada solo tras una respuesta 2xx de **ambos** destinos. Cada envío lleva
`Idempotency-Key` = ID de participación para que un doble flush no duplique
registros.

### Capa de servicios detrás de una interfaz

No existe todavía el endpoint intermedio (edge function) mencionado en el
brief original, así que `services/api.ts` hace fan-out en cliente a dos
destinos (Data Hub + ranking DB) gateados por variables de entorno vacías por
defecto. El día que exista un endpoint único, solo cambia este archivo — el
resto de la app (outbox, screens) no sabe ni le importa cuántos destinos hay
detrás.

### Grid del tablero derivado, no hardcodeado

`game.config.ts` deriva las columnas con `Math.floor(Math.sqrt(totalCards))`.
Esta fórmula reproduce las dos grillas que aparecen en el archivo de Figma
sin necesidad de un caso especial: 20 cartas → 4×5, 16 → 4×4, 12 → 3×4.
Cambiar `PAIRS_COUNT` reconfigura el tablero completo sin tocar otro archivo.

### Animación de cartas

El volteo usa únicamente `transform: rotateY()` + `backface-visibility`
(`screens/Game/Card.tsx`), nunca propiedades que disparen layout. `will-change`
se aplica solo mientras la transición corre (vía `data-animating` + el evento
`onTransitionEnd`), no de forma permanente — con 20 cartas en pantalla,
hintear el compositor todo el tiempo desperdicia memoria en el hardware de
gama baja que es el objetivo de este proyecto.

### Tokens y tipografía

`styles/tokens.css` documenta qué colores vienen de Variables reales de Figma
(`Pantone/Rojo`, `Pag Web/Rojo`, `Pag Web/Gris`, `Blanco`) y cuáles son
derivados de valores repetidos sin Variable asociada (fondo de página
`#EFEFEF`, borde de inputs, overlay de modales). Poppins (display/botones) y
Lora (cuerpo) se autohospedan en `styles/fonts.css`, subset latino, sin
ninguna llamada a Google Fonts en runtime.

## Pendientes que requieren información del cliente

Estos NO bloquean el build ni el flujo — todo funciona con datos de relleno
claramente marcados — pero hace falta contenido real antes de producción:

1. **Catálogo de productos** (`src/game/products.ts`): solo `rt3` tiene copy
   real ("Con el aire RT3 de mirage la vida es cool"); los otros 9 son
   placeholders (`Copy pendiente del cliente para Producto N`). Tampoco hay
   arte de producto real en el archivo de Figma — las cartas boca-arriba usan
   colores de relleno (`screens/Game/Card.tsx`), no imágenes.
2. **Frase de marca de Bienvenida**: el propio Figma trae el texto literal
   "frase inicial de marca" sin reemplazar — se muestra tal cual.
3. **Endpoints reales**: `.env.example` documenta `VITE_DATA_HUB_URL` y
   `VITE_RANKING_DB_URL`, ambas vacías. Mientras no se configuren,
   `submitParticipation` lanza y el outbox simplemente sigue reintentando
   (comportamiento seguro, no hay pérdida de datos: quedan en `localStorage`).
4. **Ranking multi-experiencia**: Kick and Match calcula su propio puntaje
   interno (máximo 100). Cómo se combina con la otra experiencia del tótem
   para el ranking global es una decisión de negocio que vive fuera de este
   repo (backend/Data Hub), no en `services/ranking.ts`.

## Decisiones registradas durante el desarrollo (Fase 0)

- `PAIRS_COUNT = 10` (el Figma era contradictorio: el texto de Instructivo
  decía "las 6", la anotación del canvas decía "8 productos", y había dos
  tableros mockeados distintos — 4×5 y 3×4). Se resolvió a favor del tablero
  4×5 (10 pares).
- Fuente de display/botones: Poppins (el Figma alternaba entre Poppins,
  Proxima Nova y Montserrat según la pantalla).
- Radio de `IdInput`: 16px (el Figma alternaba entre 16px y 4px según la
  pantalla).
- Puntaje: +10 por acierto, −5 por error, piso en 0, máximo 100. Timer total
  de partida: 90s: al llegar a 0 la partida termina con el puntaje
  acumulado hasta ese momento, sin importar pares pendientes.
