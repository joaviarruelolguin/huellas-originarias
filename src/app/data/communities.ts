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

const RAW: RawCommunity[] = [
  // ============ TIEMPO PROFUNDO: cazadores-recolectores ============
  {
    id: 'caz-noa',
    name: 'Cazadores del NOA',
    color: '#e0a458',
    lineage: 'Pobladores tempranos del noroeste → culturas andinas.',
    periods: {
      '12000ac': {
        timeRange: 'Hace ~11.000-8.000 años',
        modeOfLife: 'Cazadores-recolectores móviles de Puna y quebradas, en grupos de 30-50 personas.',
        summary: 'Puntas "cola de pescado" (~11.000-10.000 años AP) en la Puna meridional: caza de guanaco y vicuña con propulsor, recolección con morteros.',
        images: [],
        sources: ['González, A.R. y Pérez, J.A.: Argentina Indígena. Vísperas de la Conquista (Paidós, 2000)', 'Rivero, D. et al. (CONICET-UNC): Puna meridional'],
      },
      '5000ac': {
        timeRange: '~8.000-3.000 AC',
        modeOfLife: 'Cazadores-recolectores (tradición Ayampitín, ~6000 AC). Aún sin agricultura.',
        summary: 'Puntas lanceoladas Ayampitín para el guanaco y campamentos estacionales. La agricultura llegará recién en el Formativo (~500 AC).',
        images: [],
        sources: ['González, A.R. y Pérez, J.A.: Argentina Indígena (Paidós, 2000)', 'UNLP-LATYR: fechados Alpa Corral / Intihuasi (Museo de La Plata)'],
      },
      '1000ac': {
        timeRange: '~3.000 AC-500 DC',
        modeOfLife: 'Cazadores-recolectores tardíos de Puna y quebradas.',
        summary: 'Puntas triangulares pequeñas (Ongamira/Alpa Corral); antesala de las culturas formativas del NOA.',
        images: [],
        sources: ['González, A.R. y Pérez, J.A.: Argentina Indígena (Paidós, 2000)'],
      },
    },
  },
  {
    id: 'caz-cuyo',
    name: 'Cazadores de Cuyo',
    color: '#0891b2',
    periods: {
      '12000ac': {
        timeRange: 'Hace ~11.000-10.000 años',
        modeOfLife: 'Cazadores-recolectores de precordillera y valles.',
        summary: 'Gruta del Indio (San Rafael, Mendoza): caza de megafauna (milodón, caballo americano) y guanaco entre la montaña y el valle.',
        images: [],
        sources: ['González, A.R. y Pérez, J.A.: Argentina Indígena (Paidós, 2000)'],
      },
      '5000ac': {
        timeRange: '~10.000-3.000 AC',
        modeOfLife: 'Cazadores-recolectores estacionales entre montaña y valle árido.',
        summary: 'Poblaciones móviles de Mendoza, San Juan y San Luis, con campamentos de caza y recolección.',
        images: [],
        sources: ['González, A.R. y Pérez, J.A.: Argentina Indígena (Paidós, 2000)'],
      },
      '1000ac': {
        timeRange: '~3.000 AC-500 DC',
        modeOfLife: 'Cazadores-recolectores tardíos de Cuyo.',
        summary: 'Bandas de los valles cuyanos en transición hacia la horticultura que dará origen a los huarpes.',
        images: [],
        sources: ['García, A. (UNCuyo): agricultura huarpe y conquista'],
      },
    },
  },
  {
    id: 'caz-centro',
    name: 'Cazadores del Centro',
    color: '#dc2626',
    periods: {
      '12000ac': {
        timeRange: 'Hace ~11.000-8.000 años',
        modeOfLife: 'Cazadores-recolectores de sierras y llanura.',
        summary: 'Gruta Inti Huasi (San Luis), excavada por Alberto Rex González: puntas cola de pescado y caza de guanaco en las Sierras Centrales.',
        images: [],
        sources: ['González, A.R.: La estratigrafía de la gruta de Intihuasi (1960)', 'Rivero, D. y Heider, G. (CONICET/UNC)'],
      },
      '5000ac': {
        timeRange: '~8.000-3.000 AC',
        modeOfLife: 'Cazadores-recolectores (Ayampitín, Ongamira) con intercambio a larga distancia.',
        summary: 'Ongamira y Pampa de Olaen: caza de guanaco, obsidiana y moluscos de intercambio ya en 6000 AP.',
        images: [],
        sources: ['Laguens, A. et al.: Intersecciones en Antropología 8 (2007)', 'Bonnin, M. y Laguens, A. (UNC/CONICET)'],
      },
      '1000ac': {
        timeRange: '~3.000 AC-500 DC',
        modeOfLife: 'Cazadores-recolectores tardíos de las sierras.',
        summary: 'Horticultura incipiente en las sierras de Córdoba y San Luis: origen de los comechingones (~1500 AP).',
        images: [],
        sources: ['Palladino, L. (UNC): Los comechingones en Córdoba (2021)'],
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
        timeRange: 'Hace ~10.000-8.000 años (estimado)',
        modeOfLife: 'Cazadores-recolectores de selva y ríos. Registro escaso y fragmentario.',
        summary: 'El NEA casi no tiene sitios pleistocénicos por la mala preservación en selva y llanura aluvial. Poblamiento probable por los corredores Paraná-Uruguay.',
        images: [],
        sources: ['Politis, G. et al. (CONICET-UNLP)', 'Ceruti, C. (CONICET) / Acosta, A.: arqueología de la cuenca del Plata'],
      },
      '5000ac': {
        timeRange: '~8.000-2.000 AP',
        modeOfLife: 'Cazadores-recolectores móviles (tradición Umbu).',
        summary: 'Tradición Umbu en Misiones y Corrientes: puntas bifaciales, caza menor, pesca y recolección vegetal.',
        images: [],
        sources: ['Politis, G. et al. (CONICET-UNLP)'],
      },
      '1000ac': {
        timeRange: '~2.000-500 AP',
        modeOfLife: 'Pescadores-cazadores canoeros del Paraná.',
        summary: 'Entidad Goya-Malabrigo: montículos, cerámica y pesca intensiva. Luego la expansión tupí-guaraní (~1000 DC) desplaza o asimila a estos grupos.',
        images: [],
        sources: ['Politis, G. et al.: "La entidad arqueológica Goya-Malabrigo" (2023)'],
      },
    },
  },
  {
    id: 'caz-pampa',
    name: 'Cazadores de la Pampa',
    color: '#7c3aed',
    periods: {
      '12000ac': {
        timeRange: 'Hace ~11.000-8.000 años',
        modeOfLife: 'Cazadores-recolectores de la llanura.',
        summary: 'Cerro La China, Lobería y Arroyo Seco (Buenos Aires): caza de guanaco, ñandú y megafauna, con canteras de cuarcita de Tandilia.',
        images: [],
        sources: ['González, A.R. y Pérez, J.A.: Argentina Indígena (Paidós, 2000)'],
      },
      '5000ac': {
        timeRange: '~8.000-3.000 AC',
        modeOfLife: 'Cazadores-recolectores especializados de la llanura.',
        summary: 'Grupos móviles pampeanos con instrumentos de piedra pulida y circuitos estacionales.',
        images: [],
        sources: ['González, A.R. y Pérez, J.A.: Argentina Indígena (Paidós, 2000)'],
      },
      '1000ac': {
        timeRange: '~3.000 AC-500 DC',
        modeOfLife: 'Cazadores-recolectores tardíos pampeanos.',
        summary: 'Bandas de la llanura en contacto con tradiciones andinas y chaqueñas hacia el primer milenio.',
        images: [],
        sources: ['Martínez Sarasola, C.: Nuestros paisanos los indios (Emecé)'],
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
        timeRange: 'Hace ~12.600-10.000 años',
        modeOfLife: 'Cazadores-recolectores de estepa y costa, conviviendo con megafauna.',
        summary: 'Los Toldos (Santa Cruz, nivel 11 ~12.600 AP, Cardich): caza de milodón, caballo americano e Hippidion junto al guanaco.',
        images: [],
        sources: ['Cardich, A.: Arqueología de Los Toldos y El Ceibo (Estudios Atacameños Nº8)', 'Gradin, C. y Aschero, C. (UBA-CONICET): Cueva de las Manos'],
      },
      '5000ac': {
        timeRange: '~10.000-3.000 AC',
        modeOfLife: 'Cazadores-recolectores con arco y arte rupestre.',
        summary: 'Cueva de las Manos (Río Pinturas, Patrimonio UNESCO 1999): 13.000-9.500 años de pintura, manos en negativo y caza de guanaco.',
        images: [],
        sources: ['Gradin, C. y Aschero, C. (UBA-CONICET)', 'UNESCO WHC 936: Cueva de las Manos'],
      },
      '1000ac': {
        timeRange: '~3.000 AC-500 DC',
        modeOfLife: 'Cazadores-recolectores especializados de la estepa.',
        summary: 'Bandas del Macizo del Deseado con boleadora temprana y circuitos costa-cordillera: ancestros de los tehuelches.',
        images: [],
        sources: ['Aguerre, A.M. (UBA-CONICET): Cazadores patagónicos'],
      },
    },
  },
  {
    id: 'caz-fuego',
    name: 'Cazadores de Tierra del Fuego',
    color: '#7fb3d5',
    periods: {
      '12000ac': {
        timeRange: 'Hace ~11.880-10.280 años',
        modeOfLife: 'Cazadores-recolectores llegados a pie al "fin del mundo".',
        summary: 'Tres Arroyos 1 (Sierra Carmen Sylva): fogones paleoindios y caza de guanaco y zorro extinto, cuando un puente terrestre unía la isla al continente.',
        images: [],
        sources: ['Massone, M.: Tres Arroyos 1; El poblamiento temprano de Tierra del Fuego (Intersecciones en Antropología)', 'Borrero, L.A., Salemme, M. y Piana, E.: sinopsis arqueológica fueguina (CONICET)'],
      },
      '5000ac': {
        timeRange: '~8.000-6.500 AP',
        modeOfLife: 'Del pedestrianismo a la canoa: nace la adaptación marítima.',
        summary: 'La subida del mar aísla la isla (~8.000 AP): en el norte siguen los pedestres (ancestros selk\'nam); en el Beagle surge la vida canoera (Imiwaia, Túnel: ancestros yaganes).',
        images: [],
        sources: ['Orquera, L. y Piana, E. (CADIC-CONICET): Arqueología del canal Beagle'],
      },
      '1000ac': {
        timeRange: '~6.500 AP-500 DC',
        modeOfLife: 'Pedestres del norte y canoeros del sur ya diferenciados.',
        summary: 'Dos tradiciones consolidadas: cazadores terrestres del interior y navegantes de los canales australes.',
        images: [],
        sources: ['Orquera, L. y Piana, E. (CADIC-CONICET)'],
      },
    },
  },

  // ============ ~1.000 AC - 900 DC: culturas formativas y medias del NOA ============
  {
    id: 'condorhuasi',
    name: 'Cultura Condorhuasi',
    color: '#b45309',
    periods: {
      '1000ac': {
        timeRange: '~400 AC-700 DC',
        modeOfLife: 'Aldeanos pastores de llamas con jefaturas, artesanos y centros ceremoniales.',
        summary: 'Valle de Hualfín (Catamarca): cerámica polícroma y modelada (vasos efigie), lítico ritual ("suplicantes"), pipas de alucinógenos y hornos huayras de cobre a 1200°C. Fases Diablos, Barrancas y Alumbrera-Alamito.',
        images: [],
        sources: ['Núñez Regueiro, V. y Tartusi, M. (UNSa/CONICET): Campo del Pucará-Alamito', 'Museo de La Plata, sala Arqueología del NOA'],
      },
    },
  },
  {
    id: 'aguada',
    name: 'Cultura Aguada',
    color: '#0d9488',
    periods: {
      '1000ac': {
        timeRange: '~650-900 DC',
        modeOfLife: 'Agroalfareros intensivos con riego, élites y centros ceremoniales.',
        summary: 'Catamarca (Hualfín, Ambato, La Tunita): la cerámica de mayor nivel técnico-artístico del NOA. Iconografía del complejo felínico: jaguar, sacrificador con hacha y cabezas-trofeo. Bronce a la cera perdida y oro.',
        images: [],
        sources: ['González, A.R.: Cultura La Aguada. Arqueología y diseños (1977, 1998)', 'Museo de La Plata: centros ceremoniales Aguada'],
      },
    },
  },
  {
    id: 'cienaga',
    name: 'Cultura Ciénaga',
    color: '#7c3aed',
    periods: {
      '1000ac': {
        timeRange: '~150-650 DC',
        modeOfLife: 'Aldeas dispersas de agricultores de riego con trabajo comunitario.',
        summary: 'Orillas del río Hualfín (Belén, Catamarca): cerámica gris-negruzca incisa con motivos geométricos (no tricolor), urnas funerarias para párvulos y, al final, introducción del bronce.',
        images: [],
        sources: ['González, A.R. y Pérez, J.A.: Argentina Indígena (2000)', 'Sondereguer, C. y Punta, C.: Amerindia (Corregidor, 1999)'],
      },
    },
  },
  {
    id: 'santa-maria',
    name: 'Cultura Santa María',
    color: '#dc2626',
    periods: {
      '1000ac': {
        timeRange: '~1000-1536 DC',
        modeOfLife: 'Agricultores intensivos de montaña con jefaturas hereditarias.',
        summary: 'Valles Yocavil/Santa María y Calchaquí: urnas funerarias y cerámica negro sobre rojo, negro sobre crema y tricolor. Represas, andenes y poblados de más de 1000 habitantes (Quilmes, Fuerte Quemado). Lengua kakán: mundo diaguita tardío.',
        images: [],
        sources: ['Nastri, J. y Palamarczuk, V. et al. (CONICET)', 'Museo de La Plata: Santa María y Belén'],
      },
    },
  },
  {
    id: 'belen',
    name: 'Cultura Belén',
    color: '#ca8a04',
    periods: {
      '1000ac': {
        timeRange: '~1100-1535 DC',
        modeOfLife: 'Agro-pastores tardíos en poblados nucleados y defensivos.',
        summary: 'Valles de Hualfín, Abaucán y Fiambalá (Catamarca): cerámica Belén Negro sobre Rojo (no gris), con 3 fases seriadas. Territorio y estilo propios junto a Santa María, con intenso intercambio final.',
        images: [],
        sources: ['Wynveldt, F. e Iucci, M.E.: Relaciones 34 (2009)', 'Sempé, M.C.: La cultura Belén (1999)'],
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
        timeRange: '~1430-1536 DC',
        modeOfLife: 'Agricultores de la quebrada bajo el Imperio Inca (Qullasuyu).',
        summary: 'Quebrada de Humahuaca incorporada al Qullasuyu: pukarás (Tilcara), qollqas, camino inca y tributo en mit\'a agrícola y minera. Agricultura de terrazas: maíz, papa, quinoa.',
        images: [],
        sources: ['Teruel, A. y Cruz, E.N. (CONICET/EDIUNJu): Jujuy en la Historia', 'INAI: mapa de territorios de comunidades'],
      },
      '1536dc': {
        timeRange: '1536-1810 DC',
        modeOfLife: 'Agricultores kollas bajo encomienda y mita colonial.',
        summary: 'Encomienda de Humahuaca (una de las mayores del Tucumán) y mita potosina desde Toledo (1570s): desestructuración en hacienda.',
        images: [],
        sources: ['Cruz, E.N. (2012): Forasteros, originarios y propietarios en Humahuaca (CONICET)'],
      },
      '1850dc': {
        timeRange: '1810-2000 DC',
        modeOfLife: 'Campesinos puneños y quebradeños.',
        summary: 'Campesinización del siglo XIX: minifundio, pastoreo y migración. Re-emergencia identitaria desde los 1990.',
        images: [],
        sources: ['INDEC: Censo 2022, población indígena', 'INAI: listado de comunidades con personería 2024'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: 'Comunidades kollas/quechuas de Jujuy y Salta.',
        summary: 'El pueblo más numeroso del NOA (78% en Jujuy y Salta): terrazas, pastoreo, Pachamama y carnaval. Quebrada Patrimonio UNESCO 2003; conflictos por litio y títulos comunitarios.',
        images: [],
        sources: ['INDEC (2024): Censo 2022', 'INAI: mapa de territorios'],
      },
    },
  },
  {
    id: 'atacameno',
    name: 'Atacameño',
    color: '#a855f7',
    periods: {
      '1400dc': {
        timeRange: '~1000 AC-1536 DC',
        modeOfLife: 'Pastores caravaneros de llamas entre Puna, valles y Chile.',
        summary: 'Puna de Atacama (Susques, San Antonio de los Cobres, Antofagasta): caravanas de trueque de sal, carnes y tejidos documentadas desde 1000 AC. Agricultura de oasis de altura.',
        images: [],
        sources: ['Yacobaccio, H. (CONICET/UBA): tráfico de caravanas en Puna de Jujuy', 'Nielsen, A.: tráfico caravanero (CONICET)'],
      },
      '1536dc': {
        timeRange: '1536-1810 DC',
        modeOfLife: 'Caravaneros y arrieros bajo la colonia.',
        summary: 'La ruta de Almagro (1536) cruza su territorio; luego arrieros y peones de ingenios y salinas, con continuidad caravanera.',
        images: [],
        sources: ['García Moritán, M. et al. (CONICET/ProYungas): Comunidades originarias de Jujuy (2012)'],
      },
      '1850dc': {
        timeRange: '1810-2000 DC',
        modeOfLife: 'Pastores puneños.',
        summary: 'Truequeros de El Loa-Salta hasta el presente; lengua kunza extinguida hacia 1950.',
        images: [],
        sources: ['García Moritán, M. et al. (CONICET/ProYungas)'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: 'Comunidades atacameñas de la Puna (9-10 en Susques).',
        summary: '~3.600 personas en Jujuy: pastoreo, turismo andino y conflicto por el litio (Olaroz-Cauchari), personería y consulta previa.',
        images: [],
        sources: ['INDEC (2024): Censo 2022', 'INAI: listado de comunidades 2024'],
      },
    },
  },
  {
    id: 'diaguita',
    name: 'Diaguita',
    color: '#f97316',
    periods: {
      '1400dc': {
        timeRange: '~1000-1536 DC',
        modeOfLife: 'Agricultores sedentarios de valles con jefaturas ("naciones").',
        summary: 'Valles Calchaquíes, Santa María, Hualfín y Tafí: andenes, canales, pukarás y cerámica santamariana. Frenaron la expansión inca (~1470-1530).',
        images: [],
        sources: ['Lorandi, A.M. (UBA/CONICET)', 'Boixadós, R. y Farberman, J. (CONICET/UNQ)'],
      },
      '1536dc': {
        timeRange: '1560-1667 DC',
        modeOfLife: 'Protagonistas de las Guerras Calchaquíes: 130 años de resistencia.',
        summary: 'Tres guerras contra la corona (líderes Juan Calchaquí, Chelemín, Bohórquez). Derrota 1665-1667 y desnaturalizaciones: traslados forzados (quilmes a Buenos Aires, 1666).',
        images: [],
        sources: ['Lorandi, A.M.: El fin de las guerras calchaquíes (CONICET)', 'Boixadós, R. y Farberman, J.: desnaturalizaciones de 1665 (CONICET 73113)'],
      },
      '1850dc': {
        timeRange: '1667-2000 DC',
        modeOfLife: 'Campesinos vallistos.',
        summary: 'Despoblamiento vallisto tras las desnaturalizaciones; vitivinicultura y agricultura familiar. Re-emergencia desde fines del siglo XX.',
        images: [],
        sources: ['INAI: listado de comunidades 2024'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: 'Comunidades diaguitas (UPND) en 4 provincias.',
        summary: 'Decenas de comunidades (Anfama, Quilmes, Tolombón, Fuerte Quemado): reclamos Ley 26.160 y gestión comunitaria del sitio sagrado Quilmes desde 2008.',
        images: [],
        sources: ['INDEC (2024): Censo 2022', 'INAI: listado de comunidades 2024'],
      },
    },
  },
  {
    id: 'comechingon',
    name: 'Comechingón',
    color: '#0ea5e9',
    periods: {
      '1400dc': {
        timeRange: '~1500 AP-1573 DC',
        modeOfLife: 'Agro-alfareros serranos.',
        summary: 'Sierras de Córdoba y San Luis (Punilla, Calamuchita, Traslasierra, Ongamira): maíz, poroto y zapallo más algarrobo, chañar y guanaco. Viviendas semisubterráneas y arte rupestre (Cerro Colorado). "Comechingón" es exónimo sanavirón ("habitantes de cuevas").',
        images: [],
        sources: ['Palladino, L. (UNC): Los comechingones en Córdoba (2021)', 'Bonnin, M. y Laguens, A. (UNC/CONICET)'],
      },
      '1536dc': {
        timeRange: '1573-1800 DC',
        modeOfLife: 'Bajo encomienda tras la fundación de Córdoba (1573).',
        summary: 'Encomiendas tempranas y desestructuración rápida; la historiografía oficial los dio por "extintos".',
        images: [],
        sources: ['Palladino, L. (UNC, 2021)'],
      },
      '1850dc': {
        timeRange: '1800-2000 DC',
        modeOfLife: 'Serranos criollizados.',
        summary: 'Invisibilizados como pueblo hasta la revitalización del siglo XXI.',
        images: [],
        sources: ['INAI: listado de comunidades 2024'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: 'Comunidades comechingonas en re-emergencia (desde 2008).',
        summary: '10 comunidades reconocidas por INAI (18 según Córdoba): La Toma, Pluma Blanca y otras. Lengua hen-kamiare en reconstrucción; disputa por Cerro Colorado y Ongamira.',
        images: [],
        sources: ['INAI: listado 2024', 'Gobierno de Córdoba: registro de pueblos originarios'],
      },
    },
  },
  {
    id: 'huarpe',
    name: 'Huarpe',
    color: '#84cc16',
    periods: {
      '1400dc': {
        timeRange: '~300 DC-1533',
        modeOfLife: 'Agricultores hidráulicos celebrados como grandes regadores.',
        summary: 'Valles de Mendoza, San Juan y San Luis más Lagunas de Guanacache: canales del Mendoza-Tunuyán-San Juan (maíz, quinoa, poroto), pesca lacustre y algarrobo. Dominio inca ~1480-1533.',
        images: [],
        sources: ['García, A. (UNCuyo): agricultura huarpe y conquista', 'Escolar, D. (CONICET/UNCuyo)'],
      },
      '1536dc': {
        timeRange: '1533-1800 DC',
        modeOfLife: 'Bajo encomienda dependiente de Chile.',
        summary: 'Cuyo dependiente de Chile: encomiendas y traslados masivos a Santiago para la minería. Despoblamiento crónico del siglo XVII.',
        images: [],
        sources: ['Parisii, E.: Valles, tierras y cacicazgos huarpes (Chungará, 2022)'],
      },
      '1850dc': {
        timeRange: '1800-2000 DC',
        modeOfLife: 'Puesteros de Guanacache.',
        summary: 'Dados por extintos; re-emergencia en los 1990 en las Lagunas de Guanacache.',
        images: [],
        sources: ['INAI: comunidades Huarpe Guanacache'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: '11 comunidades Huarpe de Guanacache (INAI).',
        summary: 'Lavalle (Mendoza), 25 de Mayo y Sarmiento (San Juan), Belgrano (San Luis): caprinos, junquillo y cuero. Lenguas allentiac/millcayac extintas en el XVII; lucha por agua, territorio y co-gestión del sitio Ramsar.',
        images: [],
        sources: ['INAI: listado 2024', 'Escolar, D. (CONICET/UNCuyo)'],
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
        timeRange: '~1000 AC-1000 DC',
        modeOfLife: 'Aldeas estables con cultivo intensivo y cerámica.',
        summary: 'Selva paranaense: agricultura de roza (maíz, mandioca), cerámica decorada y redes de intercambio. Base de la expansión tupí-guaraní (~1000 DC).',
        images: [],
        sources: ['Politis, G. et al. (CONICET-UNLP)'],
      },
      '1400dc': {
        timeRange: '~1000-1536 DC',
        modeOfLife: 'Agricultores guaraníes de aldeas numerosas (tekoa).',
        summary: 'Cuenca Paraná-Paraguay-Uruguay: roza y quema, caza menor, pesca y recolección de yerba y miel. Alta movilidad por parentesco y religión (guata).',
        images: [],
        sources: ['Enriz, N. (CONICET/UBA)', 'Wilde, G. (CONICET-UNSAM): Religión y poder en las misiones (2009)'],
      },
      '1536dc': {
        timeRange: 'Siglos XVII-XVIII',
        modeOfLife: 'Entre reducciones jesuíticas y monte libre.',
        summary: '30 pueblos de misiones (~100.000 reducidos c.1730). Los mbya actuales descienden de quienes rechazaron la reducción y se refugiaron en el monte. Expulsión de 1767: dispersión.',
        images: [],
        sources: ['Wilde, G. (CONICET-UNSAM, 2009)', 'INAPL: arqueología de misiones jesuíticas'],
      },
      '1850dc': {
        timeRange: 'Siglos XIX-XX',
        modeOfLife: 'Bajo avance criollo, obrajes y yerbatales.',
        summary: 'Despojo territorial por obraje yerbatero y colonización; trabajo golondrina y arrinconamiento en el monte.',
        images: [],
        sources: ['Enriz, N. (CONICET/UBA)'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: 'Comunidades mbya, avá-chiripá y paĩ tavyterã.',
        summary: '~8.000-10.000 mbya en ~120 tekoa de Misiones más Corrientes y Entre Ríos; pueblo transnacional (Paraguay, Brasil, Bolivia). Lengua vigente; conflictos por tierras y desmonte.',
        images: [],
        sources: ['Enriz, N. (CONICET/UBA, 2026)', 'INDEC: Censo 2022'],
      },
    },
  },
  {
    id: 'qom',
    name: 'Qom / Toba',
    color: '#f59e0b',
    periods: {
      '1400dc': {
        timeRange: '~500-1700 DC',
        modeOfLife: 'Cazadores-recolectores-pescadores seminómadas en bandas.',
        summary: 'Chaco oriental (Bermejo-Pilcomayo-Paraguay): caza de pecarí y ciervo, pesca con redes y arpón, algarroba y miel. Familia guaycurú; caballo desde el siglo XVIII.',
        images: [],
        sources: ['Tola, F. (CONICET/UBA, 2010, 2012)'],
      },
      '1536dc': {
        timeRange: '1700-1884 DC',
        modeOfLife: 'Guerreros ecuestres del Chaco.',
        summary: 'Tobas-abipones ecuestres: guerra interétnica y resistencia a la frontera colonial.',
        images: [],
        sources: ['Tola, F. (CONICET/UBA)'],
      },
      '1850dc': {
        timeRange: '1884-1924 DC',
        modeOfLife: 'Bajo campaña del Chaco y reducciones estatales.',
        summary: 'Campaña de Victorica (1884), reducción Napalpí (1911) y Masacre de Napalpí (19/7/1924) contra qom y moqoit en huelga: declarada crimen de lesa humanidad en 2022.',
        images: [],
        sources: ['Lenton, D. et al. (CONICET/UBA)', 'Secretaría de DDHH de la Nación: Juicio por la Verdad (2022)'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: 'Uno de los pueblos más numerosos del país (~126.000, Censo 2010).',
        summary: 'Este de Chaco y Formosa, norte de Santa Fe y barrios urbanos (Resistencia, Rosario, La Plata): EIB, artesanía y reclamos Ley 26.160.',
        images: [],
        sources: ['INDEC: Censo 2010/2022', 'INAI: listado 2024'],
      },
    },
  },
  {
    id: 'wichi',
    name: 'Wichí',
    color: '#8b5cf6',
    periods: {
      '1400dc': {
        timeRange: '~500-1800 DC',
        modeOfLife: 'Cultura del monte y del río.',
        summary: 'Chaco occidental (cabeceras Bermejo-Pilcomayo): pesca estacional del sábalo, caza con lanza, algarrobo (hwichaj), chañar y miel. Aldeas patrilocales. Familia mataco-mataguaya ("mataco" es etnónimo despectivo).',
        images: [],
        sources: ['Palmer, J.: La buena voluntad wichí (2005, UBA/CONICET)', 'Braunstein, J. / Califano, M. (CONICET)'],
      },
      '1536dc': {
        timeRange: '1800-1914 DC',
        modeOfLife: 'Autónomos del monte chaqueño.',
        summary: 'Resistencia a la frontera salteña hasta la llegada de ingenios y misiones.',
        images: [],
        sources: ['Palmer, J. (UBA/Oxford, 2005)'],
      },
      '1850dc': {
        timeRange: 'Fines del XIX-1950 DC',
        modeOfLife: 'Enganche forzado en ingenios y obrajes.',
        summary: 'Ingenios azucareros (Tabacal, Ledesma), obrajes madereros y misiones anglicanas (1914) y franciscanas fijan el sedentarismo.',
        images: [],
        sources: ['Palmer, J. (2005)', 'UNJu/UNSa: estudios chaqueños'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: '~50.000 personas en Salta, Formosa y Chaco.',
        summary: 'Chaco salteño y formoseño: vulnerabilidad hídrica y alimentaria, deforestación del Chaco seco y lucha por títulos comunitarios.',
        images: [],
        sources: ['INDEC: Censo 2010/2022', 'INAI: listado 2024'],
      },
    },
  },
  {
    id: 'mocovi',
    name: 'Mocoví',
    color: '#ec4899',
    periods: {
      '1400dc': {
        timeRange: '~500-1743 DC',
        modeOfLife: 'Cazadores-guerreros del Chaco austral.',
        summary: 'Entre el Bermejo y el Salado santafesino: caza, recolección y luego vacuno cimarrón a caballo (siglos XVII-XVIII). Guaycurúes del sur.',
        images: [],
        sources: ['Rosso, C. (CONICET): Chungará 2015; Rev. Mus. La Plata 2017'],
      },
      '1536dc': {
        timeRange: '1743-1870 DC',
        modeOfLife: 'En reducciones jesuitas y frontera santafesina.',
        summary: 'Reducciones San Francisco Javier (1743), San Pedro y Concepción; tras la expulsión (1767), frontera santafesina del siglo XIX.',
        images: [],
        sources: ['López, L. / Fernández, L. (UNR/UNNE, 2012)'],
      },
      '1850dc': {
        timeRange: '1870-1924 DC',
        modeOfLife: 'Bajo colonización agrícola.',
        summary: 'Colonización 1870-1910, Rebelión de San Javier (1904, último malón, reprimido) y Masacre de Napalpí (1924, compartida con los qom).',
        images: [],
        sources: ['López, L. / Fernández, L. (2012)', 'Secretaría de DDHH: Juicio Napalpí (2022)'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: '~22.000 personas en Chaco y Santa Fe.',
        summary: 'Sudoeste del Chaco y norte-centro de Santa Fe más migración urbana (Rosario). Lengua moqoit en revitalización con EIB.',
        images: [],
        sources: ['INDEC: Censo 2010/2022', 'INAI: listado 2024'],
      },
    },
  },
  {
    id: 'pilaga',
    name: 'Pilagá',
    color: '#14b8a6',
    periods: {
      '1400dc': {
        timeRange: '~500-1900 DC',
        modeOfLife: 'Pescadores y cazadores del Pilcomayo medio.',
        summary: 'Margen derecha del Pilcomayo (Bajo Hondo-Fortín Yunká): pesca intensiva en bañados, caza y frutos del monte. Bandas bilaterales móviles, alianza estrecha con tobas occidentales.',
        images: [],
        sources: ['Matarrese, M. (CONICET/UBA): Memoria Americana 20(2), 2012'],
      },
      '1536dc': {
        timeRange: '1900-1930 DC',
        modeOfLife: 'Último pueblo chaqueño en contactar.',
        summary: 'Zona desconocida hasta fines del XIX; fortines, ingenios y Misión Anglicana El Toba (1930) inician el sedentarismo.',
        images: [],
        sources: ['Vidal, A. / Telesca, I. (CONICET/UNaF)'],
      },
      '1850dc': {
        timeRange: '1947 DC',
        modeOfLife: 'Masacre de Rincón Bomba / La Bomba (octubre 1947).',
        summary: 'Gendarmería reprime a cientos de pilagás tras un conflicto salarial en ingenios: muertos y persecución en el monte. Causa por lesa humanidad y memoria activa.',
        images: [],
        sources: ['Mapelman, V.: Masacre La Bomba 1947', 'IWGIA / CONICET'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: '~5.000-6.000 hablantes en Formosa.',
        summary: 'Centro-oeste formoseño (Pozo del Tigre, Las Lomitas): pequeñas colonias rurales y reclamo de reparación histórica por Rincón Bomba.',
        images: [],
        sources: ['INDEC: Censo 2010/2022', 'INAI: listado 2024'],
      },
    },
  },
  {
    id: 'ranquel',
    name: 'Ranquel',
    color: '#6366f1',
    periods: {
      '1400dc': {
        timeRange: '~500-1700 DC',
        modeOfLife: 'Cazadores-recolectores de Pampa y Cuyo.',
        summary: 'Origen mixto del siglo XVIII: pampas het más mapuches-pehuenches trasandinos atraídos por el caballo. Caldenar entre los ríos Cuarto, Quinto, Salado y Colorado.',
        images: [],
        sources: ['Tamagnini, M. (UNRC): Los ranqueles y la palabra', 'Martínez Sarasola, C.: Nuestros paisanos los indios'],
      },
      '1536dc': {
        timeRange: 'Siglo XVIII',
        modeOfLife: 'Potencia militar-comercial ecuestre.',
        summary: 'El caballo los vuelve potencia: toldos de cuero, malón y comercio de sal, ganado y tejidos. Caciques Painé, Calfucurá, Mariano Rosas y Baigorrita.',
        images: [],
        sources: ['Tamagnini, M. (UNRC)'],
      },
      '1850dc': {
        timeRange: '1878-1885 DC',
        modeOfLife: 'Sometidos en la Conquista del Desierto.',
        summary: 'Campañas de Roca hasta el caldenar: derrota, deportaciones y reparto de tierras.',
        images: [],
        sources: ['Delrío et al. (CONICET-CENPAT)'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: 'Pueblo Ranquel con municipio propio en San Luis.',
        summary: 'La Pampa y San Luis: restitución 2007-2009 con el Pueblo/Municipio Ranquel en Renca. Revitalización del rankülche/mapudungun.',
        images: [],
        sources: ['Giacomasso et al. (2017): Intersecciones en Antropología Nº18 (UNICEN-CONICET)', 'INAI: listado 2024'],
      },
    },
  },
  {
    id: 'mapuche',
    name: 'Mapuche',
    color: '#e11d48',
    periods: {
      '1400dc': {
        timeRange: '~500-1550 DC',
        modeOfLife: 'Horticultores-ganaderos de la Araucanía (mapu = tierra, che = gente).',
        summary: 'Biobío-Toltén y ambos lados andinos (pehuenches de Neuquén): ruca, lof/lonko, tejido, cerámica y nguillatun.',
        images: [],
        sources: ['Boccara, G.: Los vencedores (IIAM)', 'Nacuzzi, L. (UBA-CONICET)'],
      },
      '1536dc': {
        timeRange: 'Siglos XVI-XIX',
        modeOfLife: 'Expansión al este (araucanización).',
        summary: 'Difusión de mapudungun, caballo, telar, platería y red ganadera sobre Pampa y Patagonia norte, absorbiendo pehuenches, huilliches y tehuelches del norte.',
        images: [],
        sources: ['Boccara, G. (IIAM)'],
      },
      '1850dc': {
        timeRange: '1878-1885 DC',
        modeOfLife: 'Derrotados en la Conquista del Desierto.',
        summary: 'Ley 947/1878 y campañas de Roca hasta Neuquén-Chubut: caída de Sayhueque, Inacayal y Namuncurá; deportaciones y tierras a terratenientes.',
        images: [],
        sources: ['Delrío, Briones, Ramos (CONICET-CENPAT)', 'INDEC: Pueblos Originarios'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: 'El pueblo originario más numeroso de Argentina.',
        summary: '~60 lof solo en Neuquén más Río Negro (Bariloche, El Bolsón) y Chubut (Cushamen): personerías INAI y reclamos frente a forestación, minería y turismo.',
        images: [],
        sources: ['INDEC: ECPI / Censos 2010/2022', 'INAI: listado 2024'],
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
        timeRange: '~5.000-500 DC',
        modeOfLife: 'Cazadores-recolectores pedestres de la estepa.',
        summary: 'Bandas del Macizo del Deseado: guanaco con boleadora, arco y lazo; toldo de cuero y quillango pintado; circuitos estacionales costa-cordillera.',
        images: [],
        sources: ['Aguerre, A.M. (UBA-CONICET): Cazadores patagónicos y colonos'],
      },
      '1400dc': {
        timeRange: '~500-1700 DC',
        modeOfLife: 'Cazadores nómades de guanaco y ñandú.',
        summary: 'Estepa desde el Chubut hasta Magallanes (sur aónikenk, norte gennakenk): desplazamientos estacionales y arte mobiliar.',
        images: [],
        sources: ['Siffredi, A. y Martinengo: Los tehuelches'],
      },
      '1536dc': {
        timeRange: 'Siglo XVIII',
        modeOfLife: 'La llegada del caballo los transforma.',
        summary: 'El caballo (difundido desde el norte) da mayor movilidad, toldos grandes y cacicazgos: Casimiro Biguá, María la Grande.',
        images: [],
        sources: ['UNLP-FCNyM: introducción del caballo en Patagonia (Rev. Museo La Plata)'],
      },
      '1850dc': {
        timeRange: '1878-1900 DC',
        modeOfLife: 'Despojados por la Conquista del Desierto y la oveja.',
        summary: 'Colonización ovina sobre sus campos: pactos mínimos y reservas como Camusu Aike (1898).',
        images: [],
        sources: ['Cirigliano (UNPA-CONICET): Camusu Aike'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: 'Comunidades aónikenk en Santa Cruz y Chubut.',
        summary: 'Camusu Aike (Güer Aike, título comunitario) más Copolke, Fem Mapu, El Chalía y Loma Blanca. Lengua aonekko \'a\'ien en revitalización, casi sin hablantes fluidos.',
        images: [],
        sources: ['INAI: listado 2024', 'UNPA-CONICET'],
      },
    },
  },
  {
    id: 'selknam',
    name: "Selk'nam (Ona)",
    color: '#06b6d4',
    periods: {
      '1400dc': {
        timeRange: '~500-1880 DC',
        modeOfLife: 'Nómades terrestres del interior fueguino.',
        summary: 'Isla Grande (estepa norte y bosque centro): caza de guanaco con arco y flecha, zorro y cururo; toldo cónico, capa de guanaco y ceremonia Hain/Kloketen. "Ona" es nombre yagán; selk\'nam = gente del norte.',
        images: [],
        sources: ['Chapman, A.: Fin de un mundo. Los selk\'nam de Tierra del Fuego', 'Borrero, L.A. (UBA-CONICET)'],
      },
      '1536dc': {
        timeRange: 'Siglos XVI-XIX',
        modeOfLife: 'Contacto esporádico y luego colonización.',
        summary: 'Navegantes y loberos primero; desde 1880 la colonización ovina (Menéndez, Braun, Popper) trae cacerías pagadas por orejas.',
        images: [],
        sources: ['García Laborde et al. (CONICET 11336/54593)'],
      },
      '1850dc': {
        timeRange: '1880-1920 DC',
        modeOfLife: 'Genocidio fueguino.',
        summary: 'De ~3.500-4.000 a menos de 100: cacerías, deportación a la Misión La Candelaria y epidemias. Última selk\'nam de crianza tradicional: Lola Kiepja (†1966).',
        images: [],
        sources: ['Chapman, A.', 'García Laborde et al. (CONICET)'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: 'Comunidad Rafaela Ishton en Río Grande.',
        summary: '~51 familias con personería INAI y escrituración de tierras (2023); autoadscripción en censos. Chile los reconoció por ley en 2023.',
        images: [],
        sources: ['INAI: listado 2024', 'INDEC: Censo 2022'],
      },
    },
  },
  {
    id: 'yamana',
    name: 'Yámana',
    color: '#d946ef',
    periods: {
      '1400dc': {
        timeRange: '~6.500 AP-1800 DC',
        modeOfLife: 'Canoeros nómades marinos, los más australes del mundo.',
        summary: 'Canales desde Brecknock hasta el Cabo de Hornos (centro: Beagle): canoa de corteza de lenga (anan), arpón de lobo marino, mariscos y choza cúpula con fuego siempre encendido a bordo.',
        images: [],
        sources: ['Orquera, L. y Piana, E. (CADIC-CONICET): Arqueología del canal Beagle', 'Gusinde, M.: Los indios de Tierra del Fuego'],
      },
      '1536dc': {
        timeRange: 'Siglos XIX-XX',
        modeOfLife: 'Misiones y epidemias.',
        summary: 'Anglicanos (Gardiner, Stirling, Bridges en Ushuaia 1869, diccionario yagán) y salesianos: epidemias, sedentarización y pérdida de la canoa.',
        images: [],
        sources: ['Bridges, L.: El confín de la tierra (Sudamericana)', 'Butto, A. y Martinoli, M.P. (CADIC-CONICET)'],
      },
      '1850dc': {
        timeRange: '1880-1950 DC',
        modeOfLife: 'Colapso demográfico.',
        summary: 'El contacto reduce drásticamente a la población; sobreviven núcleos familiares en el Beagle.',
        images: [],
        sources: ['Butto, A. y Martinoli, M.P. (CADIC-CONICET)'],
      },
      presente: {
        timeRange: 'Siglo XXI',
        modeOfLife: 'Comunidad Yagán Paiakoala en Ushuaia.',
        summary: 'Familia Vargas-Filgueira en Bahía Mejillones. Cristina Calderón Harban (1928-2022, Tesoro Humano Vivo) fue la última hablante nativa fluida; revitalización lingüística en curso.',
        images: [],
        sources: ['CADIC-CONICET', 'INAI: listado 2024'],
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
