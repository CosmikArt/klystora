import { useState, useCallback, useRef, useMemo } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Eye, Sparkles, Trophy, Clock, Target, Zap } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const GRID_SIZE = 12;

const PUZZLES_EN = [
  { words: ['REACT', 'ASTRO', 'TAILWIND', 'TYPESCRIPT', 'COMPONENT', 'RENDER'], theme: 'Web Dev' },
  { words: ['OCEAN', 'WAVE', 'CORAL', 'SHARK', 'TURTLE', 'PEARL'], theme: 'Ocean' },
  { words: ['GUITAR', 'PIANO', 'VIOLIN', 'DRUMS', 'FLUTE', 'HARP'], theme: 'Music' },
];

const PUZZLES_ES = [
  { words: ['REACT', 'ASTRO', 'TAILWIND', 'TYPESCRIPT', 'COMPONENTE', 'RENDER'], theme: 'Desarrollo Web' },
  { words: ['OCEANO', 'OLA', 'CORAL', 'TIBURON', 'TORTUGA', 'PERLA'], theme: 'Océano' },
  { words: ['GUITARRA', 'PIANO', 'VIOLIN', 'BATERIA', 'FLAUTA', 'ARPA'], theme: 'Música' },
];

interface PlacedWord {
  word: string;
  row: number;
  col: number;
  dir: [number, number];
  cells: { row: number; col: number }[];
}

interface FoundWord {
  word: string;
  cells: { row: number; col: number }[];
  color: string;
}

const FOUND_COLORS = [
  'bg-emerald-400',
  'bg-sky-400', 
  'bg-amber-400',
  'bg-rose-400',
  'bg-violet-400',
  'bg-teal-400',
  'bg-orange-400',
  'bg-pink-400',
];

function generateGridWithPlacement(words: string[], size: number): { grid: string[][]; placedWords: PlacedWord[] } {
  const grid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
  const placedWords: PlacedWord[] = [];
  const directions: [number, number][] = [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]];

  for (const word of words) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 300) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      
      if (canPlace(grid, word, row, col, dir, size)) {
        placeWord(grid, word, row, col, dir);
        const cells: { row: number; col: number }[] = [];
        for (let i = 0; i < word.length; i++) {
          cells.push({ row: row + i * dir[0], col: col + i * dir[1] });
        }
        placedWords.push({ word, row, col, dir, cells });
        placed = true;
      }
      attempts++;
    }
  }

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
    }
  }

  return { grid, placedWords };
}

function canPlace(grid: string[][], word: string, row: number, col: number, dir: [number, number], size: number): boolean {
  for (let i = 0; i < word.length; i++) {
    const r = row + i * dir[0];
    const c = col + i * dir[1];
    if (r < 0 || r >= size || c < 0 || c >= size) return false;
    if (grid[r][c] && grid[r][c] !== word[i]) return false;
  }
  return true;
}

function placeWord(grid: string[][], word: string, row: number, col: number, dir: [number, number]) {
  for (let i = 0; i < word.length; i++) {
    grid[row + i * dir[0]][col + i * dir[1]] = word[i];
  }
}

