# Huellas Originarias

**Aplicación de divulgación educativa** que muestra la evolución de las comunidades indígenas argentinas a lo largo de 7 momentos históricos, desde ~12.000 AC hasta el Presente.

> **Nota:** Este proyecto está en fase de desarrollo activo. El contenido (`communities.ts`) aún está siendo revisado por colaboradores antropólogos; las correcciones estructurales (componentes, mapa, leyenda) ya están completadas y son seguras de usar.

---

## 📖 ¿De qué trata?

La app muestra un **mapa de Argentina** con manchas de colores que representan comunidades originarias en diferentes períodos históricos. El usuario puede:

- **Avanzar el tiempo** en pasos predefinidos (7 momentos: 12.000 AC, 5.000 AC, 1.000 AC, 1.400 DC, 1.536 DC, 1.850 DC, Presente). Las manchas cambian según las migraciones y transformaciones históricas.
- **Tocar una mancha** → abrir un modal con imágenes, modo de vida, tiempo de hábitat y fuentes citadas.
- **Ver la geolocalización** del usuario (marcador azul + círculo de precisión, no bloquea clicks en el mapa).
- **Filtrar comunidades** mediante el panel de leyenda (mostrar/ocultar, "Todas", "Ninguna").

Diseño visual: tema oscuro indigo → violeta, sin look Material (modo iOS). Base de mapa: SVG vectorial de Wikimedia Commons sin API keys.

---

## 🛠️ Stack tecnológico

| Tecnología | Detalles |
|---|---|
| **Framework** | Ionic 9 + Angular 22 **standalone**, zoneless (sin `NgModule` tradicional) |
| **UI** | Tailwind CSS v4 (configurado en `src/styles.css` con `@import "tailwindcss"`) |
| **Mapa** | Leaflet 1.9+ con **CRS custom** (proyección equirectangular + estiramiento 115% N/S para ajustar el SVG de Wikimedia). **Sin API keys** — la capa base es el SVG `assets/maps/argentina-location-map.svg` (dominio público / CC BY-SA). |
| **Geolocalización** | Capacitor Geolocation + `map.locate({setView: false})` + `map.setView()` animado. En web: `map.locate()` con fallback. |
| **Estado** | Señales (`signal()`) de Angular; sin `zone.js` (zoneless) — las actualizaciones son explícitas. |
| **Build APK** | Capacitor (`cap add android` / `cap open android` / `gradlew assembleDebug`). |
| **Sin backend** | Todo el contenido está hardcodeado en `src/app/data/` (archivos TypeScript). |

---

## 📂 Estructura de datos (fuente de verdad)

| Archivo | Contenido |
|---|---|
| `src/app/data/communities.ts` | **Single source of truth**: 27 comunidades con nombre, color, línea de tiempo, modos de vida, imágenes con créditos, fuentes y 7 períodos de hábitat. *En revisión por colaborador antropólogo.* |
| `src/app/data/periods.ts` | 7 momentos históricos con etiquetas y descripciones cortas. |
| `src/app/data/territories.ts` | **Semillas (centros) Voronoi por período** para los 19 grupos étnicos. Revisado históricamente (ver `docs/territory-audit.md`). Cada período tiene semillas distintas para reflejar migraciones, expansiones y reducciones. |
| `src/app/utils/geo.ts` | `voronoiTerritories(seeds)` — diagramas de Voronoi; `smoothRing(ring, precision)` — suavizado de geojson; `getTerritory(period, id)` — lookup. |

---

## 🚀 Desarrollo local

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo (hot-reload, portal 8100 por defecto, 0.0.0.0 disponible)
npm start          # o: ng serve --port 8100 --host 0.0.0.0

# 3. Build de producción (archivos en www/)
npm run build      # angular build -> www/ (usado por Vercel también)

