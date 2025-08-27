// Tabelas com exemplos (você pode expandir depois com os valores oficiais da WA)
const TABLES = {
  M: {
    "100 Metros rasos": [
      [1400, 9.58], [1300, 9.90], [1200, 10.20], [1100, 10.50], [1000, 10.80], [900, 11.20], [800, 11.60]
    ],
    "400 Metros rasos": [
      [1400, 43.03], [1300, 44.00], [1200, 45.00], [1100, 46.00], [1000, 47.40], [900, 49.00], [800, 50.60]
    ],
    "400 Metros com Barreiras": [
      [1400, 45.94], [1300, 47.00], [1200, 48.50], [1100, 49.80], [1000, 51.00], [900, 52.50], [800, 54.00]
    ],
    "Salto em Distância": [
      [1400, 8.95], [1300, 8.60], [1200, 8.30], [1100, 8.00], [1000, 7.70], [900, 7.40], [800, 7.10]
    ],
    "Salto Triplo": [
      [1400, 18.29], [1300, 17.80], [1200, 17.30], [1100, 16.80], [1000, 16.30], [900, 15.80], [800, 15.30]
    ],
    "Arremesso do Peso": [
      [1400, 23.56], [1300, 22.50], [1200, 21.50], [1100, 20.50], [1000, 19.60], [900, 18.60], [800, 17.60]
    ],
  },
  F: {
    "100 Metros rasos": [
      [1400, 10.49], [1300, 10.80], [1200, 11.15], [1100, 11.50], [1000, 11.85], [900, 12.30], [800, 12.75]
    ],
    "400 Metros rasos": [
      [1400, 47.60], [1300, 48.50], [1200, 49.50], [1100, 50.50], [1000, 51.50], [900, 52.80], [800, 54.20]
    ],
    "400 Metros com Barreiras": [
      [1400, 50.37], [1300, 51.50], [1200, 52.80], [1100, 54.00], [1000, 55.20], [900, 56.50], [800, 57.80]
    ],
    "Salto em Distância": [
      [1400, 7.52], [1300, 7.20], [1200, 6.90], [1100, 6.70], [1000, 6.50], [900, 6.20], [800, 6.00]
    ],
    "Salto Triplo": [
      [1400, 15.74], [1300, 15.30], [1200, 14.80], [1100, 14.40], [1000, 14.00], [900, 13.60], [800, 13.20]
    ],
    "Arremesso do Peso": [
      [1400, 22.63], [1300, 21.50], [1200, 20.50], [1100, 19.60], [1000, 18.80], [900, 17.80], [800, 16.80]
    ],
  }
};

/**
 * Descobre se a prova é corrida (tempo menor = melhor) ou campo (distância maior = melhor)
 */
function isTrack(eventName) {
  const e = eventName.toLowerCase();
  return e.includes("metros");
}

/**
 * Calcula pontos por interpolação linear
 */
function interpolate(dataset, performance, isTrackEvent) {
  const rows = [...dataset];
  if (isTrackEvent) {
    // tempo: menor = melhor, ordenar crescente
    rows.sort((a, b) => a[1] - b[1]);
    for (let i = 0; i < rows.length - 1; i++) {
      const [p0, t0] = rows[i];
      const [p1, t1] = rows[i + 1];
      if (performance >= t0 && performance <= t1) {
        const frac = (performance - t0) / (t1 - t0);
        return Math.floor(p0 + frac * (p1 - p0));
      }
    }
  } else {
    // campo: maior = melhor, ordenar decrescente
    rows.sort((a, b) => b[1] - a[1]);
    for (let i = 0; i < rows.length - 1; i++) {
      const [p0, m0] = rows[i];
      const [p1, m1] = rows[i + 1];
      if (performance <= m0 && performance >= m1) {
        const frac = (m0 - performance) / (m0 - m1);
        return Math.floor(p0 + frac * (p1 - p0));
      }
    }
  }
  return null;
}

export function calcularPontos(nomeProva, valor, sexo = "M") {
  const dataset = TABLES[sexo]?.[nomeProva];
  if (!dataset) return null;
  const perf = parseFloat(String(valor).replace(",", "."));
  if (isNaN(perf)) return null;
  return interpolate(dataset, perf, isTrack(nomeProva));
}