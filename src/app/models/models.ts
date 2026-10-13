import type { Feature, Geometry } from 'geojson';

/** Un momento histórico predefinido en la línea de tiempo. */
export interface Period {
  id: string;
  label: string; // "1.000 AC"
  year: number; // para ordenar (negativo = AC)
  shortDescription: string;
}

/** Datos de una comunidad en un momento histórico dado. */
export interface PeriodData {
  territory: Feature<Geometry>; // mancha GeoJSON
  timeRange: string;
  modeOfLife: string;
  summary: string;
  images: string[];
  sources: string[];
}

/**
 * Comunidad originaria con continuidad en el tiempo.
 * Mismo id y color en todos los períodos que habitó.
 */
export interface Community {
  id: string;
  name: string;
  color: string;
  lineage?: string; // nota de continuidad cultural
  periods: Record<string, PeriodData>;
}
