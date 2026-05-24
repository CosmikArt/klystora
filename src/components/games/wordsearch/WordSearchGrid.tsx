import { memo, useCallback, useRef, useState } from 'react';
import type { WordSearchPuzzle, WordSearchWord } from './puzzleData';
import { isValidSelection, getSelectionCells, findWord } from './puzzleData';

interface WordSearchGridProps {
  puzzle: WordSearchPuzzle;
  foundWords: Set<string>;
  onWordFound: (word: WordSearchWord) => void;
  selectionColor: string;
}

const WordSearchGrid = memo(function WordSearchGrid({
  puzzle,
  foundWords,
  onWordFound,
}: WordSearchGridProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState<[number, number] | null>(null);
  const [endCell, setEndCell] = useState<[number, number] | null>(null);
  const [flashCells, setFlashCells] = useState<Set<string>>(new Set());
  const [flashInvalid, setFlashInvalid] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const cellSize = 36;
  const gap = 2;

  const getCellKey = (r: number, c: number) => `${r},${c}`;

  const getCellFromEvent = useCallback((e: React.MouseEvent | React.Touch): [number, number] | null => {
    if (!gridRef.current) return null;
    const rect = gridRef.current.getBoundingClientRect();
    const x = 'clientX' in e ? e.clientX - rect.left : 0;
    const y = 'clientY' in e ? e.clientY - rect.top : 0;

    const col = Math.floor(x / (cellSize + gap));
    const row = Math.floor(y / (cellSize + gap));

    if (row < 0 || row >= puzzle.size || col < 0 || col >= puzzle.size) return null;
    return [row, col];
  }, [puzzle.size]);

  const currentSelection = (): [number, number][] => {
    if (!startCell || !endCell) return [];
    if (!isValidSelection(startCell[0], startCell[1], endCell[0], endCell[1], puzzle.size)) return [];
    return getSelectionCells(startCell[0], startCell[1], endCell[0], endCell[1]);
  };

  const handleMouseDown = useCallback((row: number, col: number) => {
    setIsSelecting(true);
    setStartCell([row, col]);
    setEndCell([row, col]);
    setFlashInvalid(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isSelecting) return;
    const cell = getCellFromEvent(e);
    if (cell) {
      setEndCell(cell);
    }
  }, [isSelecting, getCellFromEvent]);

  const handleMouseUp = useCallback(() => {
    if (!isSelecting || !startCell || !endCell) {
      setIsSelecting(false);
      return;
    }

    if (isValidSelection(startCell[0], startCell[1], endCell[0], endCell[1], puzzle.size)) {
      const cells = getSelectionCells(startCell[0], startCell[1], endCell[0], endCell[1]);
      const word = findWord(puzzle.words, cells);
      if (word && !foundWords.has(word.word)) {
        onWordFound(word);
        const keySet = new Set(cells.map(([r, c]) => getCellKey(r, c)));
        setFlashCells(keySet);
        setTimeout(() => setFlashCells(new Set()), 500);
      } else if (!word) {
        setFlashInvalid(true);
        setTimeout(() => setFlashInvalid(false), 300);
      }
    }

    setIsSelecting(false);
    setStartCell(null);
    setEndCell(null);
  }, [isSelecting, startCell, endCell, puzzle, foundWords, onWordFound, getCellFromEvent]);

  // Touch support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (!touch || !gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const col = Math.floor(x / (cellSize + gap));
    const row = Math.floor(y / (cellSize + gap));
    if (row >= 0 && row < puzzle.size && col >= 0 && col < puzzle.size) {
      handleMouseDown(row, col);
    }
  }, [handleMouseDown, puzzle.size]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (!touch || !gridRef.current || !isSelecting) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const col = Math.floor(x / (cellSize + gap));
    const row = Math.floor(y / (cellSize + gap));
    if (row >= 0 && row < puzzle.size && col >= 0 && col < puzzle.size) {
      setEndCell([row, col]);
    }
  }, [isSelecting, puzzle.size]);

  const handleTouchEnd = useCallback(() => {
    handleMouseUp();
  }, [handleMouseUp]);

  const getCellBg = (row: number, col: number): string => {
    const key = getCellKey(row, col);

    // Check if cell is part of a found word
    for (const word of puzzle.words) {
      if (foundWords.has(word.word)) {
        if (word.cells.some(([r, c]) => r === row && c === col)) {
          return 'bg-sage-500/40 dark:bg-sage-500/30';
        }
      }
    }

    // Current selection
    if (isSelecting && startCell && endCell) {
      const sel = currentSelection();
      if (sel.some(([r, c]) => r === row && c === col)) {
        return flashInvalid
          ? 'bg-sunset-500/30 dark:bg-sunset-500/30'
          : 'bg-violet-500/30 dark:bg-violet-500/30';
      }
    }

    // Flash on found
    if (flashCells.has(key)) {
      return 'bg-sage-500/60 dark:bg-sage-500/50';
    }

    return 'bg-sand-100 dark:bg-dark-surface';
  };

  return (
    <div
      ref={gridRef}
      className={`inline-grid select-none touch-none mx-auto ${flashInvalid ? 'animate-tile-shake' : ''}`}
      style={{
        gridTemplateColumns: `repeat(${puzzle.size}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${puzzle.size}, ${cellSize}px)`,
        gap: `${gap}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {puzzle.grid.map((row, r) =>
        row.map((letter, c) => (
          <button
            key={getCellKey(r, c)}
            ref={(el) => {
              if (el) cellRefs.current.set(getCellKey(r, c), el);
            }}
            className={`rounded-sm flex items-center justify-center font-semibold text-sm transition-colors duration-100 border border-sand-300 dark:border-dark-border ${getCellBg(r, c)}`}
            style={{ width: cellSize, height: cellSize, userSelect: 'none', WebkitUserSelect: 'none' }}
            onMouseDown={() => handleMouseDown(r, c)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <span className="text-ink-900 dark:text-dark-text pointer-events-none">{letter}</span>
          </button>
        ))
      )}
    </div>
  );
});

export default WordSearchGrid;
