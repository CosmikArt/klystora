import { memo } from 'react';
import type { CrosswordCell, CrosswordWord } from './puzzleData';

interface CrosswordGridProps {
  cells: CrosswordCell[][];
  words: CrosswordWord[];
  selectedCell: [number, number] | null;
  selectedWord: CrosswordWord | null;
  userGrid: CrosswordCell[][];
  checkMode: boolean;
  errorCells: Set<string>;
  onCellClick: (row: number, col: number) => void;
  size: number;
}

const CrosswordGrid = memo(function CrosswordGrid({
  cells,
  selectedCell,
  selectedWord,
  userGrid,
  checkMode,
  errorCells,
  onCellClick,
  size,
}: CrosswordGridProps) {
  const cellSize = size === 5 ? 52 : 40;
  const gap = 1;

  const getCellStyle = (row: number, col: number, cell: CrosswordCell) => {
    if (cell.isBlack) return 'bg-ink-900 dark:bg-dark-elevated';

    const isSelected = selectedCell?.[0] === row && selectedCell?.[1] === col;
    const isInSelectedWord = selectedWord?.cells.some(([r, c]) => r === row && c === col);

    const key = `${row},${col}`;
    const hasError = checkMode && errorCells.has(key);
    const isCorrect = checkMode && !errorCells.has(key) && cell.letter;

    if (isSelected) return 'bg-violet-100 dark:bg-violet-900 border-2 border-violet-600 dark:border-violet-400';
    if (hasError) return 'bg-sunset-500/30 dark:bg-sunset-500/30 border border-sunset-500';
    if (isCorrect) return 'bg-sage-500/20 dark:bg-sage-500/20 border border-sage-500';
    if (isInSelectedWord) return 'bg-violet-50 dark:bg-violet-800/30';
    return 'bg-sand-100 dark:bg-dark-surface border border-sand-300 dark:border-dark-border';
  };

  return (
    <div
      className="inline-grid mx-auto select-none"
      style={{
        gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${size}, ${cellSize}px)`,
        gap: `${gap}px`,
      }}
    >
      {userGrid.map((row, r) =>
        row.map((cell, c) => {
          if (cell.isBlack) {
            return (
              <div
                key={`${r}-${c}`}
                className="bg-ink-900 dark:bg-dark-elevated rounded-sm"
                style={{ width: cellSize, height: cellSize }}
              />
            );
          }

          const originalCell = cells[r]?.[c];
          const number = originalCell?.number;

          return (
            <button
              key={`${r}-${c}`}
              className={`relative rounded-sm flex items-center justify-center transition-colors duration-150 ${getCellStyle(r, c, cell)}`}
              style={{ width: cellSize, height: cellSize }}
              onClick={() => onCellClick(r, c)}
            >
              {number && (
                <span
                  className="absolute top-0.5 left-0.5 text-[8px] font-semibold text-ink-500 dark:text-dark-text-tertiary leading-none"
                >
                  {number}
                </span>
              )}
              <span className={`font-semibold text-lg ${
                checkMode && errorCells.has(`${r},${c}`)
                  ? 'text-sunset-600'
                  : checkMode && cell.letter
                  ? 'text-sage-600 dark:text-sage-400'
                  : 'text-ink-900 dark:text-dark-text'
              }`}>
                {cell.prefilled ? (
                  <span className="text-ink-500 dark:text-dark-text-secondary">{cell.letter}</span>
                ) : (
                  cell.letter
                )}
              </span>
            </button>
          );
        })
      )}
    </div>
  );
});

export default CrosswordGrid;
