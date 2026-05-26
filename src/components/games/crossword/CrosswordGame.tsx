import { useState, useEffect, useCallback, useRef } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, ArrowRight, ArrowDown, Lightbulb, Check } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Cell {
  letter: string;
  number?: number;
  isBlack: boolean;
  answer: string;
  across?: { num: number; start: [number, number]; length: number };
  down?: { num: number; start: [number, number]; length: number };
}

interface Clue {
  num: number;
  direction: 'across' | 'down';
  text: string;
  answer: string;
  start: [number, number];
}

interface Puzzle {
  grid: Cell[][];
  clues: Clue[];
  size: number;
}

// Pre-defined 5x5 crossword puzzles
const PUZZLES: Record<string, { words: { word: string; clue: string; start: [number, number]; dir: 'across' | 'down' }[] }[]> = {
  en: [
    {
      words: [
        { word: 'HELLO', clue: 'Greeting to start a conversation', start: [0, 0], dir: 'across' },
        { word: 'WORLD', clue: 'The Earth and all its inhabitants', start: [2, 0], dir: 'across' },
        { word: 'HAPPY', clue: 'Feeling or showing pleasure', start: [0, 0], dir: 'down' },
        { word: 'OPERA', clue: 'Dramatic work set to music', start: [0, 2], dir: 'down' },
        { word: 'LORDS', clue: 'Noble members of society', start: [0, 4], dir: 'down' },
      ]
    },
    {
      words: [
        { word: 'WATER', clue: 'Essential liquid for life', start: [0, 0], dir: 'across' },
        { word: 'ALERT', clue: 'Quick to notice danger', start: [2, 0], dir: 'across' },
        { word: 'WAGON', clue: 'Vehicle pulled by horses', start: [0, 0], dir: 'down' },
        { word: 'TERSE', clue: 'Using few words', start: [0, 2], dir: 'down' },
        { word: 'RENTS', clue: 'Payments for temporary use', start: [0, 4], dir: 'down' },
      ]
    },
  ],
  es: [
    {
      words: [
        { word: 'CASAS', clue: 'Edificios donde vive la gente', start: [0, 0], dir: 'across' },
        { word: 'AMIGO', clue: 'Persona con quien se tiene afecto', start: [2, 0], dir: 'across' },
        { word: 'CAMPO', clue: 'Tierra cultivada o rural', start: [0, 0], dir: 'down' },
        { word: 'SALMO', clue: 'Canto religioso del Antiguo Testamento', start: [0, 2], dir: 'down' },
        { word: 'SOPLO', clue: 'Corriente de aire que sale de la boca', start: [0, 4], dir: 'down' },
      ]
    },
  ],
  default: [
    {
      words: [
        { word: 'HELLO', clue: 'Greeting', start: [0, 0], dir: 'across' },
        { word: 'WORLD', clue: 'The Earth', start: [2, 0], dir: 'across' },
        { word: 'HAPPY', clue: 'Feeling joy', start: [0, 0], dir: 'down' },
        { word: 'OPERA', clue: 'Musical drama', start: [0, 2], dir: 'down' },
        { word: 'LORDS', clue: 'Nobles', start: [0, 4], dir: 'down' },
      ]
    },
  ]
};

function buildPuzzle(words: { word: string; clue: string; start: [number, number]; dir: 'across' | 'down' }[]): Puzzle {
  const size = 5;
  const grid: Cell[][] = Array(size).fill(null).map(() => 
    Array(size).fill(null).map(() => ({ letter: '', isBlack: true, answer: '' }))
  );
  
  const clues: Clue[] = [];
  let clueNum = 1;
  const usedStarts = new Map<string, number>();

  // Place words
  for (const w of words) {
    const [row, col] = w.start;
    const key = `${row},${col}`;
    
    if (!usedStarts.has(key)) {
      usedStarts.set(key, clueNum++);
    }
    const num = usedStarts.get(key)!;
    
    // Place letters
    for (let i = 0; i < w.word.length; i++) {
      const r = w.dir === 'across' ? row : row + i;
      const c = w.dir === 'across' ? col + i : col;
      
      if (r < size && c < size) {
        grid[r][c] = {
          ...grid[r][c],
          letter: '',
          isBlack: false,
          answer: w.word[i],
          number: i === 0 ? num : grid[r][c].number,
        };
      }
    }
    
    clues.push({
      num,
      direction: w.dir,
      text: w.clue,
      answer: w.word,
      start: w.start,
    });
  }

  return { grid, clues, size };
}

function getPuzzle(lang: string): Puzzle {
  const puzzles = PUZZLES[lang] || PUZZLES['default'];
  const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
  return buildPuzzle(puzzle.words);
}