# 4. Ver en dispositivo (Capacitor)
npx cap add android          # agregar plataforma
npx cap sync                 # sincronizar web assets a android/
./android/gradlew.bat debug  # build APK debug
```

**Server personalizado:**
- Puerto por defecto: 8100 (el 4200/8100 a veces están ocupados en este entorno).
- Si el dev server falla por warnings de TypeScript, el build de producción (`npm run build`) sigue siendo limpio.

---

## 📦 Build y despliegue en Vercel

El proyecto está preparado para Vercel:

1. **Build Command:** `npm run build` (genera en `www/`)
2. **Output Directory:** `www`
3. **Framework Preset:** `Ionic angular` (detectado automáticamente)

**archivo `vercel.json` recomendado (raíz):**

```json
{
  "rewrites": [
    { "source": "/**", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/maps/argentina-location-map.svg",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

- El `rewrite` asegura que el routing SPA/Ionic funcione (deep links como `/comunidad/x`).
- El header `Cache-Control` para el SVG base map (estático, dominio público).

**Para deployar desde la web de Vercel:**
- Nueva proyecto → importar repositorio → el preset ya dice **"Ionic angular"** → revisar que Build Command sea `npm run build` y Output Directory sea `www` → dar en **Deploy**.

---

## 🌐 Deploy en otras plataformas

El proyecto es Angular puro + Ionic, por lo que cualquier plataforma que ejecute `npm run build` y sirva la carpeta `www/` servirá:

- **Netlify:** drag‑and‑drop de la carpeta `www/` o configurar `Publish directory: www`.
- **GitHub Pages:** `npm run build && npx gh-pages -d ./www`.
- **Cloudflare Pages:** similar a Vercel, preset Angular/Ionic.

---

## � cómo contribuir (guidelines para open source)

1. **Dato fuente:** `src/app/data/communities.ts` es el único archivo que debería editarse para nuevo contenido. No modificar componentes ni styles para cambios de dato.
2. **Precisión territorial:** Si se añaden nuevas comunidades o se corrigen delimitaciones, revisar `src/app/data/territories.ts` y generar `docs/territory-audit.md` con la fuente citada.
3. **Nuevos períodos:** Si se quiere añadir un nuevo paso temporal, modificar `src/app/data/periods.ts` y `src/app/data/territories.ts` (agregar semillas) y actualizar el componente `timeline.component.ts` si es necesario.
4. **Warnings de TS:** Los `NG8107` (optional chain sin null/undefined) y `NG8113` (imports no usados) son **ruido intencional en desarrollo** y no bloquean el build. Para un build de producción limpio, se pueden reemplazar, pero el equipo los dejó como ruido de dev.
5. **Reporte de bugs:** Usar los issues de este repositorio. Si el contenido necesita revisión antropológica, etiquetar como `content-review`.

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**. Ver el archivo `LICENSE` (por crear o agregar si se desea). El mapa base SVG proviene de [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Argentina_location_map.svg) bajo CC BY-SA 3.0.

---

## 🙏 Reconocimientos / Fuentes

- Datos base de comunidades y territorios: **revisión CONICET, UNLP y colaboradores externos** (fuentes citadas en `communities.ts` y `territory-audit.md`).
- SVG base mapa: [NordNordWest / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Argentina_location_map.svg) (dominio público / GFDL / CC-BY-SA).
- Íconos: [Ionicons](https://ionicframework.com/docs/icons) (CDN).
- Estilo visual: paleta dark indigo → violeta, acorde con la identidad visual propuesta.

---

## 📱 APK Android (compilación local)

```bash
# Desde la raíz del proyecto:
npx cap add android          # primera vez
npx cap sync                 # actualizar www/ en android/
./android/gradlew.bat assembleDebug   # build: android/app/build/outputs/apk/debug/app-debug.apk

# Para instalar en dispositivo (USB debugging activado):
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

> **Nota:** El APK es *debug* y no tiene firma release/keystore. Para producción es necesario generar un keystore y firmar el APK/Kombi.

---

## 📦 Estado actual del repositorio

- **Commits:** 11 commits principales (ver `git log --oneline`).
- **Ramas:** `main` (trabajo sobre `main`).
- **Último build:** `npm run build` → limpio (Application bundle generation complete).
- **Dev server:** `http://localhost:8100` (servidor foreground/background en puerto 8100).
- **APK:** `android/app/build/outputs/apk/debug/app-debug.apk` (5.27 MB).
- **Pending:** Revisión final de contenido por antropólogo colaborador (no bloquea uso de la app).

---

## 📬 Contacto / mantener el proyecto

- Repositorio local: `D:\Code\huellas-originarias`
- Issues: usar el panel de GitHub Issues para reportar bugs o solicitar nuevas comunidades/períodos.
- Contenido: el archivo `communities.ts` es la "fuente de verdad" y está abierto a correcciones verificables con fuentes académicas.

---

> **¡Gracias por interesarte en Huellas Originarias!** Esta app nace con el objetivo de divulgar el rico patrimonio indígena argentino de manera educativa y visual. Cualquier contribución que respete la metodología y fuentes académicas será bienvenida.