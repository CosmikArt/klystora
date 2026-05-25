import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Check, Zap, Trophy, Clock, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const PUZZLES = [
  {
    initial: [
      [5,3,0,0,7,0,0,0,0],
      [6,0,0,1,9,5,0,0,0],
      [0,9,8,0,0,0,0,6,0],
      [8,0,0,0,6,0,0,0,3],
      [4,0,0,8,0,3,0,0,1],
      [7,0,0,0,2,0,0,0,6],
      [0,6,0,0,0,0,2,8,0],
      [0,0,0,4,1,9,0,0,5],
      [0,0,0,0,8,0,0,7,9]
    ],
    solution: [
      [5,3,4,6,7,8,9,1,2],
      [6,7,2,1,9,5,3,4,8],
      [1,9,8,3,4,2,5,6,7],
      [8,5,9,7,6,1,4,2,3],
      [4,2,6,8,5,3,7,9,1],
      [7,1,3,9,2,4,8,5,6],
      [9,6,1,5,3,7,2,8,4],
      [2,8,7,4,1,9,6,3,5],
      [3,4,5,2,8,6,1,7,9]
    ]
  },
  {
    initial: [
      [0,0,0,2,6,0,7,0,1],
      [6,8,0,0,7,0,0,9,0],
      [1,9,0,0,0,4,5,0,0],
      [8,2,0,1,0,0,0,4,0],
      [0,0,4,6,0,2,9,0,0],
      [0,5,0,0,0,3,0,2,8],
      [0,0,9,3,0,0,0,7,4],
      [0,4,0,0,5,0,0,3,6],
      [7,0,3,0,1,8,0,0,0]
    ],
    solution: [
      [4,3,5,2,6,9,7,8,1],
      [6,8,2,5,7,1,4,9,3],
      [1,9,7,8,3,4,5,6,2],
      [8,2,6,1,9,5,3,4,7],
      [3,7,4,6,8,2,9,1,5],
      [9,5,1,7,4,3,6,2,8],
      [5,1,9,3,2,6,8,7,4],
      [2,4,8,9,5,7,1,3,6],
      [7,6,3,4,1,8,2,5,9]
    ]
  }
];

