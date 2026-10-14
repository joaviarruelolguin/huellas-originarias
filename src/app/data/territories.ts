import type { Feature, MultiPolygon, Polygon } from 'geojson';
import { voronoiTerritories, type Seed } from '../utils/geo';

/**
 * Semillas por período: cada comunidad con el centro aproximado de su región.
 * El diagrama de Voronoi reparte el mapa entre estas semillas.
 * IMPORTANTE: las semillas CAMBIAN entre períodos para reflejar migraciones,
 * expansiones, reducciones y desnaturalizaciones históricas.
 *
 * Coordenadas revisadas según auditoría histórica (docs/territory-audit.md).
 */
const SEEDS: Record<string, Seed[]> = {
  // ---- Tiempo profundo: cazadores-recolectores (7 macro-regiones) ----
  '12000ac': [
    { id: 'caz-noa', center: [-67.4, -26.1] },
    { id: 'caz-cuyo', center: [-69.4, -31.6] },
    { id: 'caz-centro', center: [-60.5, -37.0] },
    { id: 'caz-nea', center: [-59.0, -29.0] },
    { id: 'caz-pampa', center: [-61.5, -37.5] },
    { id: 'caz-patagonia', center: [-69.0, -45.0] },
    { id: 'caz-fuego', center: [-67.5, -54.0] },
  ],
  '5000ac': [
    { id: 'caz-noa', center: [-67.4, -26.1] },
    { id: 'caz-cuyo', center: [-69.4, -31.6] },
    { id: 'caz-centro', center: [-60.5, -37.0] },
    { id: 'caz-nea', center: [-59.0, -29.0] },
    { id: 'caz-pampa', center: [-61.5, -37.5] },
    { id: 'caz-patagonia', center: [-69.0, -45.0] },
    { id: 'caz-fuego', center: [-67.5, -54.0] },
  ],
  // ---- ~1.000 AC: cazadores + culturas formativas del NOA ----
  '1000ac': [
    { id: 'caz-noa', center: [-67.4, -26.1] },
    { id: 'caz-cuyo', center: [-69.4, -31.6] },
    { id: 'caz-centro', center: [-60.5, -37.0] },
    { id: 'caz-nea', center: [-59.0, -29.0] },
    { id: 'caz-pampa', center: [-61.5, -37.5] },
    { id: 'caz-patagonia', center: [-69.0, -45.0] },
    { id: 'caz-fuego', center: [-67.5, -54.0] },
    { id: 'condorhuasi', center: [-67.0, -27.6] },
    { id: 'aguada', center: [-65.0, -29.0] },
    { id: 'cienaga', center: [-65.6, -26.8] },
    { id: 'santa-maria', center: [-66.0, -26.7] },
    { id: 'belen', center: [-67.0, -27.6] },
  ],
  // ---- ~1.400 DC: apogeo prehispánico / Inca en NOA ----
  '1400dc': [
    { id: 'kolla', center: [-65.4, -23.2] },
    { id: 'atacameno', center: [-66.4, -23.4] },
    { id: 'diaguita', center: [-66.0, -25.5] },
    { id: 'comechingon', center: [-65.0, -32.5] },
    { id: 'huarpe', center: [-67.4, -32.3] },
    { id: 'guarani', center: [-57.5, -28.0] },
    { id: 'qom', center: [-59.0, -26.5] },
    { id: 'wichi', center: [-62.5, -23.8] },
    { id: 'mocovi', center: [-60.5, -29.0] },
    { id: 'pilaga', center: [-60.5, -24.7] },
    { id: 'mapuche', center: [-70.5, -38.5] },
    { id: 'tehuelche', center: [-69.0, -45.0] },
    { id: 'selknam', center: [-67.5, -53.5] },
    { id: 'yamana', center: [-68.0, -55.0] },
  ],
  // ---- 1.536 DC: Contacto europeo / Misiones jesuíticas ----
  '1536dc': [
    { id: 'kolla', center: [-65.4, -23.2] },
    { id: 'atacameno', center: [-66.4, -23.4] },
    { id: 'diaguita', center: [-66.0, -25.5] },
    { id: 'comechingon', center: [-65.0, -32.5] },
    { id: 'huarpe', center: [-67.4, -32.3] },
    { id: 'guarani', center: [-55.5, -27.0] },
    { id: 'qom', center: [-59.0, -26.5] },
    { id: 'wichi', center: [-62.5, -23.8] },
    { id: 'mocovi', center: [-60.5, -29.0] },
    { id: 'pilaga', center: [-60.5, -24.7] },
    { id: 'mapuche', center: [-68.5, -37.5] },
    { id: 'tehuelche', center: [-69.0, -45.0] },
    { id: 'selknam', center: [-67.5, -53.5] },
    { id: 'yamana', center: [-68.0, -55.0] },
  ],
  // ---- 1.850 DC: Conquista del Desierto / Estado nacional ----
  '1850dc': [
    { id: 'kolla', center: [-65.4, -23.2] },
    { id: 'atacameno', center: [-66.4, -23.4] },
    { id: 'diaguita', center: [-66.0, -25.5] },
    { id: 'comechingon', center: [-65.0, -32.5] },
    { id: 'huarpe', center: [-67.4, -32.3] },
    { id: 'guarani', center: [-55.5, -27.0] },
    { id: 'qom', center: [-59.0, -26.5] },
    { id: 'wichi', center: [-62.5, -23.8] },
    { id: 'mocovi', center: [-60.5, -29.0] },
    { id: 'pilaga', center: [-60.5, -24.7] },
    { id: 'ranquel', center: [-64.5, -35.5] },
    { id: 'mapuche', center: [-68.0, -38.5] },
    { id: 'tehuelche', center: [-70.5, -47.5] },
    { id: 'selknam', center: [-67.5, -53.5] },
    { id: 'yamana', center: [-68.0, -55.0] },
  ],
  // ---- Presente: comunidades actuales ----
  presente: [
    { id: 'kolla', center: [-65.4, -23.2] },
    { id: 'atacameno', center: [-66.4, -23.4] },
    { id: 'diaguita', center: [-66.0, -25.5] },
    { id: 'comechingon', center: [-65.0, -32.5] },
    { id: 'huarpe', center: [-67.4, -32.3] },
    { id: 'guarani', center: [-55.5, -27.0] },
    { id: 'qom', center: [-59.0, -26.5] },
    { id: 'wichi', center: [-62.5, -23.8] },
    { id: 'mocovi', center: [-60.5, -29.0] },
    { id: 'pilaga', center: [-60.5, -24.7] },
    { id: 'ranquel', center: [-64.5, -35.5] },
    { id: 'mapuche', center: [-68.5, -38.5] },
    { id: 'tehuelche', center: [-70.5, -48.5] },
    { id: 'selknam', center: [-67.5, -53.5] },
    { id: 'yamana', center: [-68.0, -55.0] },
  ],
};

// Calcular y cachear los territorios Voronoi por período
const CACHE = new Map<string, Map<string, Feature<Polygon | MultiPolygon>>>();
for (const [period, seeds] of Object.entries(SEEDS)) {
  CACHE.set(period, voronoiTerritories(seeds));
}

/**
 * Devuelve el territorio (Voronoi recortado a Argentina) de una comunidad
 * en un período, o undefined si no existe.
 */
export function getTerritory(
  period: string,
  communityId: string
): Feature<Polygon | MultiPolygon> | undefined {
  return CACHE.get(period)?.get(communityId);
}
