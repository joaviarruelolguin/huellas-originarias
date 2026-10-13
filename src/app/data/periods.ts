import type { Period } from '../models/models';

/**
 * Momentos históricos predefinidos (pasos discretos de la línea de tiempo).
 * No son intervalos uniformes: cada uno marca un hito relevante para los
 * pueblos originarios del actual territorio argentino.
 */
export const PERIODS: Period[] = [
  {
    id: '12000ac',
    label: '12.000 AC',
    year: -12000,
    shortDescription: 'Primeros pobladores: bandas de cazadores-recolectores.',
  },
  {
    id: '5000ac',
    label: '5.000 AC',
    year: -5000,
    shortDescription: 'Agricultura incipiente y vida aldeana temprana.',
  },
  {
    id: '1000ac',
    label: '1.000 AC',
    year: -1000,
    shortDescription: 'Sociedades aldeanas, cerámica y agricultura consolidada.',
  },
  {
    id: '1400dc',
    label: '1.400 DC',
    year: 1400,
    shortDescription: 'Apogeo regional e Imperio Inca en el NOA.',
  },
  {
    id: '1536dc',
    label: '1.536 DC',
    year: 1536,
    shortDescription: 'Contacto europeo y inicios de la colonia.',
  },
  {
    id: '1850dc',
    label: '1.850 DC',
    year: 1850,
    shortDescription: 'Estado nacional y Conquista del Desierto.',
  },
  {
    id: 'presente',
    label: 'Presente',
    year: 2024,
    shortDescription: 'Comunidades y territorios actuales.',
  },
];
