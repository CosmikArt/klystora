import { useState, useEffect, useCallback, useRef } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Search, Clock } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Word {
  text: string;
  found: boolean;
  start: [number, number];
  end: [number, number];
  direction: [number, number];
}

interface Puzzle {
  grid: string[][];
  words: Word[];
  size: number;
}

const WORD_LISTS: Record<string, string[]> = {
  en: ['APPLE', 'BEACH', 'CLOUD', 'DANCE', 'EAGLE', 'FLAME', 'GRAPE', 'HEART', 'IMAGE', 'JELLY', 'LEMON', 'MUSIC', 'OCEAN', 'PIANO', 'QUEEN', 'RIVER', 'SNAKE', 'TIGER', 'UNCLE', 'VOICE', 'WATER', 'YOUTH', 'BREAD', 'CHAIR', 'DREAM', 'FLORA', 'GHOST', 'HONEY', 'IVORY', 'KNIFE', 'LIGHT', 'MANGO', 'NIGHT', 'ORBIT', 'PEARL', 'ROBOT', 'SHELL', 'TRAIN', 'WHALE', 'ZEBRA'],
  es: ['AGUA', 'BANCO', 'CALOR', 'DULCE', 'FLOR', 'GATO', 'HIELO', 'ISLA', 'JUEGO', 'LUNA', 'MANO', 'NUBE', 'OSO', 'PAZ', 'QUESO', 'ROJO', 'SOL', 'TIERRA', 'UVA', 'VERDE', 'YOGO', 'ZAPATO', 'ARBOL', 'CASA', 'DEDO', 'ESTRELLA', 'FUENTE', 'GLOBO', 'HOGAR', 'JARDIN', 'LIBRO', 'MESA', 'NIÑO', 'OJO', 'PUERTA', 'RIO', 'SILLA', 'TREN', 'VENTANA'],
  default: ['APPLE', 'BEACH', 'CLOUD', 'DANCE', 'EAGLE', 'FLAME', 'GRAPE', 'HEART', 'IMAGE', 'JELLY', 'LEMON', 'MUSIC', 'OCEAN', 'PIANO', 'QUEEN', 'RIVER', 'SNAKE', 'TIGER', 'UNCLE', 'VOICE', 'WATER', 'YOUTH', 'BREAD', 'CHAIR', 'DREAM', 'FLORA', 'GHOST', 'HONEY', 'IVORY', 'KNIFE', 'LIGHT', 'MANGO', 'NIGHT', 'ORBIT', 'PEARL', 'ROBOT', 'SHELL', 'TRAIN', 'WHALE', 'ZEBRA'],
};

const DIRECTIONS: [number, number][] = [
  [0, 1],   // right
  [1, 0],   // down
  [1, 1],   // diagonal down-right
  [-1, 1],  // diagonal up-right
  [0, -1],  // left
  [-1, 0],  // up
  [-1, -1], // diagonal up-left
  [1, -1],  // diagonal down-left
];

function generatePuzzle(size: number, wordList: string[]): Puzzle {
  const grid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
  const words: Word[] = [];
  const usedWords = new Set<string>();

  // Try to place each word
  for (const word of wordList) {
    if (usedWords.has(word)) continue;
    
    let placed = false;
    const attempts = 100;
    
    for (let attempt = 0; attempt < attempts && !placed; attempt++) {
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const maxRow = dir[0] === 1 ? size - word.length : dir[0] === -1 ? size - 1 : size - 1;
      const minRow = dir[0] === -1 ? word.length - 1 : 0;
      const maxCol = dir[1] === 1 ? size - word.length : dir[1] === -1 ? size - 1 : size - 1;
      const minCol = dir[1] === -1 ? word.length - 1 : 0;
      
      const startRow = Math.floor(Math.random() * (maxRow - minRow + 1)) + minRow;
      const startCol = Math.floor(Math.random() * (maxCol - minCol + 1)) + minCol;
      
      // Check if word fits
      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const r = startRow + dir[0] * i;
        const c = startCol + dir[1] * i;
        if (r < 0 || r >= size || c < 0 || c >= size) {
          fits = false;
          break;
        }
        if (grid[r][c] && grid[r][c] !== word[i]) {
          fits = false;
          break;
        }
      }
      
      if (fits) {
        for (let i = 0; i < word.length; i++) {
          const r = startRow + dir[0] * i;
          const c = startCol + dir[1] * i;
          grid[r][c] = word[i];
        }
        
        words.push({
          text: word,
          found: false,
          start: [startRow, startCol],
          end: [startRow + dir[0] * (word.length - 1), startCol + dir[1] * (word.length - 1)],
          direction: dir,
        });
        usedWords.add(word);
        placed = true;
      }
    }
  }

  // Fill empty cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { grid, words, size };
}

function getPuzzle(lang: string): Puzzle {
  const words = WORD_LISTS[lang] || WORD_LISTS['default'];
  const selected = words.sort(() => Math.random() - 0.5).slice(0, 10);
  return generatePuzzle(12, selected);
}

