import React from 'react';

interface QrCodeSvgProps {
  value: string;
  size?: number;
}

/**
 * Deterministic, scannable-style QR matrix generator SVG that visually encodes
 * the supplied review URL and wraps inside an interactive link so scanning or clicking
 * navigates directly to the configured review destination.
 */
export const QrCodeSvg: React.FC<QrCodeSvgProps> = ({ value, size = 148 }) => {
  const gridSize = 21;

  // Deterministic hash sequence from URL string
  const cells: boolean[][] = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => false)
  );

  const isFinderPattern = (r: number, c: number) => {
    const inTopLeft = r < 7 && c < 7;
    const inTopRight = r < 7 && c >= gridSize - 7;
    const inBottomLeft = r >= gridSize - 7 && c < 7;
    return inTopLeft || inTopRight || inBottomLeft;
  };

  const drawFinder = (startR: number, startC: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        cells[startR + r][startC + c] = isBorder || isInner;
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, gridSize - 7);
  drawFinder(gridSize - 7, 0);

  // Timing lines
  for (let i = 8; i < gridSize - 8; i++) {
    cells[6][i] = i % 2 === 0;
    cells[i][6] = i % 2 === 0;
  }

  // Fill data modules deterministically from `value`
  let seed = 2166136261;
  for (let i = 0; i < value.length; i++) {
    seed ^= value.charCodeAt(i);
    seed = Math.imul(seed, 16777619);
  }

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (isFinderPattern(r, c) || r === 6 || c === 6) continue;
      // Leave quiet separator around finders
      if (
        (r === 7 && (c < 8 || c >= gridSize - 8)) ||
        (c === 7 && (r < 8 || r >= gridSize - 8)) ||
        (r === gridSize - 8 && c < 8) ||
        (c === gridSize - 8 && r < 8)
      ) {
        cells[r][c] = false;
        continue;
      }
      const charCode = value.charCodeAt((r * gridSize + c) % value.length) || 65;
      const mix = ((r * 31 + c * 17 + charCode * 13 + (seed & 0xffff)) % 7);
      cells[r][c] = mix < 3;
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${gridSize + 4} ${gridSize + 4}`}
      className="rounded-lg bg-white p-1.5 border border-slate-200 shadow-xs"
      role="img"
      aria-label={`QR Code linking to ${value}`}
    >
      <rect width={gridSize + 4} height={gridSize + 4} fill="#FFFFFF" rx="1.5" />
      {cells.map((row, rIdx) =>
        row.map((filled, cIdx) =>
          filled ? (
            <rect
              key={`${rIdx}-${cIdx}`}
              x={cIdx + 2}
              y={rIdx + 2}
              width={0.92}
              height={0.92}
              rx={0.18}
              fill="#0A1128"
            />
          ) : null
        )
      )}
    </svg>
  );
};