export default function SudokuGame() {
  const { lang } = useLanguage();
  const [puzzleIndex] = useState(() => Math.floor(Math.random() * PUZZLES.length));
  const puzzle = PUZZLES[puzzleIndex];
  const [grid, setGrid] = useState(() => puzzle.initial.map(r => [...r]));
  const [selectedCell, setSelectedCell] = useState<{r: number, c: number} | null>(null);
  const [conflicts, setConflicts] = useState<Set<string>>(new Set());
  const [hints, setHints] = useState(3);
  const [startTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const checkConflicts = useCallback((g: number[][]) => {
    const newConflicts = new Set<string>();
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = g[r][c];
        if (!val) continue;
        // Check row
        for (let cc = 0; cc < 9; cc++) if (cc !== c && g[r][cc] === val) { newConflicts.add(`${r}-${c}`); newConflicts.add(`${r}-${cc}`); }
        // Check col
        for (let rr = 0; rr < 9; rr++) if (rr !== r && g[rr][c] === val) { newConflicts.add(`${r}-${c}`); newConflicts.add(`${rr}-${c}`); }
        // Check box
        const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
        for (let rr = br; rr < br + 3; rr++) for (let cc = bc; cc < bc + 3; cc++) if ((rr !== r || cc !== c) && g[rr][cc] === val) { newConflicts.add(`${r}-${c}`); newConflicts.add(`${rr}-${cc}`); }
      }
    }
    setConflicts(newConflicts);
  }, []);

  const handleNumber = (num: number) => {
    if (!selectedCell || isComplete) return;
    const { r, c } = selectedCell;
    if (puzzle.initial[r][c] !== 0) return; // Can't edit initial cells
    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = num;
    setGrid(newGrid);
    checkConflicts(newGrid);
    
    // Check complete
    if (newGrid.every((row, rr) => row.every((val, cc) => val === puzzle.solution[rr][cc]))) {
      setIsComplete(true);
    }
  };

  const handleHint = () => {
    if (hints <= 0 || !selectedCell || isComplete) return;
    const { r, c } = selectedCell;
    if (puzzle.initial[r][c] !== 0) return;
    if (grid[r][c] === puzzle.solution[r][c]) return;
    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = puzzle.solution[r][c];
    setGrid(newGrid);
    setHints(h => h - 1);
    checkConflicts(newGrid);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const isInitial = (r: number, c: number) => puzzle.initial[r][c] !== 0;

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-coal dark:text-white">Sudoku</h2>
          <p className="text-sm text-sand-500">{lang === 'es' ? 'Completa el grid' : 'Fill the grid'}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm text-sand-500">
            <Clock size={14} /> {formatTime(elapsed)}
          </div>
          <div className="flex items-center gap-1 text-sm text-amber-600">
            <Lightbulb size={14} /> {hints}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-9 gap-[1px] bg-sand-300 dark:bg-sand-700 p-[2px] rounded-xl mb-4">
        {grid.map((row, r) => row.map((cell, c) => {
          const isSel = selectedCell?.r === r && selectedCell?.c === c;
          const isConflict = conflicts.has(`${r}-${c}`);
          const isInit = isInitial(r, c);
          const thickRight = (c + 1) % 3 === 0 && c !== 8;
          const thickBottom = (r + 1) % 3 === 0 && r !== 8;
          
          return (
            <motion.button
              key={`${r}-${c}`}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedCell({ r, c })}
              className={`aspect-square flex items-center justify-center font-bold text-lg transition-all ${
                isSel ? 'bg-violet-200 dark:bg-violet-800 text-violet-700' :
                isConflict ? 'bg-rose-100 dark:bg-rose-900 text-rose-600' :
                isInit ? 'bg-sand-200 dark:bg-sand-800 text-coal dark:text-white' :
                'bg-white dark:bg-sand-900 text-violet-600'
              } ${thickRight ? 'border-r-2 border-r-sand-400 dark:border-r-sand-600' : ''} ${thickBottom ? 'border-b-2 border-b-sand-400 dark:border-b-sand-600' : ''}`}
            >
              {cell !== 0 ? cell : ''}
            </motion.button>
          );
        }))}
      </div>

      {/* Number pad */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {[1,2,3,4,5,6,7,8,9].map(n => (
          <motion.button
            key={n}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleNumber(n)}
            className="aspect-square rounded-xl bg-sand-100 dark:bg-sand-800 text-coal dark:text-white font-bold text-xl hover:bg-violet-100 dark:hover:bg-violet-900 hover:text-violet-600 transition-colors"
          >
            {n}
          </motion.button>
        ))}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => selectedCell && handleNumber(0)}
          className="aspect-square rounded-xl bg-rose-100 dark:bg-rose-900 text-rose-600 font-bold text-lg hover:bg-rose-200 transition-colors"
        >
          ✕
        </motion.button>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-3">
        <button onClick={handleHint} disabled={hints <= 0} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 dark:bg-amber-900 text-amber-700 hover:bg-amber-200 transition-colors font-medium disabled:opacity-50">
          <Zap size={16} /> {lang === 'es' ? 'Pista' : 'Hint'}
        </button>
        <button onClick={() => { setGrid(puzzle.initial.map(r => [...r])); setConflicts(new Set()); setIsComplete(false); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors font-medium">
          <RotateCcw size={16} /> {lang === 'es' ? 'Reiniciar' : 'Reset'}
        </button>
      </div>

      {/* Victory */}
      <AnimatePresence>
        {isComplete && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 text-center p-6 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl border-2 border-emerald-400">
            <Trophy size={40} className="mx-auto text-amber-500 mb-2" />
            <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{lang === 'es' ? '¡Resuelto!' : 'Solved!'}</p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">{formatTime(elapsed)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
