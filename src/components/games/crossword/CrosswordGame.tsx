import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Check } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const PUZZLE_EN = {
  size: 5,
  words: [
    { word: 'HELLO', row: 0, col: 0, direction: 'across', clue: 'Greeting' },
    { word: 'WORLD', row: 2, col: 0, direction: 'across', clue: 'The earth' },
    { word: 'HELLO', row: 0, col: 0, direction: 'down', clue: 'Greeting (down)' },
    { word: 'OLD', row: 2, col: 2, direction: 'down', clue: 'Not new' },
  ]
};

const PUZZLE_ES = {
  size: 5,
  words: [
    { word: 'HOLA', row: 0, col: 0, direction: 'across', clue: 'Saludo' },
    { word: 'MUNDO', row: 2, col: 0, direction: 'across', clue: 'La tierra' },
    { word: 'HOLA', row: 0, col: 0, direction: 'down', clue: 'Saludo (vertical)' },
    { word: 'LUZ', row: 0, col: 2, direction: 'down', clue: 'Iluminación' },
  ]
};

export default function CrosswordGame() {
  const { lang } = useLanguage();
  const puzzle = lang === 'es' ? PUZZLE_ES : PUZZLE_EN;
  const [grid, setGrid] = useState(() => 
    Array(puzzle.size).fill(null).map(() => Array(puzzle.size).fill(''))
  );
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [showSolution, setShowSolution] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    if (activeCell.row === row && activeCell.col === col) {
      setDirection(prev => prev === 'across' ? 'down' : 'across');
    } else {
      setActiveCell({ row, col });
    }
  };

  const handleKeyDown = (row: number, col: number, key: string) => {
    if (key === 'Backspace') {
      setGrid(prev => {
        const newGrid = prev.map(r => [...r]);
        newGrid[row][col] = '';
        return newGrid;
      });
      // Move back
      if (direction === 'across' && col > 0) setActiveCell({ row, col: col - 1 });
      if (direction === 'down' && row > 0) setActiveCell({ row: row - 1, col });
    } else if (/^[a-zA-Z]$/.test(key)) {
      const letter = key.toUpperCase();
      setGrid(prev => {
        const newGrid = prev.map(r => [...r]);
        newGrid[row][col] = letter;
        return newGrid;
      });
      // Move forward
      if (direction === 'across' && col < puzzle.size - 1) setActiveCell({ row, col: col + 1 });
      if (direction === 'down' && row < puzzle.size - 1) setActiveCell({ row: row + 1, col });
    }
  };

  const isCellActive = (row: number, col: number) => 
    activeCell.row === row && activeCell.col === col;

  const isPartOfWord = (row: number, col: number) => {
    return puzzle.words.some(w => {
      if (w.direction === 'across') {
        return w.row === row && col >= w.col && col < w.col + w.word.length;
      } else {
        return w.col === col && row >= w.row && row < w.row + w.word.length;
      }
    });
  };

  const getCorrectLetter = (row: number, col: number): string | null => {
    for (const w of puzzle.words) {
      if (w.direction === 'across' && w.row === row && col >= w.col && col < w.col + w.word.length) {
        return w.word[col - w.col];
      }
      if (w.direction === 'down' && w.col === col && row >= w.row && row < w.row + w.word.length) {
        return w.word[row - w.row];
      }
    }
    return null;
  };

  const checkSolution = () => {
    let correct = 0;
    let total = 0;
    for (let r = 0; r < puzzle.size; r++) {
      for (let c = 0; c < puzzle.size; c++) {
        const correctLetter = getCorrectLetter(r, c);
        if (correctLetter) {
          total++;
          if (grid[r][c] === correctLetter) correct++;
        }
      }
    }
    return { correct, total };
  };

  const { correct, total } = checkSolution();
  const isComplete = correct === total && total > 0;

  return (
    <div className="w-full max-w-[520px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-coal dark:text-white">
          {lang === 'es' ? 'Crucigrama Mini' : 'Crossword Mini'}
        </h2>
        <div className="text-sm text-sand-500">
          {correct}/{total}
        </div>
      </div>

      {/* Grid */}
      <div className="flex justify-center mb-6">
        <div 
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${puzzle.size}, 48px)` }}
        >
          {grid.map((row, r) => 
            row.map((cell, c) => {
              const correctLetter = getCorrectLetter(r, c);
              const isActive = isCellActive(r, c);
              const isWord = isPartOfWord(r, c);
              const showCorrect = showSolution && correctLetter;
              
              if (!isWord) {
                return <div key={`${r}-${c}`} className="w-12 h-12 bg-sand-800 rounded-lg" />;
              }

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-violet-200 dark:bg-violet-800 border-2 border-violet-500' 
                      : cell === correctLetter && cell !== ''
                      ? 'bg-sage-100 dark:bg-sage-900 border-2 border-sage-500'
                      : 'bg-sand-100 dark:bg-sand-800 border-2 border-sand-300'
                  }`}
                >
                  {showCorrect ? (
                    <span className="text-sage-600">{correctLetter}</span>
                  ) : (
                    <span className="text-coal dark:text-white">{cell}</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Hidden input for keyboard */}
      <input
        type="text"
        autoFocus
        className="absolute opacity-0 w-1 h-1"
        onKeyDown={(e) => handleKeyDown(activeCell.row, activeCell.col, e.key)}
      />

      {/* Clues */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-sand-500 mb-2">
          {lang === 'es' ? 'Pistas' : 'Clues'}
        </h3>
        <div className="space-y-1">
          {puzzle.words.filter(w => w.direction === 'across').map((w, i) => (
            <div key={i} className="text-sm text-coal dark:text-white">
              <span className="font-semibold">{i + 1}. </span>
              {w.clue} ({w.word.length})
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="px-4 py-2 rounded-xl bg-sand-200 dark:bg-sand-700 text-coal dark:text-white hover:bg-sand-300 transition-colors"
        >
          {showSolution 
            ? (lang === 'es' ? 'Ocultar' : 'Hide') 
            : (lang === 'es' ? 'Mostrar' : 'Show')
          }
        </button>
        <button
          onClick={() => {
            setGrid(Array(puzzle.size).fill(null).map(() => Array(puzzle.size).fill('')));
            setShowSolution(false);
          }}
          className="px-4 py-2 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center p-4 bg-sage-50 dark:bg-sage-900 rounded-xl"
        >
          <p className="text-sage-700 font-semibold">
            {lang === 'es' ? '¡Completado!' : 'Completed!'}
          </p>
        </motion.div>
      )}
    </div>
  );
}
