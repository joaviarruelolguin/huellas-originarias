import type { Community } from '../models/models';
import type { Feature, Polygon } from 'geojson';

/** Construye un Feature de polígono a partir de un anillo de [lng, lat]. */
function poly(ring: number[][]): Feature<Polygon> {
  return {
    type: 'Feature',
    properties: {},
    geometry: { type: 'Polygon', coordinates: [ring] },
  };
}

/* ------------------------------------------------------------------
 * Territorios de ejemplo (placeholders burdos).
 * En la fase de contenido se reemplazarán por polígonos verificados
 * con fuentes arqueológicas y etnohistóricas.
 * ------------------------------------------------------------------ */

// Cazadores-recolectores del NEA (12.000–1.000 AC)
const NEA_CAZA: number[][] = [
  [-59.5, -26.0], [-56.5, -26.5], [-54.0, -27.0], [-53.5, -29.0],
  [-54.5, -31.0], [-56.5, -30.5], [-58.5, -31.0], [-60.0, -32.0],
  [-61.5, -31.5], [-60.5, -29.5], [-59.5, -28.0], [-59.5, -26.0],
];

// Guaraníes históricos (1.400–1.850 DC)
const NEA_GUARANI: number[][] = [
  [-59.0, -26.5], [-56.0, -27.0], [-54.0, -27.5], [-53.0, -29.5],
  [-54.0, -31.0], [-56.0, -30.5], [-58.0, -31.5], [-60.5, -32.5],
  [-61.5, -32.0], [-60.0, -30.0], [-59.0, -28.5], [-59.0, -26.5],
];

// Comunidades guaraníes actuales (presente, territorios reducidos)
const NEA_PRESENTE: number[][] = [
  [-55.5, -26.5], [-54.5, -26.5], [-54.5, -28.2], [-55.5, -28.2], [-55.5, -26.5],
];

// Cazadores-recolectores de Patagonia y Pampa (12.000–1.000 AC)
const PAT_CAZA: number[][] = [
  [-72.0, -40.0], [-68.0, -39.0], [-66.0, -42.0], [-65.0, -45.0],
  [-67.0, -48.0], [-70.0, -50.0], [-73.5, -50.0], [-73.5, -47.0],
  [-73.0, -44.0], [-72.0, -41.0], [-72.0, -40.0],
];

// Tehuelches históricos (1.400–1.850 DC)
const PAT_TEHUELCHE: number[][] = [
  [-72.5, -40.5], [-68.5, -39.5], [-65.5, -42.5], [-64.5, -45.5],
  [-66.5, -48.5], [-70.5, -50.5], [-73.5, -50.5], [-73.5, -46.5],
  [-72.5, -43.5], [-72.5, -40.5],
];

// Comunidades tehuelches actuales (presente, territorios reducidos)
const PAT_PRESENTE: number[][] = [
  [-70.5, -48.5], [-69.0, -48.5], [-69.0, -50.2], [-70.5, -50.2], [-70.5, -48.5],
];

/**
 * Dataset de ejemplo: 2 comunidades con continuidad en el tiempo.
 * Esto demuestra la mecánica; el contenido real se cargará después.
 */
