import { useState, useCallback, useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Tile {
  id: number;
  value: number;
  row: number;
  col: number;
  isNew?: boolean;
  isMerged?: boolean;
}

let nextId = 1;

function createTile(value: number, row: number, col: number): Tile {
  return { id: nextId++, value, row, col, isNew: true };
}

function getInitialTiles(): Tile[] {
  const tiles: Tile[] = [];
  const positions = [
    [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)],
    [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)],
  ];
  while (positions[0][0] === positions[1][0] && positions[0][1] === positions[1][1]) {
    positions[1] = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
  }
  tiles.push(createTile(Math.random() < 0.9 ? 2 : 4, positions[0][0], positions[0][1]));
  tiles.push(createTile(Math.random() < 0.9 ? 2 : 4, positions[1][0], positions[1][1]));
  return tiles;
}

export default function Game2048() {
  const { trackGameComplete } = useAnalytics();
  const { t } = useLanguage();
  const [tiles, setTiles] = useState<Tile[]>(getInitialTiles);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('2048-best') || '0');
    }
    return 0;
  });
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const getTileColor = (value: number) => {
    const colors: Record<number, string> = {
      2: 'bg-sand-200 text-coal',
      4: 'bg-sand-300 text-coal',
      8: 'bg-orange-200 text-white',
      16: 'bg-orange-300 text-white',
      32: 'bg-orange-400 text-white',
      64: 'bg-orange-500 text-white',
      128: 'bg-yellow-300 text-white',
      256: 'bg-yellow-400 text-white',
      512: 'bg-yellow-500 text-white',
      1024: 'bg-violet-400 text-white',
      2048: 'bg-violet-500 text-white',
    };
    return colors[value] || 'bg-violet-600 text-white';
  };

  const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    setTiles(prevTiles => {
      const grid: (Tile | null)[][] = Array(4).fill(null).map(() => Array(4).fill(null));
      prevTiles.forEach(tile => {
        grid[tile.row][tile.col] = { ...tile, isNew: false, isMerged: false };
      });

      let moved = false;
      let newScore = 0;
      const newTiles: Tile[] = [];

      const traverse = (row: number, col: number) => {
        const tile = grid[row][col];
        if (!tile) return;

        let newRow = row;
        let newCol = col;

        while (true) {
          let nextRow = newRow;
          let nextCol = newCol;

          if (direction === 'up') nextRow--;
          else if (direction === 'down') nextRow++;
          else if (direction === 'left') nextCol--;
          else if (direction === 'right') nextCol++;

          if (nextRow < 0 || nextRow >= 4 || nextCol < 0 || nextCol >= 4) break;
          if (grid[nextRow][nextCol]) {
            if (grid[nextRow][nextCol]!.value === tile.value && !grid[nextRow][nextCol]!.isMerged) {
              grid[nextRow][nextCol]!.value *= 2;
              grid[nextRow][nextCol]!.isMerged = true;
              newScore += grid[nextRow][nextCol]!.value;
              grid[row][col] = null;
              moved = true;
            }
            break;
          }

          grid[newRow][newCol] = null;
          newRow = nextRow;
          newCol = nextCol;
          grid[newRow][newCol] = tile;
          moved = true;
        }
      };

      if (direction === 'up' || direction === 'left') {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            traverse(i, j);
          }
        }
      } else {
        for (let i = 3; i >= 0; i--) {
          for (let j = 3; j >= 0; j--) {
            traverse(i, j);
          }
        }
      }

      if (!moved) return prevTiles;

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (grid[i][j]) newTiles.push(grid[i][j]!);
        }
      }

      // Add new tile
      const emptyCells: [number, number][] = [];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (!grid[i][j]) emptyCells.push([i, j]);
        }
      }

      if (emptyCells.length > 0) {
        const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        newTiles.push(createTile(Math.random() < 0.9 ? 2 : 4, row, col));
      }

      setScore(s => {
        const newTotal = s + newScore;
        if (newTotal > bestScore) {
          setBestScore(newTotal);
          localStorage.setItem('2048-best', String(newTotal));
        }
        return newTotal;
      });

      // Check win
      if (!won && newTiles.some(t => t.value >= 2048)) {
        setWon(true);
        trackGameComplete('2048', score, true);
      }

      // Check game over
      if (emptyCells.length <= 1) {
        const hasMoves = newTiles.some(tile => {
          const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
          return dirs.some(([dr, dc]) => {
            const nr = tile.row + dr;
            const nc = tile.col + dc;
            const neighbor = newTiles.find(t => t.row === nr && t.col === nc);
            return neighbor && neighbor.value === tile.value;
          });
        });
        if (!hasMoves && emptyCells.length === 0) {
          setGameOver(true);
          trackGameComplete('2048', score, false);
        }
      }

      return newTiles;
    });
  }, [bestScore, won]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      switch (e.key) {
        case 'ArrowUp': e.preventDefault(); move('up'); break;
        case 'ArrowDown': e.preventDefault(); move('down'); break;
        case 'ArrowLeft': e.preventDefault(); move('left'); break;
        case 'ArrowRight': e.preventDefault(); move('right'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move, gameOver]);

  const reset = () => {
    nextId = 1;
    setTiles(getInitialTiles());
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <div className="bg-sand-200 px-4 py-2 rounded-lg text-center">
            <div className="text-xs text-sand-500 uppercase">Score</div>
            <div className="text-xl font-bold text-coal">{score}</div>
          </div>
          <div className="bg-sand-200 px-4 py-2 rounded-lg text-center">
            <div className="text-xs text-sand-500 uppercase">Best</div>
            <div className="text-xl font-bold text-coal">{bestScore}</div>
          </div>
        </div>
        <button
          onClick={reset}
          className="p-2 text-sand-500 hover:text-violet-500 transition"
          title="New Game"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Game Board */}
      <div className="relative bg-sand-300 rounded-xl p-3 aspect-square">
        <div className="grid grid-cols-4 gap-3 h-full">
          {/* Background cells */}
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="bg-sand-400/50 rounded-lg" />
          ))}
        </div>

        {/* Tiles */}
        <div className="absolute inset-3">
          <AnimatePresence>
            {tiles.map(tile => (
              <motion.div
                key={tile.id}
                initial={tile.isNew ? { scale: 0 } : false}
                animate={{
                  scale: 1,
                  x: tile.col * 25 + '%',
                  y: tile.row * 25 + '%',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`absolute w-1/4 h-1/4 p-1.5`}
              >
                <div className={`w-full h-full rounded-lg flex items-center justify-center text-2xl font-bold ${getTileColor(tile.value)}`}>
                  {tile.value}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Game Over Overlay */}
        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-coal/70 rounded-xl flex flex-col items-center justify-center gap-4"
          >
            <Trophy className="w-12 h-12 text-yellow-400" />
            <h3 className="text-2xl font-bold text-white">Game Over!</h3>
            <p className="text-white/80">Score: {score}</p>
            <button
              onClick={reset}
              className="bg-violet-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-violet-600 transition"
            >
              Play Again
            </button>
          </motion.div>
        )}

        {/* Win Overlay */}
        {won && !gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-violet-500/70 rounded-xl flex flex-col items-center justify-center gap-4"
          >
            <Trophy className="w-12 h-12 text-yellow-300" />
            <h3 className="text-2xl font-bold text-white">You Win! 🎉</h3>
            <p className="text-white/80">Keep going for higher score!</p>
            <button
              onClick={() => setWon(false)}
              className="bg-white text-violet-500 px-6 py-2 rounded-lg font-medium hover:bg-sand-100 transition"
            >
              Continue
            </button>
          </motion.div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        <button onClick={() => move('up')} className="p-3 bg-sand-200 rounded-lg active:bg-violet-200"><ArrowUp className="w-5 h-5" /></button>
        <button onClick={() => move('left')} className="p-3 bg-sand-200 rounded-lg active:bg-violet-200"><ArrowLeft className="w-5 h-5" /></button>
        <button onClick={() => move('down')} className="p-3 bg-sand-200 rounded-lg active:bg-violet-200"><ArrowDown className="w-5 h-5" /></button>
        <button onClick={() => move('right')} className="p-3 bg-sand-200 rounded-lg active:bg-violet-200"><ArrowRight className="w-5 h-5" /></button>
      </div>

      <p className="text-center text-sand-500 text-sm mt-4">Use arrow keys or swipe to move tiles</p>
    </div>
  );
}
