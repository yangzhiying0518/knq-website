// KNQ Website — Dot-Matrix World Map Generator
// 72 columns × 30 rows, 5° per cell, equirectangular projection
// Column 0 = 180°W, Column 36 = 0°, Column 71 = 175°E
// Row 0 = 87.5°N, Row 29 = 57.5°S

const CELL = 12;
const DOT_R = 1.6;

// Land segments: { rowIndex: [[colStart, colEnd], ...] }
const MAP_DATA = {
  1: [[10,12],[17,21],[55,56]],
  2: [[1,3],[9,14],[17,22],[37,38],[55,58]],
  3: [[1,3],[8,15],[18,21],[37,39],[55,63]],
  4: [[1,3],[7,16],[18,21],[31,32],[36,40],[50,66]],
  5: [[1,2],[6,18],[31,32],[35,40],[42,66]],
  6: [[1,2],[5,18],[34,36],[37,56],[58,65]],
  7: [[4,17],[34,36],[37,53],[55,64],[66,67]],
  8: [[4,17],[35,44],[45,55],[57,63],[65,66]],
  9: [[4,16],[35,37],[38,44],[46,53],[55,65]],
  10: [[4,16],[36,37],[39,44],[46,50],[55,65]],
  11: [[4,14],[36,44],[45,48],[50,52],[56,65]],
  12: [[5,13],[36,44],[45,48],[50,53],[57,64]],
  13: [[6,12],[36,44],[45,47],[50,54],[58,63]],
  14: [[6,11],[36,44],[50,55],[60,62]],
  15: [[7,10],[34,43],[50,54],[56,58],[60,62]],
  16: [[7,9],[33,42],[51,54],[56,58],[60,61]],
  17: [[8,9],[24,26],[34,42],[52,54],[56,60]],
  18: [[24,28],[34,41],[56,60],[63,65]],
  19: [[24,29],[35,41],[57,59],[63,65]],
  20: [[24,30],[37,41],[59,60],[63,66]],
  21: [[24,30],[38,41],[43,44],[60,67]],
  22: [[24,30],[38,41],[43,44],[60,67]],
  23: [[24,29],[39,41],[61,67]],
  24: [[23,28],[39,41],[61,67]],
  25: [[23,27],[40,41],[63,66],[69,70]],
  26: [[23,26],[66,66],[69,70]],
  27: [[23,25],[69,70]],
  28: [[23,25]],
  29: [[24,24]],
};

// Key business locations: [col, row, label, isLarge]
const HIGHLIGHTS = [
  [21, 10, 'North America', true],
  [27, 22, 'South America', false],
  [36, 8, 'Europe', true],
  [46, 13, 'Middle East', true],
  [51, 14, 'South Asia', false],
  [59, 10, 'East Asia', true],
  [57, 18, 'SE Asia', false],
  [66, 25, 'Oceania', false],
];

export function initWorldMap() {
  const container = document.getElementById('world-map-container');
  if (!container) return;

  const svgNS = 'http://www.w3.org/2000/svg';
  const totalCols = 72;
  const totalRows = 30;
  const width = totalCols * CELL;
  const height = totalRows * CELL;

  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('class', 'w-full h-auto');
  svg.setAttribute('aria-hidden', 'true');

  // Base dot layer
  const baseGroup = document.createElementNS(svgNS, 'g');
  baseGroup.setAttribute('fill', 'currentColor');
  baseGroup.setAttribute('class', 'text-text-muted');

  for (const [rowStr, segments] of Object.entries(MAP_DATA)) {
    const row = parseInt(rowStr, 10);
    const cy = row * CELL + CELL / 2;
    for (const [start, end] of segments) {
      for (let col = start; col <= end; col++) {
        const cx = col * CELL + CELL / 2;
        const dot = document.createElementNS(svgNS, 'circle');
        dot.setAttribute('cx', cx);
        dot.setAttribute('cy', cy);
        dot.setAttribute('r', DOT_R);
        dot.setAttribute('opacity', '0.18');
        baseGroup.appendChild(dot);
      }
    }
  }
  svg.appendChild(baseGroup);

  // Highlight dots with pulse
  const hlGroup = document.createElementNS(svgNS, 'g');

  for (const [col, row, , isLarge] of HIGHLIGHTS) {
    const cx = col * CELL + CELL / 2;
    const cy = row * CELL + CELL / 2;

    // Outer pulse ring
    const pulse = document.createElementNS(svgNS, 'circle');
    pulse.setAttribute('cx', cx);
    pulse.setAttribute('cy', cy);
    pulse.setAttribute('r', isLarge ? 4 : 3);
    pulse.setAttribute('fill', 'none');
    pulse.setAttribute('stroke', 'var(--color-accent)');
    pulse.setAttribute('stroke-width', '1.2');
    pulse.setAttribute('class', 'map-pulse');
    hlGroup.appendChild(pulse);

    // Core dot
    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('cx', cx);
    dot.setAttribute('cy', cy);
    dot.setAttribute('r', isLarge ? 3 : 2.5);
    dot.setAttribute('fill', 'var(--color-accent)');
    dot.setAttribute('opacity', '0.9');
    hlGroup.appendChild(dot);

    // Inner glow
    const glow = document.createElementNS(svgNS, 'circle');
    glow.setAttribute('cx', cx);
    glow.setAttribute('cy', cy);
    glow.setAttribute('r', isLarge ? 6 : 5);
    glow.setAttribute('fill', 'var(--color-accent)');
    glow.setAttribute('opacity', '0.12');
    hlGroup.appendChild(glow);
  }
  svg.appendChild(hlGroup);

  container.appendChild(svg);
}
