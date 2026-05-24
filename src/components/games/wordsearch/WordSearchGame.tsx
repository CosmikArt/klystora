import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Eye } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const GRID_SIZE = 10;

const PUZZLES_EN = [
  {
    words: ['REACT', 'ASTRO', 'GAME', 'WORD', 'PLAY'],
    theme: 'Web Development'
  },
  {
    words: ['OCEAN', 'WAVE', 'FISH', 'CORAL', 'SAND'],
    theme: 'Ocean'
  }
];

const PUZZLES_ES = [
  {
    words: ['REACT', 'ASTRO', 'JUEGO', 'PALABRA', 'JUGAR'],
    theme: 'Desarrollo Web'
  },
  {
    words: ['OCEANO', 'OLA', 'PEZ', 'CORAL', 'ARENA'],
    theme: 'Océano'
  }
];

function generateGrid(words: string[], size: number): string[][] {
  const grid = Array(size).fill(null).map(() => Array(size).fill(''));
  const directions = [
    [0, 1], [1, 0], [1, 1], [-1, 1], // horizontal, vertical, diagonal
  ];

  for (const word of words) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 100) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      
      if (canPlace(grid, word, row, col, dir, size)) {
        placeWord(grid, word, row, col, dir);
        placed = true;
      }
      attempts++;
    }
  }

  // Fill empty cells
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return grid;
}

function canPlace(grid: string[][], word: string, row: number, col: number, dir: number[], size: number): boolean {
  for (let i = 0; i < word.length; i++) {
    const r = row + i * dir[0];
    const c = col + i * dir[1];
    if (r < 0 || r >= size || c < 0 || c >= size) return false;
    if (grid[r][c] && grid[r][c] !== word[i]) return false;
  }
  return true;
}

function placeWord(grid: string[][], word: string, row: number, col: number, dir: number[]) {
  for (let i = 0; i < word.length; i++) {
    grid[row + i * dir[0]][col + i * dir[1]] = word[i];
  }
}

export default function WordSearchGame() {
  const { lang } = useLanguage();
  const puzzles = lang === 'es' ? PUZZLES_ES : PUZZLES_EN;
  const [puzzleIndex] = useState(() => Math.floor(Math.random() * puzzles.length));
  const puzzle = puzzles[puzzleIndex];
  const [grid] = useState(() => generateGrid(puzzle.words, GRID_SIZE));
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [selectedCells, setSelectedCells] = useState<{row: number, col: number}[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const getWordFromCells = (cells: {row: number, col: number}[]): string => {
    return cells.map(c => grid[c.row][c.col]).join('');
  };

  const handleCellDown = (row: number, col: number) => {
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
  };

  const handleCellEnter = (row: number, col: number) => {
    if (!isSelecting) return;
    const start = selectedCells[0];
    if (!start) return;

    // Check if in line (horizontal, vertical, or diagonal)
    const dr = row - start.row;
    const dc = col - start.col;
    
    if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
      const steps = Math.max(Math.abs(dr), Math.abs(dc));
      const newCells = [];
      for (let i = 0; i <= steps; i++) {
        const r = start.row + Math.sign(dr) * i;
        const c = start.col + Math.sign(dc) * i;
        if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
          newCells.push({ row: r, col: c });
        }
      }
      setSelectedCells(newCells);
    }
  };

  const handleCellUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);
    
    const word = getWordFromCells(selectedCells);
    const reversed = word.split('').reverse().join('');
    
    for (const target of puzzle.words) {
      const upper = target.toUpperCase();
      if ((word === upper || reversed === upper) && !foundWords.has(upper)) {
        setFoundWords(prev => new Set([...prev, upper]));
        break;
      }
    }
    
    setSelectedCells([]);
  };

  const isCellSelected = (row: number, col: number) => 
    selectedCells.some(c => c.row === row && c.col === col);

  const isCellFound = (row: number, col: number) => {
    // This is simplified - in real implementation, track which cells belong to found words
    return false;
  };

  return (
    <div className="w-full max-w-[520px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-coal dark:text-white">
            {lang === 'es' ? 'Sopa de Letras' : 'Word Search'}
          </h2>
          <p className="text-sm text-sand-500">
            {puzzle.theme}
          </p>
        </div>
        <div className="text-sm text-sand-500">
          {foundWords.size}/{puzzle.words.length}
        </div>
      </div>

      {/* Grid */}
      <div 
        className="grid gap-1 mb-6 select-none"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 40px)` }}
        onMouseUp={handleCellUp}
        onTouchEnd={handleCellUp}
      >
        {grid.map((row, r) => 
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onMouseDown={() => handleCellDown(r, c)}
              onMouseEnter={() => handleCellEnter(r, c)}
              onTouchStart={() => handleCellDown(r, c)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm cursor-pointer transition-colors ${
                isCellSelected(r, c)
                  ? 'bg-violet-200 dark:bg-violet-800 text-violet-700'
                  : isCellFound(r, c)
                  ? 'bg-sage-100 dark:bg-sage-900 text-sage-700'
                  : 'bg-sand-100 dark:bg-sand-800 text-coal dark:text-white hover:bg-sand-200'
              }`}
            >
              {cell}
            </div>
          ))
        )}
      </div>

      {/* Words to find */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-sand-500 mb-2">
          {lang === 'es' ? 'Palabras' : 'Words'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {puzzle.words.map((word, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                foundWords.has(word.toUpperCase())
                  ? 'bg-sage-100 dark:bg-sage-900 text-sage-700 line-through'
                  : 'bg-sand-100 dark:bg-sand-800 text-coal dark:text-white'
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="px-4 py-2 rounded-xl bg-sand-200 dark:bg-sand-700 text-coal dark:text-white hover:bg-sand-300 transition-colors"
        >
          <Eye size={18} />
        </button>
        <button
          onClick={() => {
            setFoundWords(new Set());
            setSelectedCells([]);
            setShowSolution(false);
          }}
          className="px-4 py-2 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {foundWords.size === puzzle.words.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center p-4 bg-sage-50 dark:bg-sage-900 rounded-xl"
        >
          <p className="text-sage-700 font-semibold">
            {lang === 'es' ? '¡Todas encontradas!' : 'All found!'}
          </p>
        </motion.div>
      )}
    </div>
  );
}
