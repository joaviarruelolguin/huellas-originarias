# Huellas Originarias

Aplicación de **divulgación histórica y arqueológica** sobre los pueblos
originarios del actual territorio argentino y su ubicación a lo largo del
tiempo.

## La idea

Al entrar, ves un **mapa de Argentina** con un **momento histórico**
predeterminado (por ejemplo 1.000 AC). Sobre el mapa aparecen **manchas de
colores**: cada una representa una comunidad originaria que habitaba esa
zona en ese período.

- **Avanzás el tiempo** en pasos predefinidos (momentos históricos, no años
  arbitrarios) y las manchas cambian: se ven migraciones, expansiones y
  transformaciones.
- **Tocás una mancha** y se abre un modal con imágenes e información sobre esa
  comunidad: tiempo de hábitat, modo de vida, resumen y fuentes.
- **Geolocalización**: se muestra tu ubicación sobre el mapa.

## Momentos históricos

1. ~12.000 AC — Primeros pobladores (cazadores-recolectores)
2. ~5.000 AC — Agricultura incipiente
3. ~1.000 AC — Sociedades aldeanas y cerámica
4. ~1.400 DC — Imperio Inca en el NOA / apogeo regional
5. 1.536 DC — Contacto europeo / colonia
6. ~1.850 DC — Estado nacional y Conquista del Desierto
7. Presente — Comunidades y territorios actuales

## Stack

- **Ionic 9 + Angular 22** (standalone, zoneless, señales)
- **Leaflet** + OpenStreetMap/Esri (mapa base, sin API key)
- **Tailwind CSS v4**
- **Capacitor** (para APK en fase posterior)
- Sin backend ni persistencia: el contenido está hardcodeado en `src/app/data/`

## Desarrollo

```bash
npm install
npm start        # dev server en http://localhost:8100
npm run build    # build de producción en www/
```

## Nota sobre precisión histórica

Las manchas de territorio son **aproximaciones** basadas en evidencia
arqueológica y etnohistórica. Cada comunidad cita sus fuentes. Esta app tiene
fines educativos y de divulgación.
