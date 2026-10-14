import type { Feature, MultiPolygon, Polygon } from 'geojson';
import { voronoiTerritories, type Seed } from '../utils/geo';

/**
 * Semillas por período: cada comunidad con el centro aproximado de su región.
 * El diagrama de Voronoi reparte el mapa entre estas semillas.
 * IMPORTANTE: las semillas CAMBIAN entre períodos para reflejar migraciones,
 * expansiones, reducciones y desnaturalizaciones históricas.
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
  // ---- ~1.400 DC: apogeo prehispánico / Inca en NOA ----
  '1400dc': [
    { id: 'kolla', center: [-65.5, -24.0] },        // Quebrada de Humahuaca (Inca)
    { id: 'atacameno', center: [-68.0, -24.5] },   // Puna de Atacama / Susques
    { id: 'diaguita', center: [-65.5, -29.0] },    // Valles Calchaquíes (pre-inca)
    { id: 'comechingon', center: [-65.0, -32.5] }, // Sierras de Córdoba/San Luis
    { id: 'huarpe', center: [-69.5, -34.0] },      // Cuyo / Guanacache
    { id: 'guarani', center: [-57.0, -28.5] },     // Selva paranaense (pre-misiones)
    { id: 'qom', center: [-61.0, -25.5] },         // Chaco oriental
    { id: 'wichi', center: [-63.0, -24.5] },       // Chaco occidental / Pilcomayo
    { id: 'mocovi', center: [-61.0, -28.0] },      // Chaco santafesino
    { id: 'pilaga', center: [-57.5, -25.0] },      // Pilcomayo medio
    { id: 'ranquel', center: [-65.5, -36.5] },     // Caldenar (origen mixto s.XVIII)
    { id: 'mapuche', center: [-70.5, -38.5] },     // Araucanía (Chile) - aún no expandidos
    { id: 'tehuelche', center: [-69.0, -45.0] },   // Estepa patagónica / costa
    { id: 'selknam', center: [-67.5, -53.5] },     // Isla Grande (interior)
    { id: 'yamana', center: [-68.0, -55.0] },      // Canales del Beagle
  ],
  // ---- 1.536 DC: Contacto europeo / Misiones jesuíticas ----
  '1536dc': [
    { id: 'kolla', center: [-65.5, -24.0] },        // Quebrada bajo encomienda/mita
    { id: 'atacameno', center: [-68.0, -24.5] },   // Caravaneros Puna
    { id: 'diaguita', center: [-65.5, -29.0] },    // Valles Calchaquíes (resistencia)
    { id: 'comechingon', center: [-65.0, -32.5] }, // Córdoba recién fundada (1573)
    { id: 'huarpe', center: [-69.5, -34.0] },      // Cuyo bajo encomienda chilena
    { id: 'guarani', center: [-55.5, -27.0] },     // Misiones jesuíticas (reducciones)
    { id: 'qom', center: [-61.0, -25.5] },         // Chaco oriental (ecuestres)
    { id: 'wichi', center: [-63.0, -24.5] },       // Pilcomayo/Bermejo
    { id: 'mocovi', center: [-61.0, -28.0] },      // Reducciones mocovíes (1743+)
    { id: 'pilaga', center: [-57.5, -25.0] },      // Pilcomayo (todavía autónomos)
    { id: 'ranquel', center: [-63.0, -34.0] },     // Ranqueles ecuestres (origen s.XVIII)
    { id: 'mapuche', center: [-68.5, -37.5] },     // Araucanización: ¡expandidos al este!
    { id: 'tehuelche', center: [-69.0, -45.0] },   // Tehuelches a caballo
    { id: 'selknam', center: [-67.5, -53.5] },     // Isla Grande (contacto incipiente)
    { id: 'yamana', center: [-68.0, -55.0] },      // Canales del Beagle
  ],
  // ---- 1.850 DC: Conquista del Desierto / Estado nacional ----
  '1850dc': [
    { id: 'kolla', center: [-65.5, -24.0] },        // Quebrada (campesinización)
    { id: 'atacameno', center: [-68.0, -24.5] },   // Puna (truequeros)
    { id: 'diaguita', center: [-65.5, -29.0] },    // Valles (campesinos)
    { id: 'comechingon', center: [-65.0, -32.5] }, // Sierras (invisibilizados)
    { id: 'huarpe', center: [-69.5, -34.0] },      // Guanacache (despoblamiento)
    { id: 'guarani', center: [-55.5, -27.0] },     // Misiones/Chaco (fragmentados)
    { id: 'qom', center: [-61.0, -25.5] },         // Chaco (Napalpí 1911)
    { id: 'wichi', center: [-63.0, -24.5] },       // Enganche en ingenios
    { id: 'mocovi', center: [-61.0, -28.0] },      // Chaco santafesino
    { id: 'pilaga', center: [-57.5, -25.0] },      // Rincón Bomba (1947)
    { id: 'ranquel', center: [-64.5, -35.5] },     // Conquista del Desierto: ¡contracción!
    { id: 'mapuche', center: [-68.0, -38.5] },     // Conquista del Desierto: ¡retroceso!
    { id: 'tehuelche', center: [-70.5, -47.5] },   // ¡Empujados al sur!
    { id: 'selknam', center: [-67.5, -53.5] },     // Genocidio: ¡territorio mínimo!
    { id: 'yamana', center: [-68.0, -55.0] },      // Colapso demográfico
  ],
  // ---- Presente: comunidades actuales ----
  presente: [
    { id: 'kolla', center: [-65.5, -24.0] },        // Jujuy/Salta (Quebrada)
    { id: 'atacameno', center: [-68.0, -24.5] },   // Susques (Jujuy)
    { id: 'diaguita', center: [-65.5, -29.0] },    // Quilmes, Tafí, Cachi
    { id: 'comechingon', center: [-65.0, -32.5] }, // Córdoba/San Luis
    { id: 'huarpe', center: [-69.5, -34.0] },      // Guanacache (Mendoza/San Juan/San Luis)
    { id: 'guarani', center: [-55.5, -27.0] },     // Misiones/Corrientes (tekoa)
    { id: 'qom', center: [-61.0, -25.5] },         // Chaco/Formosa
    { id: 'wichi', center: [-63.0, -24.5] },       // Chaco salteño/formoseño
    { id: 'mocovi', center: [-61.0, -28.0] },      // Chaco/Santa Fe
    { id: 'pilaga', center: [-57.5, -25.0] },      // Formosa (Pilcomayo)
    { id: 'ranquel', center: [-64.5, -35.5] },     // La Pampa/San Luis (municipio Ranquel)
    { id: 'mapuche', center: [-68.5, -38.5] },     // Neuquén/Río Negro/Chubut
    { id: 'tehuelche', center: [-70.5, -48.5] },   // Santa Cruz (Camusu Aike)
    { id: 'selknam', center: [-67.5, -53.5] },     // Río Grande (comunidad Rafaela Ishton)
    { id: 'yamana', center: [-68.0, -55.0] },      // Ushuaia (Paiakoala)
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