import { Delaunay } from 'd3-delaunay';
import polygonClipping from 'polygon-clipping';
import type { Feature, MultiPolygon, Polygon } from 'geojson';

/**
 * Factor de estiramiento N/S del mapa base (igual que el SVG de Wikimedia).
 */
const STRETCH = 1.15;

/**
 * Contorno aproximado de Argentina. Se usa para recortar los territorios
 * generados con Voronoi, de modo que no se desparramen al océano.
 */
const ARGENTINA: number[][] = [
  [-67.5, -21.5], [-65.0, -21.8], [-62.5, -22.2], [-59.5, -23.0],
  [-58.0, -24.0], [-55.5, -25.5], [-54.0, -26.5], [-53.2, -27.5],
  [-53.5, -28.0], [-54.5, -29.5], [-56.5, -30.0], [-57.5, -31.5],
  [-57.5, -33.5], [-58.0, -35.5], [-59.0, -37.5], [-60.5, -39.0],
  [-62.0, -40.5], [-63.5, -42.0], [-65.0, -44.0], [-66.5, -46.0],
  [-68.0, -48.0], [-69.0, -50.0], [-69.5, -52.0], [-68.5, -53.5],
  [-66.5, -54.5], [-65.5, -54.0], [-67.5, -53.0], [-68.5, -52.5],
  [-69.5, -50.5], [-70.0, -46.0], [-70.5, -42.0], [-71.0, -38.0],
  [-72.0, -34.0], [-72.5, -30.0], [-71.5, -27.0], [-70.0, -25.0],
  [-69.0, -23.0], [-67.5, -21.5],
];

/** Punto semilla de una comunidad (centro aproximado de su región). */
export interface Seed {
  id: string;
  center: [number, number];
}

/**
 * Genera territorios que cubren todo Argentina (tiling) mediante un
 * diagrama de Voronoi a partir de semillas, recortado al contorno del país.
 * Calculado en el espacio proyectado del mapa (equirectangular + estiramiento).
 */
export function voronoiTerritories(
  seeds: Seed[]
): Map<string, Feature<Polygon | MultiPolygon>> {
  // Límites en el espacio proyectado (x = lng, y = -lat * STRETCH)
  const projBounds: [number, number, number, number] = [-76.5, 24.15, -52.5, 64.975];
  const projected = seeds.map((s): [number, number] => [s.center[0], -s.center[1] * STRETCH]);
  const delaunay = Delaunay.from(projected);
  const vor = delaunay.voronoi(projBounds);

  // Contorno de Argentina en el espacio proyectado
  const argProj = ARGENTINA.map(([lng, lat]): [number, number] => [lng, -lat * STRETCH]);

  const result = new Map<string, Feature<Polygon | MultiPolygon>>();
  seeds.forEach((s, i) => {
    const cell = vor.cellPolygon(i);
    if (!cell) {
      return;
    }
    const cellRing = cell.slice(0, -1).map(([x, y]) => [x, y] as [number, number]);
    // Recortar la celda al contorno de Argentina
    const clipped = polygonClipping.intersection([cellRing], [argProj]);
    if (clipped.length === 0) {
      return;
    }
    // Convertir de espacio proyectado a lng/lat
    const coords = clipped.map((poly) =>
      poly.map((ring) => ring.map(([x, y]) => [x, -y / STRETCH] as [number, number]))
    );
    const geometry: MultiPolygon = { type: 'MultiPolygon', coordinates: coords };
    result.set(s.id, { type: 'Feature', properties: {}, geometry });
  });
  return result;
}

/**
 * Suavizado de anillos de coordenadas con el algoritmo de Chaikin
 * (corte de esquinas). Convierte un polígono en una forma redondeada
 * y orgánica, como un territorio natural.
 *
 * Cada iteración duplica los puntos y redondea las esquinas.
 */
export function smoothRing(ring: number[][], iterations = 3): number[][] {
  let pts = ring;
  for (let iter = 0; iter < iterations; iter++) {
    const n = pts.length;
    const out: number[][] = [];
    for (let i = 0; i < n; i++) {
      const p = pts[i];
      const q = pts[(i + 1) % n];
      // Puntos al 25% y 75% de cada arista (cortan la esquina)
      out.push([0.75 * p[0] + 0.25 * q[0], 0.75 * p[1] + 0.25 * q[1]]);
      out.push([0.25 * p[0] + 0.75 * q[0], 0.25 * p[1] + 0.75 * q[1]]);
    }
    pts = out;
  }
  return pts;
}