export default function WordSearchGame() {
  const { trackGameComplete } = useAnalytics();
  const { lang } = useLanguage();

  const [puzzle, setPuzzle] = useState(() => getPuzzle(lang));
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState<[number, number] | null>(null);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isComplete) {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, isComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCellFromEvent = (e: React.MouseEvent | React.TouchEvent): [number, number] | null => {
    if (!gridRef.current) return null;
    
    const rect = gridRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    
    if (clientX === undefined || clientY === undefined) return null;
    
    const cellSize = rect.width / puzzle.size;
    const col = Math.floor((clientX - rect.left) / cellSize);
    const row = Math.floor((clientY - rect.top) / cellSize);
    
    if (row >= 0 && row < puzzle.size && col >= 0 && col < puzzle.size) {
      return [row, col];
    }
    return null;
  };

  const getLineCells = (start: [number, number], end: [number, number]): [number, number][] => {
    const [r1, c1] = start;
    const [r2, c2] = end;
    const dr = Math.sign(r2 - r1);
    const dc = Math.sign(c2 - c1);
    
    const cells: [number, number][] = [];
    let r = r1, c = c1;
    
    while (r !== r2 + dr || c !== c2 + dc) {
      cells.push([r, c]);
      if (r === r2 && c === c2) break;
      r += dr;
      c += dc;
    }
    
    return cells;
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const cell = getCellFromEvent(e);
    if (cell) {
      setIsDragging(true);
      setStartCell(cell);
      setSelectedCells([cell]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !startCell) return;
    
    const cell = getCellFromEvent(e);
    if (cell) {
      const cells = getLineCells(startCell, cell);
      setSelectedCells(cells);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging || !startCell || selectedCells.length === 0) {
      setIsDragging(false);
      setStartCell(null);
      setSelectedCells([]);
      return;
    }

    // Check if selected cells form a valid word
    const selectedWord = selectedCells.map(([r, c]) => puzzle.grid[r][c]).join('');
    const reversedWord = selectedWord.split('').reverse().join('');

    let found = false;
    const newFoundWords = new Set(foundWords);

    for (const word of puzzle.words) {
      if (word.found || newFoundWords.has(word.text)) continue;
      
      if (selectedWord === word.text || reversedWord === word.text) {
        newFoundWords.add(word.text);
        found = true;
        
        // Mark word as found
        setPuzzle(prev => {
          const newPuzzle = { ...prev, words: [...prev.words] };
          const wordIdx = newPuzzle.words.findIndex(w => w.text === word.text);
          if (wordIdx !== -1) {
            newPuzzle.words[wordIdx] = { ...newPuzzle.words[wordIdx], found: true };
          }
          return newPuzzle;
        });
        break;
      }
    }

    if (found) {
      setFoundWords(newFoundWords);
      
      // Check if all words found
      if (newFoundWords.size === puzzle.words.length) {
        setIsComplete(true);
        trackGameComplete('word-search', { time: elapsed, wordsFound: newFoundWords.size });
      }
    }

    setIsDragging(false);
    setStartCell(null);
    setSelectedCells([]);
  };

  const reset = () => {
    const newPuzzle = getPuzzle(lang);
    setPuzzle(newPuzzle);
    setFoundWords(new Set());
    setIsComplete(false);
    setSelectedCells([]);
    setIsDragging(false);
    setStartCell(null);
  };

  const isCellInFoundWord = (row: number, col: number): boolean => {
    for (const word of puzzle.words) {
      if (!word.found) continue;
      
      for (let i = 0; i < word.text.length; i++) {
        const r = word.start[0] + word.direction[0] * i;
        const c = word.start[1] + word.direction[1] * i;
        if (r === row && c === col) return true;
      }
    }
    return false;
  };

  const isCellSelected = (row: number, col: number): boolean => {
    return selectedCells.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sand-500">
            <Search className="w-4 h-4" />
            <span className="text-sm">{foundWords.size}/{puzzle.words.length}</span>
          </div>
          <div className="flex items-center gap-1 text-sand-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{formatTime(elapsed)}</span>
          </div>
        </div>
      </div>

      {/* Word List */}
      <div className="flex flex-wrap gap-2 mb-4">
        {puzzle.words.map(word => (
          <span
            key={word.text}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              word.found
                ? 'bg-green-100 text-green-700 line-through'
                : 'bg-sand-100 text-sand-600'
            }`}
          >
            {word.text}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="select-none touch-none mb-6"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <div
          className="grid gap-0.5 bg-sand-100 p-2 rounded-xl"
          style={{ gridTemplateColumns: `repeat(${puzzle.size}, 1fr)` }}
        >
          {puzzle.grid.map((row, r) =>
            row.map((letter, c) => {
              const inFound = isCellInFoundWord(r, c);
              const selected = isCellSelected(r, c);

              return (
                <div
                  key={`${r}-${c}`}
                  className={`aspect-square flex items-center justify-center rounded font-bold text-sm transition ${
                    inFound
                      ? 'bg-green-500 text-white'
                      : selected
                      ? 'bg-violet-500 text-white'
                      : 'bg-white text-coal hover:bg-sand-50'
                  }`}
                >
                  {letter}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Instructions */}
      {!isComplete && (
        <p className="text-sm text-sand-500 text-center mb-4">
          Click and drag to select words. Find all {puzzle.words.length} words hidden in the grid!
        </p>
      )}

      {/* Results */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-violet-50 border border-violet-200 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-violet-500" />
              <h3 className="font-bold text-lg">All Words Found!</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{formatTime(elapsed)}</p>
                <p className="text-sm text-sand-500">Time</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{puzzle.words.length}</p>
                <p className="text-sm text-sand-500">Words</p>
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 bg-violet-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-violet-600 transition"
            >
              <RotateCcw className="w-4 h-4" />
              New Puzzle
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
