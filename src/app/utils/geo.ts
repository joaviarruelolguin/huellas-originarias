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