export const COMMUNITIES: Community[] = [
  {
    id: 'guarani',
    name: 'Guaraní',
    color: '#4cc38a',
    lineage:
      'Cazadores-recolectores del NEA → guaraníes históricos → comunidades guaraníes actuales.',
    periods: {
      '12000ac': {
        territory: poly(NEA_CAZA),
        timeRange: 'Desde hace ~12.000 años',
        modeOfLife: 'Cazadores-recolectores de la selva y los ríos del NEA.',
        summary:
          'Los primeros pobladores del noreste vivían de la caza, la pesca y la recolección en la selva misionera y las costas de los ríos Paraná y Uruguay.',
        images: ['https://picsum.photos/seed/guaraninea1/800/500'],
        sources: ['Fuente por definir'],
      },
      '5000ac': {
        territory: poly(NEA_CAZA),
        timeRange: '~12.000 – 1.000 AC',
        modeOfLife: 'Cazadores-recolectores con horticultura incipiente.',
        summary:
          'Hacia el 5.000 AC aparecen las primeras huertas de maíz, mandioca y zapallo, sin dejar la caza y la pesca.',
        images: ['https://picsum.photos/seed/guaraninea2/800/500'],
        sources: ['Fuente por definir'],
      },
      '1000ac': {
        territory: poly(NEA_CAZA),
        timeRange: '~5.000 – 500 DC',
        modeOfLife: 'Aldeas con agricultura y cerámica.',
        summary:
          'Aldeas estables con cultivo intensivo, cerámica decorada y una densidad mayor de población en la selva y los valles fluviales.',
        images: ['https://picsum.photos/seed/guaraninea3/800/500'],
        sources: ['Fuente por definir'],
      },
      '1400dc': {
        territory: poly(NEA_GUARANI),
        timeRange: '~500 – 1.536 DC',
        modeOfLife: 'Agricultores guaraníes de aldeas numerosas.',
        summary:
          'Los guaraníes habitaban aldeas numerosas dedicadas a la agricultura de roza, complementada con caza, pesca y recolección. Conocían la metalurgia del cobre y mantenían amplias redes de intercambio.',
        images: ['https://picsum.photos/seed/guaranihist1/800/500'],
        sources: ['Fuente por definir'],
      },
      '1536dc': {
        territory: poly(NEA_GUARANI),
        timeRange: '1.400 – 1.800 DC',
        modeOfLife: 'Agricultores guaraníes en contacto con la colonia.',
        summary:
          'Con la llegada de los españoles, los guaraníes entran en contacto con las misiones jesuíticas y los encomenderos, transformando parte de su organización y territorio.',
        images: ['https://picsum.photos/seed/guaranihist2/800/500'],
        sources: ['Fuente por definir'],
      },
      '1850dc': {
        territory: poly(NEA_GUARANI),
        timeRange: '1.536 – presente',
        modeOfLife: 'Comunidades guaraníes en territorio fragmentado.',
        summary:
          'Tras la colonia y la formación de los estados, los guaraníes ven reducido y fragmentado su territorio, manteniendo su lengua y organización comunitaria.',
        images: ['https://picsum.photos/seed/guaranihist3/800/500'],
        sources: ['Fuente por definir'],
      },
      presente: {
        territory: poly(NEA_PRESENTE),
        timeRange: 'Siglo XXI',
        modeOfLife: 'Comunidades guaraníes (Mbya, Paĩ Tavyterã, etc.).',
        summary:
          'Hoy las comunidades guaraníes persisten en Misiones, Corrientes y provincias vecinas, reivindicando su territorio, su lengua y su cultura.',
        images: ['https://picsum.photos/seed/guaranipres1/800/500'],
        sources: ['Fuente por definir'],
      },
    },
  },
  {
    id: 'tehuelche',
    name: 'Tehuelche',
    color: '#5ea9dd',
    lineage:
      'Cazadores-recolectores de Patagonia y Pampa → tehuelches históricos → comunidades actuales.',
    periods: {
      '12000ac': {
        territory: poly(PAT_CAZA),
        timeRange: 'Desde hace ~11.000 años',
        modeOfLife: 'Cazadores-recolectores de la estepa y la costa patagónica.',
        summary:
          'Los primeros pobladores de Patagonia cazaban guanacos, ñandúes y megaterios, dejando rupestres en cuevas como la Cueva de las Manos.',
        images: ['https://picsum.photos/seed/patcaza1/800/500'],
        sources: ['Fuente por definir'],
      },
      '5000ac': {
        territory: poly(PAT_CAZA),
        timeRange: '~11.000 – 1.000 AC',
        modeOfLife: 'Cazadores-recolectores con boquicultura y arco.',
        summary:
          'Se consolida la caza del guanaco con arco y flecha, y se amplía el uso de materias primas de la costa y la cordillera.',
        images: ['https://picsum.photos/seed/patcaza2/800/500'],
        sources: ['Fuente por definir'],
      },
      '1000ac': {
        territory: poly(PAT_CAZA),
        timeRange: '~5.000 – 500 DC',
        modeOfLife: 'Cazadores-recolectores especializados.',
        summary:
          'Grupos móviles con territorios amplios, instrumentos de piedra pulida y una rica tradición de arte rupestre y mobiliar.',
        images: ['https://picsum.photos/seed/patcaza3/800/500'],
        sources: ['Fuente por definir'],
      },
      '1400dc': {
        territory: poly(PAT_TEHUELCHE),
        timeRange: '~500 – 1.536 DC',
        modeOfLife: 'Cazadores-recolectores a caballo incipiente.',
        summary:
          'Los tehuelches de la estepa y la costa mantienen una vida móvil basada en el guanaco, con amplios circuitos de recorrido estacional.',
        images: ['https://picsum.photos/seed/patehist1/800/500'],
        sources: ['Fuente por definir'],
      },
      '1536dc': {
        territory: poly(PAT_TEHUELCHE),
        timeRange: '1.400 – 1.800 DC',
        modeOfLife: 'Cazadores a caballo tras la llegada del caballo.',
        summary:
          'La difusión del caballo transforma la movilidad y la caza, y los tehuelches incorporan nuevos circuitos de intercambio con la cordillera.',
        images: ['https://picsum.photos/seed/patehist2/800/500'],
        sources: ['Fuente por definir'],
      },
      '1850dc': {
        territory: poly(PAT_TEHUELCHE),
        timeRange: '1.536 – 1880 DC',
        modeOfLife: 'Cazadores-recolectores en el siglo XIX.',
        summary:
          'Durante el siglo XIX los tehuelches enfrentan la expansión del Estado nacional y la Conquista del Desierto, que desplazan y diezman a la población.',
        images: ['https://picsum.photos/seed/patehist3/800/500'],
        sources: ['Fuente por definir'],
      },
      presente: {
        territory: poly(PAT_PRESENTE),
        timeRange: 'Siglo XX – XXI',
        modeOfLife: 'Comunidades tehuelches (Aónikenk, etc.).',
        summary:
          'Hoy las comunidades tehuelches persisten en el sur, especialmente en Santa Cruz, reivindicando su identidad y sus derechos territoriales.',
        images: ['https://picsum.photos/seed/patepres1/800/500'],
        sources: ['Fuente por definir'],
      },
    },
  },
];
