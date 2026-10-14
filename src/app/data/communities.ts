import type { Community, PeriodData } from '../models/models';
import { getTerritory } from './territories';

type PeriodContent = Omit<PeriodData, 'territory'>;

interface RawCommunity {
  id: string;
  name: string;
  color: string;
  lineage?: string;
  periods: Record<string, PeriodContent>;
}

const FUENTE_OK = ['El contenido está pendiente de verificación con fuentes académicas.'];

const RAW: RawCommunity[] = [
  // ============ TIEMPO PROFUNDO: cazadores-recolectores ============
  {
    id: 'caz-noa',
    name: 'Cazadores del NOA',
    color: '#e0a458',
    lineage: 'Pobladores tempranos del noroeste → culturas andinas.',
    periods: {
      '12000ac': {
        timeRange: 'Desde hace ~11.000 años', modeOfLife: 'Cazadores-recolectores de la Puna y las quebradas.',
        summary: 'Los primeros pobladores del NOA cazaban en la Puna y recolectaban en las quebradas altoandinas.',
        images: [], sources: FUENTE_OK,
      },
      '5000ac': {
        timeRange: '~11.000 – 1.000 AC', modeOfLife: 'Cazadores-recolectores con horticultura temprana.',
        summary: 'Aparecen las primeras plantas cultivadas en las quebradas, sin dejar la caza.',
        images: [], sources: FUENTE_OK,
      },
      '1000ac': {
        timeRange: '~5.000 – 500 DC', modeOfLife: 'Cazadores-recolectores de la Puna.',
        summary: 'Cazadores-recolectores de la Puna y las quebradas del NOA hacia el 1.000 AC.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'caz-cuyo',
    name: 'Cazadores de Cuyo',
    color: '#d4a373',
    periods: {
      '12000ac': {
        timeRange: 'Desde hace ~10.000 años', modeOfLife: 'Cazadores-recolectores de la montaña y el valle.',
        summary: 'Grupos que recorrían los valles cordilleranos de Mendoza, San Juan y San Luis.',
        images: [], sources: FUENTE_OK,
      },
      '5000ac': {
        timeRange: '~10.000 – 1.000 AC', modeOfLife: 'Cazadores-recolectores con cerámica incipiente.',
        summary: 'Poblaciones estacionales entre la montaña y el valle árido.',
        images: [], sources: FUENTE_OK,
      },
      '1000ac': {
        timeRange: '~5.000 – 500 DC', modeOfLife: 'Cazadores-recolectores de Cuyo.',
        summary: 'Cazadores-recolectores de los valles de Cuyo hacia el 1.000 AC.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'caz-centro',
    name: 'Cazadores del Centro',
    color: '#b08968',
    periods: {
      '12000ac': {
        timeRange: 'Desde hace ~11.000 años', modeOfLife: 'Cazadores-recolectores de las sierras y llanuras.',
        summary: 'Habitantes de las sierras de Córdoba y San Luis (ej. Inti Huasi), cazadores de la llanura.',
        images: [], sources: FUENTE_OK,
      },
      '5000ac': {
        timeRange: '~11.000 – 1.000 AC', modeOfLife: 'Cazadores-recolectores con cerámica.',
        summary: 'Aldeas tempranas en las sierras centrales con agricultura incipiente.',
        images: [], sources: FUENTE_OK,
      },
      '1000ac': {
        timeRange: '~5.000 – 500 DC', modeOfLife: 'Cazadores-recolectores del Centro.',
        summary: 'Cazadores-recolectores de las sierras de Córdoba y San Luis hacia el 1.000 AC.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'caz-nea',
    name: 'Cazadores del NEA',
    color: '#4cc38a',
    lineage: 'Pobladores del noreste → guaraníes.',
    periods: {
      '12000ac': {
        timeRange: 'Desde hace ~12.000 años', modeOfLife: 'Cazadores-recolectores de la selva y los ríos.',
        summary: 'Los primeros pobladores del noreste vivían de la caza, la pesca y la recolección en la selva misionera y las costas de los ríos.',
        images: [], sources: FUENTE_OK,
      },
      '5000ac': {
        timeRange: '~12.000 – 1.000 AC', modeOfLife: 'Cazadores-recolectores con horticultura incipiente.',
        summary: 'Horticultura temprana de maíz y mandioca junto a la caza y la pesca fluvial.',
        images: [], sources: FUENTE_OK,
      },
      '1000ac': {
        timeRange: '~5.000 – 500 DC', modeOfLife: 'Cazadores-recolectores del NEA.',
        summary: 'Cazadores-recolectores de la selva y los ríos del noreste hacia el 1.000 AC.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'caz-pampa',
    name: 'Cazadores de la Pampa',
    color: '#a78a6a',
    periods: {
      '12000ac': {
        timeRange: 'Desde hace ~11.000 años', modeOfLife: 'Cazadores-recolectores de la llanura.',
        summary: 'Cazadores de guanacos y ñandúes en la extensa llanura pampeana.',
        images: [], sources: FUENTE_OK,
      },
      '5000ac': {
        timeRange: '~11.000 – 1.000 AC', modeOfLife: 'Cazadores-recolectores especializados.',
        summary: 'Grupos móviles de la llanura con instrumentos de piedra pulida.',
        images: [], sources: FUENTE_OK,
      },
      '1000ac': {
        timeRange: '~5.000 – 500 DC', modeOfLife: 'Cazadores-recolectores de la Pampa.',
        summary: 'Cazadores-recolectores de la llanura pampeana hacia el 1.000 AC.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'caz-patagonia',
    name: 'Cazadores de Patagonia',
    color: '#5ea9dd',
    lineage: 'Pobladores de Patagonia → tehuelches.',
    periods: {
      '12000ac': {
        timeRange: 'Desde hace ~11.000 años', modeOfLife: 'Cazadores-recolectores de la estepa y la costa.',
        summary: 'Cazadores de guanaco en la estepa y la costa patagónica, con arte rupestre como la Cueva de las Manos.',
        images: [], sources: FUENTE_OK,
      },
      '5000ac': {
        timeRange: '~11.000 – 1.000 AC', modeOfLife: 'Cazadores-recolectores con arco y flecha.',
        summary: 'Consolidación de la caza del guanaco y ampliación de los circuitos de recorrido.',
        images: [], sources: FUENTE_OK,
      },
      '1000ac': {
        timeRange: '~5.000 – 500 DC', modeOfLife: 'Cazadores-recolectores de Patagonia.',
        summary: 'Cazadores-recolectores de la estepa y la costa hacia el 1.000 AC.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'caz-fuego',
    name: 'Cazadores de Tierra del Fuego',
    color: '#7fb3d5',
    periods: {
      '12000ac': {
        timeRange: 'Desde hace ~10.000 años', modeOfLife: 'Cazadores-recolectores del extremo sur.',
        summary: 'Los primeros pobladores del archipiélago fueguino cazaban y recolectaban en el bosque y el mar.',
        images: [], sources: FUENTE_OK,
      },
      '5000ac': {
        timeRange: '~10.000 – 1.000 AC', modeOfLife: 'Cazadores-recolectores canoeros.',
        summary: 'Grupos adaptados al frío, con recolección marítima y caza terrestre.',
        images: [], sources: FUENTE_OK,
      },
      '1000ac': {
        timeRange: '~5.000 – 500 DC', modeOfLife: 'Cazadores-recolectores de Tierra del Fuego.',
        summary: 'Cazadores-recolectores del extremo sur hacia el 1.000 AC.',
        images: [], sources: FUENTE_OK,
      },
    },
  },

  // ============ ~1.000 AC: culturas formativas del NOA ============
  {
    id: 'condorhuasi',
    name: 'Cultura Condorhuasi',
    color: '#b45309',
    periods: {
      '1000ac': {
        timeRange: '~1.000 AC', modeOfLife: 'Aldeanos con cerámica y metalurgia del cobre.',
        summary: 'Una de las culturas formativas más antiguas del NOA, con cerámica negra y trabajo del cobre.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'aguada',
    name: 'Cultura Aguada',
    color: '#0d9488',
    periods: {
      '1000ac': {
        timeRange: '~1.000 AC', modeOfLife: 'Aldeanos agricultores con cerámica decorada.',
        summary: 'Cultura del valle de Catamarca conocida por su cerámica con motivos de serpiente y felino.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'cienaga',
    name: 'Cultura Ciénaga',
    color: '#7c3aed',
    periods: {
      '1000ac': {
        timeRange: '~1.000 AC', modeOfLife: 'Aldeanos agricultores de los valles.',
        summary: 'Cultura de los valles de Catamarca y La Rioja con agricultura intensiva y cerámica tricolor.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'santa-maria',
    name: 'Cultura Santa María',
    color: '#dc2626',
    periods: {
      '1000ac': {
        timeRange: '~1.000 AC', modeOfLife: 'Aldeanos agricultores del valle.',
        summary: 'Cultura del valle de Santa María (Catamarca) con agricultura de riego y cerámica en negro, blanco y rojo.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'belen',
    name: 'Cultura Belén',
    color: '#ca8a04',
    periods: {
      '1000ac': {
        timeRange: '~1.000 AC', modeOfLife: 'Aldeanos agricultores con metalurgia.',
        summary: 'Cultura de la región de Belén (Catamarca) con incipientes en metalurgia y cerámica gris.',
        images: [], sources: FUENTE_OK,
      },
    },
  },

  // ============ Pueblos históricos y del presente ============
  {
    id: 'kolla',
    name: 'Kolla / Quechua',
    color: '#ef4444',
    lineage: 'Pueblos andinos → incaicos → comunidades kollas actuales.',
    periods: {
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: 'Agricultores de la quebrada, bajo el Imperio Inca.',
        summary: 'Habitantes de la Quebrada de Humahuaca, incorporados al Collasuyo (Imperio Inca) con agricultura de terrazas.',
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: 'Agricultores kollas en la colonia.',
        summary: 'Los kollas mantienen sus quebradas y terrazas bajo la dominación colonial y la mita.',
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – presente', modeOfLife: 'Comunidades kollas del norte.',
        summary: 'Comunidades kollas/quechuas de Jujuy y Salta que persisten hasta hoy.',
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XXI', modeOfLife: 'Comunidades kollas/quechuas.',
        summary: 'Hoy las comunidades kollas habitan Jujuy y Salta, con agricultura de terrazas y pastoreo.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'atacameno',
    name: 'Atacameño',
    color: '#a855f7',
    periods: {
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: 'Agricultores de la Puna bajo el Imperio Inca.',
        summary: 'Habitantes de la Puna de Atacama, con agricultura de terrazas y caravanas de llama.',
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: 'Agricultores de la Puna en la colonia.',
        summary: 'Los atacameños mantienen sus oasis y rutas de caravanas bajo la colonia.',
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – presente', modeOfLife: 'Comunidades atacameñas.',
        summary: 'Comunidades atacameñas de la Puna (Jujuy, Salta, Catamarca).',
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XXI', modeOfLife: 'Comunidades atacameñas.',
        summary: 'Hoy persisten comunidades atacameñas en la Puna, con agricultura y turismo.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'diaguita',
    name: 'Diaguita',
    color: '#f97316',
    periods: {
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: 'Agricultores de los valles, algunos bajo el Imperio Inca.',
        summary: 'Pueblos de los valles calchaquíes y el valle de Abaucán, con agricultura y resistencia a la conquista inca y española.',
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: 'Diaguitas en la colonia y las guerras calchaquíes.',
        summary: 'Los diaguitas protagonizan largas resistencias (guerras calchaquíes) contra la corona española.',
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – presente', modeOfLife: 'Comunidades diaguitas.',
        summary: 'Comunidades diaguitas de Catamarca, La Rioja, Tucumán y Salta.',
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XXI', modeOfLife: 'Comunidades diaguitas.',
        summary: 'Hoy las comunidades diaguitas se reconocen y reivindican su identidad en los valles y la puna.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'comechingon',
    name: 'Comechingón',
    color: '#0ea5e9',
    periods: {
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: 'Agricultores de las sierras de Córdoba y San Luis.',
        summary: 'Pueblos de las sierras comechingonas con agricultura, caza y una rica cerámica.',
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: 'Comechingones en la colonia.',
        summary: 'Los comechingones enfrentan la conquista y la colonización de las sierras.',
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – presente', modeOfLife: 'Comunidades comechingonas.',
        summary: 'Comunidades comechingonas de Córdoba y San Luis.',
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XXI', modeOfLife: 'Comunidades comechingonas.',
        summary: 'Hoy se reconocen comunidades comechingonas en Córdoba y San Luis.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'huarpe',
    name: 'Huarpe',
    color: '#84cc16',
    periods: {
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: 'Agricultores de Cuyo bajo el Imperio Inca.',
        summary: 'Pueblos de Cuyo (Mendoza, San Juan, San Luis) con agricultura de riego y bajo dominio inca.',
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: 'Huarpes en la colonia.',
        summary: 'Los huarpes mantienen sus oasis bajo la dominación colonial.',
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – presente', modeOfLife: 'Comunidades huarpes.',
        summary: 'Comunidades huarpes de Mendoza, San Juan y San Luis.',
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XXI', modeOfLife: 'Comunidades huarpes.',
        summary: 'Hoy se reconocen comunidades huarpes en Cuyo.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'guarani',
    name: 'Guaraní',
    color: '#4cc38a',
    lineage: 'Cazadores del NEA → guaraníes históricos → comunidades actuales.',
    periods: {
      '1000ac': {
        timeRange: '~5.000 – 500 DC', modeOfLife: 'Aldeas con agricultura y cerámica.',
        summary: 'Aldeas estables con cultivo intensivo, cerámica decorada y redes de intercambio.',
        images: [], sources: FUENTE_OK,
      },
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: 'Agricultores guaraníes de aldeas numerosas.',
        summary: 'Aldeas numerosas dedicadas a la agricultura de roza, la caza y la pesca, con metalurgia del cobre.',
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: 'Guaraníes en contacto con la colonia.',
        summary: 'Contacto con misiones jesuíticas y encomenderos, transformando parte de su organización.',
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – presente', modeOfLife: 'Comunidades guaraníes en territorio fragmentado.',
        summary: 'Tras la colonia y los estados, los guaraníes ven fragmentado su territorio.',
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XXI', modeOfLife: 'Comunidades guaraníes (Mbya, Paĩ Tavyterã, etc.).',
        summary: 'Hoy las comunidades guaraníes persisten en Misiones, Corrientes y provincias vecinas.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'qom',
    name: 'Qom / Toba',
    color: '#f59e0b',
    periods: {
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: 'Cazadores-recolectores y pescadores del Chaco.',
        summary: 'Pueblos del Chaco oriental con caza, pesca y recolección, y cerámica.',
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: 'Qom en la colonia.',
        summary: 'Los qom/tobas mantienen su movilidad bajo la colonia.',
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – presente', modeOfLife: 'Comunidades qom.',
        summary: 'Comunidades qom de Chaco y Formosa.',
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XXI', modeOfLife: 'Comunidades qom.',
        summary: 'Hoy los qom son uno de los pueblos más numerosos del Chaco, en Chaco y Formosa.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'wichi',
    name: 'Wichí',
    color: '#8b5cf6',
    periods: {
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: 'Cazadores-recolectores del Chaco y la Puna.',
        summary: 'Pueblos wichí con caza, recolección del algarrobo y pesca.',
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: 'Wichí en la colonia.',
        summary: 'Los wichí mantienen sus territorios bajo la colonia.',
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – presente', modeOfLife: 'Comunidades wichí.',
        summary: 'Comunidades wichí de Salta, Formosa y Chaco.',
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XXI', modeOfLife: 'Comunidades wichí.',
        summary: 'Hoy los wichí habitan el Chaco salteño y formoseño, con recolección de algarrobo.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'mocovi',
    name: 'Mocoví',
    color: '#ec4899',
    periods: {
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: 'Cazadores-recolectores del Chaco y el Espinal.',
        summary: 'Pueblos del Chaco santafesino con caza y recolección.',
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: 'Mocovíes en la colonia.',
        summary: 'Los mocovíes enfrentan la colonización del Chaco.',
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – presente', modeOfLife: 'Comunidades mocovíes.',
        summary: 'Comunidades mocovíes de Chaco y Santa Fe.',
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XXI', modeOfLife: 'Comunidades mocovíes.',
        summary: 'Hoy los mocovíes habitan Chaco y Santa Fe.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'pilaga',
    name: 'Pilagá',
    color: '#14b8a6',
    periods: {
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: 'Cazadores-recolectores del Chaco occidental.',
        summary: 'Pueblos del río Pilcomayo con caza y pesca.',
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: 'Pilagás en la colonia.',
        summary: 'Los pilagás mantienen su territorio bajo la colonia.',
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – presente', modeOfLife: 'Comunidades pilagás.',
        summary: 'Comunidades pilagás de Formosa.',
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XXI', modeOfLife: 'Comunidades pilagás.',
        summary: 'Hoy los pilagás habitan la ribera del río Pilcomayo, en Formosa.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'ranquel',
    name: 'Ranquel',
    color: '#6366f1',
    periods: {
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: 'Cazadores-recolectores de la Pampa y Cuyo.',
        summary: 'Pueblos de la Pampa y el Cuyo con caza y movilidad estacional.',
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: 'Ranqueles a caballo.',
        summary: 'Con el caballo, los ranqueles amplían su movilidad por la Pampa.',
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – presente', modeOfLife: 'Comunidades ranqueles.',
        summary: 'Comunidades ranqueles de La Pampa, San Luis y Córdoba.',
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XXI', modeOfLife: 'Comunidades ranqueles.',
        summary: 'Hoy se reconocen comunidades ranqueles en La Pampa y San Luis.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'mapuche',
    name: 'Mapuche',
    color: '#e11d48',
    periods: {
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: 'Agricultores y guerreros de la Araucanía.',
        summary: 'Pueblos mapuche de la cordillera, con agricultura, ganadería y fuerte organización militar.',
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: 'Mapuches independientes de facto.',
        summary: 'Los mapuches mantienen su independencia tras la caída del Imperio Inca, con la frontera en el Neuquén.',
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – 1880 DC', modeOfLife: 'Mapuches ante la Conquista del Desierto.',
        summary: 'Hacia 1880, el Estado nacional conquista la Araucanía, desplazando a los mapuches al otro lado de la cordillera.',
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XX – XXI', modeOfLife: 'Comunidades mapuches.',
        summary: 'Hoy las comunidades mapuches habitan Neuquén, Río Negro y Chubut, con migración a las ciudades.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'tehuelche',
    name: 'Tehuelche',
    color: '#5ea9dd',
    lineage: 'Cazadores de Patagonia → tehuelches históricos → comunidades actuales.',
    periods: {
      '1000ac': {
        timeRange: '~5.000 – 500 DC', modeOfLife: 'Cazadores-recolectores especializados.',
        summary: 'Grupos móviles de la estepa con arte rupestre y caza del guanaco.',
        images: [], sources: FUENTE_OK,
      },
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: 'Cazadores de la estepa y la costa.',
        summary: 'Tehuelches de la estepa y la costa con amplios circuitos estacionales.',
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: 'Tehuelches a caballo.',
        summary: 'El caballo transforma la movilidad y la caza de los tehuelches.',
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – 1880 DC', modeOfLife: 'Tehuelches ante la Conquista del Desierto.',
        summary: 'El siglo XIX trae la Conquista del Desierto, que desplaza y diezman a la población tehuelche.',
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XX – XXI', modeOfLife: 'Comunidades tehuelches (aónikenk).',
        summary: 'Hoy las comunidades tehuelches persisten en el sur, especialmente en Santa Cruz.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'selknam',
    name: "Selk'nam (Ona)",
    color: '#06b6d4',
    periods: {
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: "Cazadores-recolectores del bosque fueguino.",
        summary: "Pueblo selk'nam de la isla grande, cazadores de guanaco y aves.",
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: "Selk'nam en la colonia.",
        summary: "Los selk'nam enfrentan la colonización y la epidemia de enfermedades.",
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – 1900 DC', modeOfLife: "Selk'nam ante el genocidio.",
        summary: "A fines del siglo XIX, la colonización y los estancieros diezman brutalmente a la población selk'nam.",
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XX – XXI', modeOfLife: "Comunidades selk'nam.",
        summary: "Hoy descendientes selk'nam reconstituyen su identidad y cultura en Tierra del Fuego.",
        images: [], sources: FUENTE_OK,
      },
    },
  },
  {
    id: 'yamana',
    name: 'Yámana',
    color: '#d946ef',
    periods: {
      '1400dc': {
        timeRange: '~500 – 1.536 DC', modeOfLife: 'Cazadores-recolectores canoeros del canal Beagle.',
        summary: 'Pueblo yámana que navegaba los canales fueguinos en canoas de corteza.',
        images: [], sources: FUENTE_OK,
      },
      '1536dc': {
        timeRange: '1.400 – 1.800 DC', modeOfLife: 'Yámanas en la colonia.',
        summary: 'Los yámanas mantienen su vida canoera bajo la colonia.',
        images: [], sources: FUENTE_OK,
      },
      '1850dc': {
        timeRange: '1.536 – 1900 DC', modeOfLife: 'Yámanas ante el contacto.',
        summary: 'El contacto con misioneros y enfermedades reduce drásticamente a la población yámana.',
        images: [], sources: FUENTE_OK,
      },
      presente: {
        timeRange: 'Siglo XX – XXI', modeOfLife: 'Comunidad yámana (Yagán).',
        summary: 'Hoy la comunidad yámana mantiene viva su cultura en Ushuaia.',
        images: [], sources: FUENTE_OK,
      },
    },
  },
];

export const COMMUNITIES: Community[] = RAW.map((c) => ({
  id: c.id,
  name: c.name,
  color: c.color,
  lineage: c.lineage,
  periods: Object.fromEntries(
    Object.entries(c.periods).flatMap(([periodId, data]) => {
      const territory = getTerritory(periodId, c.id);
      return territory
        ? [[periodId, { ...data, territory }] as [string, PeriodData]]
        : [];
    })
  ),
}));