export default function CrosswordGame() {
  const { trackGameComplete } = useAnalytics();
  const { lang } = useLanguage();

  const [puzzle] = useState(() => getPuzzle(lang));
  const [grid, setGrid] = useState(() => 
    puzzle.grid.map(row => row.map(cell => ({ ...cell })))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [solvedWords, setSolvedWords] = useState<Set<string>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const cellRefs = useRef<(HTMLInputElement | null)[][]>(
    Array(puzzle.size).fill(null).map(() => Array(puzzle.size).fill(null))
  );

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col].isBlack) return;
    
    if (selectedCell && selectedCell[0] === row && selectedCell[1] === col) {
      setDirection(prev => prev === 'across' ? 'down' : 'across');
    } else {
      setSelectedCell([row, col]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (grid[row][col].isBlack) return;

    const key = e.key.toUpperCase();
    
    if (key === 'BACKSPACE') {
      setGrid(prev => {
        const newGrid = prev.map(r => r.map(c => ({ ...c })));
        newGrid[row][col].letter = '';
        return newGrid;
      });
      
      // Move backward
      if (direction === 'across' && col > 0) {
        const newCol = col - 1;
        if (!grid[row][newCol].isBlack) {
          setSelectedCell([row, newCol]);
          cellRefs.current[row][newCol]?.focus();
        }
      } else if (direction === 'down' && row > 0) {
        const newRow = row - 1;
        if (!grid[newRow][col].isBlack) {
          setSelectedCell([newRow, col]);
          cellRefs.current[newRow][col]?.focus();
        }
      }
    } else if (key === 'ARROWRIGHT') {
      e.preventDefault();
      if (col < puzzle.size - 1 && !grid[row][col + 1].isBlack) {
        setSelectedCell([row, col + 1]);
        setDirection('across');
        cellRefs.current[row][col + 1]?.focus();
      }
    } else if (key === 'ARROWLEFT') {
      e.preventDefault();
      if (col > 0 && !grid[row][col - 1].isBlack) {
        setSelectedCell([row, col - 1]);
        setDirection('across');
        cellRefs.current[row][col - 1]?.focus();
      }
    } else if (key === 'ARROWDOWN') {
      e.preventDefault();
      if (row < puzzle.size - 1 && !grid[row + 1][col].isBlack) {
        setSelectedCell([row + 1, col]);
        setDirection('down');
        cellRefs.current[row + 1][col]?.focus();
      }
    } else if (key === 'ARROWUP') {
      e.preventDefault();
      if (row > 0 && !grid[row - 1][col].isBlack) {
        setSelectedCell([row - 1, col]);
        setDirection('down');
        cellRefs.current[row - 1][col]?.focus();
      }
    } else if (key === 'ENTER') {
      checkSolution();
    } else if (/^[A-Z]$/.test(key)) {
      setGrid(prev => {
        const newGrid = prev.map(r => r.map(c => ({ ...c })));
        newGrid[row][col].letter = key;
        return newGrid;
      });

      // Auto-advance
      setTimeout(() => {
        if (direction === 'across' && col < puzzle.size - 1) {
          const newCol = col + 1;
          if (!grid[row][newCol].isBlack) {
            setSelectedCell([row, newCol]);
            cellRefs.current[row][newCol]?.focus();
          }
        } else if (direction === 'down' && row < puzzle.size - 1) {
          const newRow = row + 1;
          if (!grid[newRow][col].isBlack) {
            setSelectedCell([newRow, col]);
            cellRefs.current[newRow][col]?.focus();
          }
        }
      }, 10);
    }
  };

  const checkSolution = () => {
    const newSolved = new Set(solvedWords);
    let allCorrect = true;

    for (const clue of puzzle.clues) {
      const [startRow, startCol] = clue.start;
      let word = '';
      
      for (let i = 0; i < clue.answer.length; i++) {
        const r = clue.direction === 'across' ? startRow : startRow + i;
        const c = clue.direction === 'across' ? startCol + i : startCol;
        word += grid[r][c].letter;
      }

      if (word === clue.answer) {
        newSolved.add(`${clue.num}-${clue.direction}`);
      } else {
        allCorrect = false;
      }
    }

    setSolvedWords(newSolved);

    if (allCorrect && newSolved.size === puzzle.clues.length) {
      setIsComplete(true);
      trackGameComplete('crossword', { hintsUsed, size: puzzle.size });
    }
  };

  const useHint = () => {
    if (isComplete) return;
    
    // Find first unsolved cell
    for (let r = 0; r < puzzle.size; r++) {
      for (let c = 0; c < puzzle.size; c++) {
        if (!grid[r][c].isBlack && grid[r][c].letter !== grid[r][c].answer) {
          setGrid(prev => {
            const newGrid = prev.map(row => row.map(cell => ({ ...cell })));
            newGrid[r][c].letter = newGrid[r][c].answer;
            return newGrid;
          });
          setHintsUsed(prev => prev + 1);
          return;
        }
      }
    }
  };

  const reset = () => {
    setGrid(puzzle.grid.map(row => row.map(cell => ({ ...cell, letter: '' }))));
    setSolvedWords(new Set());
    setIsComplete(false);
    setHintsUsed(0);
    setSelectedCell(null);
  };

  const getActiveClue = (): Clue | null => {
    if (!selectedCell) return null;
    const [row, col] = selectedCell;
    
    for (const clue of puzzle.clues) {
      const [startRow, startCol] = clue.start;
      if (clue.direction === direction) {
        if (direction === 'across' && row === startRow && col >= startCol && col < startCol + clue.answer.length) {
          return clue;
        }
        if (direction === 'down' && col === startCol && row >= startRow && row < startRow + clue.answer.length) {
          return clue;
        }
      }
    }
    return null;
  };

  const activeClue = getActiveClue();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="text-sm text-sand-500">
            {solvedWords.size}/{puzzle.clues.length} words
          </div>
          <div className="text-sm text-sand-500">
            {hintsUsed} hints
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={useHint}
            disabled={isComplete}
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 transition disabled:opacity-50"
          >
            <Lightbulb className="w-4 h-4" />
            Hint
          </button>
          <button
            onClick={checkSolution}
            className="flex items-center gap-1 px-3 py-1.5 bg-violet-100 text-violet-700 rounded-lg text-sm font-medium hover:bg-violet-200 transition"
          >
            <Check className="w-4 h-4" />
            Check
          </button>
        </div>
      </div>

      {/* Active Clue */}
      {activeClue && (
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-violet-600 mb-1">
            {activeClue.direction === 'across' ? <ArrowRight className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            <span className="font-medium">{activeClue.num} {activeClue.direction}</span>
          </div>
          <p className="text-coal">{activeClue.text}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Grid */}
        <div className="flex-shrink-0">
          <div 
            className="inline-grid gap-0.5 p-2 bg-sand-100 rounded-xl"
            style={{ gridTemplateColumns: `repeat(${puzzle.size}, 1fr)` }}
          >
            {grid.map((row, r) => 
              row.map((cell, c) => {
                const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
                const isSolved = (() => {
                  // Check if this cell is part of a solved word
                  for (const clue of puzzle.clues) {
                    const [sr, sc] = clue.start;
                    const key = `${clue.num}-${clue.direction}`;
                    if (!solvedWords.has(key)) continue;
                    
                    if (clue.direction === 'across' && r === sr && c >= sc && c < sc + clue.answer.length) return true;
                    if (clue.direction === 'down' && c === sc && r >= sr && r < sr + clue.answer.length) return true;
                  }
                  return false;
                })();

                if (cell.isBlack) {
                  return (
                    <div 
                      key={`${r}-${c}`}
                      className="w-10 h-10 bg-coal rounded-sm"
                    />
                  );
                }

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`relative w-10 h-10 rounded-sm transition ${
                      isSelected 
                        ? 'ring-2 ring-violet-500 bg-violet-50' 
                        : isSolved
                        ? 'bg-green-100'
                        : 'bg-white'
                    }`}
                    onClick={() => handleCellClick(r, c)}
                  >
                    {cell.number && (
                      <span className="absolute top-0.5 left-0.5 text-[8px] text-sand-500 font-medium">
                        {cell.number}
                      </span>
                    )}
                    <input
                      ref={el => { cellRefs.current[r][c] = el; }}
                      type="text"
                      maxLength={1}
                      value={cell.letter}
                      onKeyDown={(e) => handleKeyDown(e, r, c)}
                      onChange={() => {}}
                      className="w-full h-full text-center text-lg font-bold uppercase bg-transparent outline-none cursor-pointer"
                      readOnly
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Clues */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-bold text-sm text-sand-500 uppercase tracking-wide mb-2">Across</h3>
            <div className="space-y-1">
              {puzzle.clues.filter(c => c.direction === 'across').map(clue => (
                <button
                  key={`across-${clue.num}`}
                  onClick={() => {
                    setSelectedCell(clue.start);
                    setDirection('across');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    activeClue?.num === clue.num && activeClue?.direction === 'across'
                      ? 'bg-violet-100 text-violet-700'
                      : solvedWords.has(`${clue.num}-across`)
                      ? 'bg-green-50 text-green-700 line-through'
                      : 'hover:bg-sand-50'
                  }`}
                >
                  <span className="font-bold mr-2">{clue.num}</span>
                  {clue.text}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm text-sand-500 uppercase tracking-wide mb-2">Down</h3>
            <div className="space-y-1">
              {puzzle.clues.filter(c => c.direction === 'down').map(clue => (
                <button
                  key={`down-${clue.num}`}
                  onClick={() => {
                    setSelectedCell(clue.start);
                    setDirection('down');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    activeClue?.num === clue.num && activeClue?.direction === 'down'
                      ? 'bg-violet-100 text-violet-700'
                      : solvedWords.has(`${clue.num}-down`)
                      ? 'bg-green-50 text-green-700 line-through'
                      : 'hover:bg-sand-50'
                  }`}
                >
                  <span className="font-bold mr-2">{clue.num}</span>
                  {clue.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-violet-50 border border-violet-200 rounded-xl p-6 mt-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-violet-500" />
              <h3 className="font-bold text-lg">Puzzle Solved!</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{hintsUsed}</p>
                <p className="text-sm text-sand-500">Hints Used</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{puzzle.clues.length}</p>
                <p className="text-sm text-sand-500">Words</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{hintsUsed === 0 ? 'Perfect!' : 'Great!'}</p>
                <p className="text-sm text-sand-500">Rating</p>
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
