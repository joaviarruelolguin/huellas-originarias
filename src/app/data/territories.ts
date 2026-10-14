import type { Feature, MultiPolygon, Polygon } from 'geojson';
import { voronoiTerritories, type Seed } from '../utils/geo';

/**
 * Semillas por período: cada comunidad con el centro aproximado de su región.
 * El diagrama de Voronoi reparte el mapa entre estas semillas.
 */
const SEEDS: Record<string, Seed[]> = {
  // ---- Tiempo profundo: cazadores-recolectores (7 macro-regiones) ----
  '12000ac': [
    { id: 'caz-noa', center: [-67.5, -24.5] },
    { id: 'caz-cuyo', center: [-69.5, -33.5] },
    { id: 'caz-centro', center: [-65.0, -32.5] },
    { id: 'caz-nea', center: [-57.0, -28.0] },
    { id: 'caz-pampa', center: [-61.5, -37.5] },
    { id: 'caz-patagonia', center: [-69.0, -45.0] },
    { id: 'caz-fuego', center: [-67.5, -54.0] },
  ],
  '5000ac': [
    { id: 'caz-noa', center: [-67.5, -24.5] },
    { id: 'caz-cuyo', center: [-69.5, -33.5] },
    { id: 'caz-centro', center: [-65.0, -32.5] },
    { id: 'caz-nea', center: [-57.0, -28.0] },
    { id: 'caz-pampa', center: [-61.5, -37.5] },
    { id: 'caz-patagonia', center: [-69.0, -45.0] },
    { id: 'caz-fuego', center: [-67.5, -54.0] },
  ],
  // ---- ~1.000 AC: cazadores + culturas formativas del NOA ----
  '1000ac': [
    { id: 'caz-noa', center: [-67.5, -24.5] },
    { id: 'caz-cuyo', center: [-69.5, -33.5] },
    { id: 'caz-centro', center: [-65.0, -32.5] },
    { id: 'caz-nea', center: [-57.0, -28.0] },
    { id: 'caz-pampa', center: [-61.5, -37.5] },
    { id: 'caz-patagonia', center: [-69.0, -45.0] },
    { id: 'caz-fuego', center: [-67.5, -54.0] },
    { id: 'condorhuasi', center: [-65.5, -28.0] },
    { id: 'aguada', center: [-65.0, -29.0] },
    { id: 'cienaga', center: [-64.5, -30.0] },
    { id: 'santa-maria', center: [-64.5, -31.0] },
    { id: 'belen', center: [-65.0, -32.0] },
  ],
  // ---- Pueblos históricos y del presente (15 pueblos) ----
  '1400dc': [
    { id: 'kolla', center: [-65.5, -24.0] },
    { id: 'atacameno', center: [-68.0, -24.5] },
    { id: 'diaguita', center: [-65.5, -29.0] },
    { id: 'comechingon', center: [-65.0, -32.5] },
    { id: 'huarpe', center: [-69.5, -34.0] },
    { id: 'guarani', center: [-57.0, -28.5] },
    { id: 'qom', center: [-61.0, -25.5] },
    { id: 'wichi', center: [-63.0, -24.5] },
    { id: 'mocovi', center: [-61.0, -28.0] },
    { id: 'pilaga', center: [-57.5, -25.0] },
    { id: 'ranquel', center: [-65.5, -36.5] },
    { id: 'mapuche', center: [-68.0, -39.5] },
    { id: 'tehuelche', center: [-69.0, -45.0] },
    { id: 'selknam', center: [-67.5, -53.5] },
    { id: 'yamana', center: [-68.0, -55.0] },
  ],
  '1536dc': [
    { id: 'kolla', center: [-65.5, -24.0] },
    { id: 'atacameno', center: [-68.0, -24.5] },
    { id: 'diaguita', center: [-65.5, -29.0] },
    { id: 'comechingon', center: [-65.0, -32.5] },
    { id: 'huarpe', center: [-69.5, -34.0] },
    { id: 'guarani', center: [-57.0, -28.5] },
    { id: 'qom', center: [-61.0, -25.5] },
    { id: 'wichi', center: [-63.0, -24.5] },
    { id: 'mocovi', center: [-61.0, -28.0] },
    { id: 'pilaga', center: [-57.5, -25.0] },
    { id: 'ranquel', center: [-65.5, -36.5] },
    { id: 'mapuche', center: [-68.0, -39.5] },
    { id: 'tehuelche', center: [-69.0, -45.0] },
    { id: 'selknam', center: [-67.5, -53.5] },
    { id: 'yamana', center: [-68.0, -55.0] },
  ],
  '1850dc': [
    { id: 'kolla', center: [-65.5, -24.0] },
    { id: 'atacameno', center: [-68.0, -24.5] },
    { id: 'diaguita', center: [-65.5, -29.0] },
    { id: 'comechingon', center: [-65.0, -32.5] },
    { id: 'huarpe', center: [-69.5, -34.0] },
    { id: 'guarani', center: [-57.0, -28.5] },
    { id: 'qom', center: [-61.0, -25.5] },
    { id: 'wichi', center: [-63.0, -24.5] },
    { id: 'mocovi', center: [-61.0, -28.0] },
    { id: 'pilaga', center: [-57.5, -25.0] },
    { id: 'ranquel', center: [-65.5, -36.5] },
    { id: 'mapuche', center: [-68.0, -39.5] },
    { id: 'tehuelche', center: [-69.0, -45.0] },
    { id: 'selknam', center: [-67.5, -53.5] },
    { id: 'yamana', center: [-68.0, -55.0] },
  ],
  presente: [
    { id: 'kolla', center: [-65.5, -24.0] },
    { id: 'atacameno', center: [-68.0, -24.5] },
    { id: 'diaguita', center: [-65.5, -29.0] },
    { id: 'comechingon', center: [-65.0, -32.5] },
    { id: 'huarpe', center: [-69.5, -34.0] },
    { id: 'guarani', center: [-57.0, -28.5] },
    { id: 'qom', center: [-61.0, -25.5] },
    { id: 'wichi', center: [-63.0, -24.5] },
    { id: 'mocovi', center: [-61.0, -28.0] },
    { id: 'pilaga', center: [-57.5, -25.0] },
    { id: 'ranquel', center: [-65.5, -36.5] },
    { id: 'mapuche', center: [-68.0, -39.5] },
    { id: 'tehuelche', center: [-69.0, -45.0] },
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