export default function WordSearchGame() {
  const { trackGameComplete } = useAnalytics();
  const { lang } = useLanguage();
  const puzzles = lang === 'es' ? PUZZLES_ES : PUZZLES_EN;
  const [puzzleIndex] = useState(() => Math.floor(Math.random() * puzzles.length));
  const puzzle = puzzles[puzzleIndex];
  
  const { grid, placedWords } = useMemo(() => generateGridWithPlacement(puzzle.words, GRID_SIZE), [puzzle.words]);
  
  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [lastFound, setLastFound] = useState<string | null>(null);
  const [startTime] = useState(() => Date.now());
  const gridRef = useRef<HTMLDivElement>(null);

  const getWordFromCells = (cells: { row: number; col: number }[]): string => {
    return cells.map(c => grid[c.row][c.col]).join('');
  };

  const findMatchingPlacedWord = (cells: { row: number; col: number }[]): PlacedWord | null => {
    const word = getWordFromCells(cells);
    const reversed = word.split('').reverse().join('');
    
    for (const pw of placedWords) {
      const upper = pw.word.toUpperCase();
      if ((word === upper || reversed === upper) && !foundWords.some(fw => fw.word === upper)) {
        // Verify cells match (allow reverse)
        const cellsMatch = cells.length === pw.cells.length && 
          cells.every((c, i) => {
            const pwCell = word === upper ? pw.cells[i] : pw.cells[pw.cells.length - 1 - i];
            return c.row === pwCell.row && c.col === pwCell.col;
          });
        if (cellsMatch) return pw;
      }
    }
    return null;
  };

  const handleCellDown = (row: number, col: number) => {
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
  };

  const handleCellEnter = (row: number, col: number) => {
    if (!isSelecting) return;
    const start = selectedCells[0];
    if (!start) return;
    const dr = row - start.row;
    const dc = col - start.col;
    if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
      const steps = Math.max(Math.abs(dr), Math.abs(dc));
      const newCells: { row: number; col: number }[] = [];
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
    
    const matched = findMatchingPlacedWord(selectedCells);
    if (matched) {
      const color = FOUND_COLORS[foundWords.length % FOUND_COLORS.length];
      setFoundWords(prev => [...prev, { word: matched.word.toUpperCase(), cells: matched.cells, color }]);
      setLastFound(matched.word.toUpperCase());
      setTimeout(() => setLastFound(null), 2000);
      
      // Check if all words found
      const newFoundCount = foundWords.length + 1;
      if (newFoundCount === puzzle.words.length) {
        trackGameComplete('word-search', newFoundCount, true);
      }
    }
    
    setSelectedCells([]);
  };

  const isCellSelected = (row: number, col: number) =>
    selectedCells.some(c => c.row === row && c.col === col);

  const getCellFoundColor = (row: number, col: number): string | null => {
    for (const fw of foundWords) {
      if (fw.cells.some(c => c.row === row && c.col === col)) return fw.color;
    }
    return null;
  };

  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <div className="w-full max-w-[600px] mx-auto">
      {/* Header Stats */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-coal dark:text-white">
            {lang === 'es' ? 'Sopa de Letras' : 'Word Search'}
          </h2>
          <p className="text-sm text-sand-500 flex items-center gap-1">
            <Target size={14} /> {puzzle.theme}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-sand-500">
            <Clock size={14} />
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
          <div className="bg-violet-100 dark:bg-violet-900 px-3 py-1 rounded-full text-sm font-bold text-violet-700 dark:text-violet-300">
            {foundWords.length}/{puzzle.words.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-sand-200 dark:bg-sand-800 rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-violet-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(foundWords.length / puzzle.words.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 100 }}
        />
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid gap-[3px] mb-6 select-none p-3 bg-sand-100 dark:bg-sand-900 rounded-2xl touch-none"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
        onMouseUp={handleCellUp}
        onTouchEnd={handleCellUp}
        onMouseLeave={() => { if (isSelecting) handleCellUp(); }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const foundColor = getCellFoundColor(r, c);
            const isSelected = isCellSelected(r, c);
            const isFound = !!foundColor;

            return (
              <motion.div
                key={`${r}-${c}`}
                onMouseDown={() => handleCellDown(r, c)}
                onMouseEnter={() => handleCellEnter(r, c)}
                onTouchStart={(e) => { e.preventDefault(); handleCellDown(r, c); }}
                onTouchMove={(e) => {
                  e.preventDefault();
                  const touch = e.touches[0];
                  const el = document.elementFromPoint(touch.clientX, touch.clientY);
                  if (el && el.getAttribute('data-row')) {
                    const tr = parseInt(el.getAttribute('data-row')!);
                    const tc = parseInt(el.getAttribute('data-col')!);
                    handleCellEnter(tr, tc);
                  }
                }}
                data-row={r}
                data-col={c}
                whileTap={{ scale: 0.85 }}
                animate={isFound ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.3 }}
                className={`aspect-square rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm cursor-pointer transition-all duration-150 ${
                  isFound
                    ? `${foundColor} text-white shadow-lg`
                    : isSelected
                    ? 'bg-violet-300 dark:bg-violet-700 text-violet-900 dark:text-violet-100 shadow-md scale-110'
                    : 'bg-white dark:bg-sand-800 text-coal dark:text-white hover:bg-sand-200 dark:hover:bg-sand-700'
                }`}
              >
                {cell}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Words to find */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-sand-500 mb-3 flex items-center gap-2">
          <Sparkles size={14} />
          {lang === 'es' ? 'Palabras por encontrar' : 'Words to find'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {puzzle.words.map((word, i) => {
            const isFound = foundWords.some(fw => fw.word === word.toUpperCase());
            const fw = foundWords.find(f => f.word === word.toUpperCase());
            return (
              <motion.span
                key={i}
                initial={false}
                animate={isFound ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                  isFound
                    ? `${fw?.color || 'bg-emerald-400'} text-white shadow-lg line-through opacity-70`
                    : 'bg-sand-100 dark:bg-sand-800 text-coal dark:text-white border-2 border-transparent hover:border-violet-300'
                }`}
              >
                {word}
              </motion.span>
            );
          })}
        </div>
      </div>

      {/* Last found toast */}
      <AnimatePresence>
        {lastFound && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-violet-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 z-50"
          >
            <Zap size={18} className="text-amber-300" />
            <span className="font-bold">{lastFound}</span>
            <span className="text-violet-200">{lang === 'es' ? '¡encontrada!' : 'found!'}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors font-medium"
        >
          <RotateCcw size={18} />
          {lang === 'es' ? 'Nuevo' : 'New'}
        </button>
      </div>

      {/* Victory */}
      <AnimatePresence>
        {foundWords.length === puzzle.words.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 text-center p-6 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl border-2 border-emerald-400"
          >
            <Trophy size={40} className="mx-auto text-amber-500 mb-2" />
            <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
              {lang === 'es' ? '¡Completado!' : 'Completed!'}
            </p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
              {lang === 'es' ? 'Tiempo: ' : 'Time: '} {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
