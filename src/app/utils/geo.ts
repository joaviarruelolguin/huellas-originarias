/**
 * Genera un "blob" orgánico (forma de territorio natural) alrededor de un
 * centro, con elongación opcional e irregularidad ondulada determinista.
 * Da la estética de regiones amplias y fluidas.
 */
export function organicBlob(
  center: [number, number],
  radiusX: number,
  radiusY: number,
  opts: { irregularity?: number; seed?: number; points?: number } = {}
): number[][] {
  const { irregularity = 0.18, seed = 1, points = 28 } = opts;
  const ring: number[][] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    // Ondas superpuestas para irregularidad orgánica suave
    const w =
      Math.sin(angle * 2 + seed) * 0.55 +
      Math.sin(angle * 3 + seed * 1.7) * 0.3 +
      Math.sin(angle * 5 + seed * 2.3) * 0.18;
    const r = 1 + irregularity * w;
    ring.push([
      center[0] + Math.cos(angle) * radiusX * r,
      center[1] + Math.sin(angle) * radiusY * r,
    ]);
  }
  return ring;
}

/**
 * Suavizado de anillos de coordenadas con el algoritmo de Chaikin
 * (corte de esquinas). Convierte un polígono puntudo en una forma
 * redondeada y orgánica, como un territorio natural.
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
