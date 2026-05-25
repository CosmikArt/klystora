import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Flag, Bomb, Trophy } from 'lucide-react';

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

const ROWS = 10;
const COLS = 10;
const MINES = 15;

function createBoard(): Cell[][] {
  const board: Cell[][] = Array(ROWS).fill(null).map(() =>
    Array(COLS).fill(null).map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0,
    }))
  );

  // Place mines
  let minesPlaced = 0;
  while (minesPlaced < MINES) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }

  // Calculate neighbor mines
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].isMine) {
            count++;
          }
        }
      }
      board[r][c].neighborMines = count;
    }
  }

  return board;
}

export default function MinesweeperGame() {
  const [board, setBoard] = useState<Cell[][]>(createBoard);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [flagsLeft, setFlagsLeft] = useState(MINES);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || gameOver || won) return;
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isPlaying, gameOver, won]);

  const revealCell = useCallback((row: number, col: number) => {
    if (gameOver || won) return;
    
    setBoard(prev => {
      const newBoard = prev.map(r => r.map(c => ({ ...c })));
      
      if (newBoard[row][col].isFlagged || newBoard[row][col].isRevealed) {
        return prev;
      }

      if (!isPlaying) setIsPlaying(true);

      const reveal = (r: number, c: number) => {
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
        if (newBoard[r][c].isRevealed || newBoard[r][c].isFlagged) return;
        
        newBoard[r][c].isRevealed = true;
        
        if (newBoard[r][c].neighborMines === 0 && !newBoard[r][c].isMine) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              reveal(r + dr, c + dc);
            }
          }
        }
      };

      if (newBoard[row][col].isMine) {
        newBoard[row][col].isRevealed = true;
        setGameOver(true);
        // Reveal all mines
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            if (newBoard[r][c].isMine) newBoard[r][c].isRevealed = true;
          }
        }
      } else {
        reveal(row, col);
        
        // Check win
        const revealedCount = newBoard.flat().filter(c => c.isRevealed).length;
        if (revealedCount === ROWS * COLS - MINES) {
          setWon(true);
        }
      }

      return newBoard;
    });
  }, [gameOver, won, isPlaying]);

  const toggleFlag = useCallback((e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameOver || won) return;
    
    setBoard(prev => {
      const newBoard = prev.map(r => r.map(c => ({ ...c })));
      if (newBoard[row][col].isRevealed) return prev;
      
      if (newBoard[row][col].isFlagged) {
        newBoard[row][col].isFlagged = false;
        setFlagsLeft(f => f + 1);
      } else if (flagsLeft > 0) {
        newBoard[row][col].isFlagged = true;
        setFlagsLeft(f => f - 1);
      }
      
      return newBoard;
    });
  }, [gameOver, won, flagsLeft]);

  const reset = () => {
    setBoard(createBoard());
    setGameOver(false);
    setWon(false);
    setFlagsLeft(MINES);
    setTimer(0);
    setIsPlaying(false);
  };

  const getCellContent = (cell: Cell) => {
    if (cell.isFlagged) return <Flag className="w-4 h-4 text-red-500" />;
    if (!cell.isRevealed) return null;
    if (cell.isMine) return <Bomb className="w-4 h-4 text-coal" />;
    if (cell.neighborMines > 0) {
      const colors = ['text-blue-500', 'text-green-500', 'text-red-500', 'text-purple-500', 'text-orange-500', 'text-teal-500', 'text-coal', 'text-sand-500'];
      return <span className={`font-bold ${colors[cell.neighborMines - 1]}`}>{cell.neighborMines}</span>;
    }
    return null;
  };

  const getCellStyle = (cell: Cell) => {
    if (cell.isRevealed) {
      if (cell.isMine) return 'bg-red-400';
      return 'bg-sand-100';
    }
    return 'bg-sand-300 hover:bg-sand-250 cursor-pointer';
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <div className="bg-sand-200 px-3 py-2 rounded-lg flex items-center gap-2">
            <Flag className="w-4 h-4 text-red-500" />
            <span className="font-bold">{flagsLeft}</span>
          </div>
          <div className="bg-sand-200 px-3 py-2 rounded-lg font-mono">
            {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
          </div>
        </div>
        <button
          onClick={reset}
          className="p-2 text-sand-500 hover:text-violet-500 transition"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Board */}
      <div className="inline-block bg-sand-400 p-2 rounded-lg">
        <div className="grid grid-cols-10 gap-0.5">
          {board.map((row, r) =>
            row.map((cell, c) => (
              <motion.button
                key={`${r}-${c}`}
                whileTap={{ scale: 0.9 }}
                onClick={() => revealCell(r, c)}
                onContextMenu={(e) => toggleFlag(e, r, c)}
                className={`w-8 h-8 flex items-center justify-center rounded text-sm ${getCellStyle(cell)}`}
              >
                {getCellContent(cell)}
              </motion.button>
            ))
          )}
        </div>
      </div>

      {/* Game Over / Win */}
      <AnimatePresence>
        {(gameOver || won) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center"
          >
            {won ? (
              <>
                <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-green-500">You Win! 🎉</h3>
              </>
            ) : (
              <>
                <Bomb className="w-10 h-10 text-red-500 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-red-500">Game Over!</h3>
              </>
            )}
            <p className="text-sand-500 mt-1">Time: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>
            <button
              onClick={reset}
              className="mt-3 bg-violet-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-violet-600 transition"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-sand-500 text-sm mt-4">Left click to reveal • Right click to flag</p>
    </div>
  );
}
