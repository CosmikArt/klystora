import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Flame, BarChart3, Share2, CircleHelp, ChevronUp } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { useLanguage } from '@/hooks/useLanguage';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getDailyWord, isValidWord, getDateKey, getNextMidnight, formatTimeRemaining } from '@/lib/wordList';
import GameGrid from './GameGrid';
import type { Tile, TileState } from './GameGrid';
import VirtualKeyboard from './VirtualKeyboard';
import type { KeyState } from './VirtualKeyboard';
import ShareModal from './ShareModal';
import StatsPanel from './StatsPanel';
import type { GameStats } from './StatsPanel';

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const txGame = {
  en: {
    howToPlay: 'How to Play',
    howToPlayDesc: 'Guess the 5-letter word in 6 tries.',
    rule1: 'Each guess must be a valid 5-letter word.',
    rule2Green: 'Green',
    rule2: 'means the letter is correct and in the right position.',
    rule3Yellow: 'Yellow',
    rule3: 'means the letter is in the word but in the wrong position.',
    rule4Gray: 'Gray',
    rule4: 'means the letter is not in the word.',
    examples: 'Examples',
    exampleCorrect: 'W is correct and in the right spot.',
    examplePartial: 'I is in the word but in the wrong spot.',
    exampleWrong: 'U is not in the word.',
    notEnoughLetters: 'Not enough letters',
    notInWordList: 'Not in word list',
    youWin: 'Excellent!',
    youLose: (word: string) => `The word was ${word}`,
    nextWordIn: 'Next word in',
    playAgain: 'Play Again',
  },
  es: {
    howToPlay: 'Como Jugar',
    howToPlayDesc: 'Adivina la palabra de 5 letras en 6 intentos.',
    rule1: 'Cada intento debe ser una palabra valida de 5 letras.',
    rule2Green: 'Verde',
    rule2: 'significa que la letra es correcta y esta en la posicion correcta.',
    rule3Yellow: 'Amarillo',
    rule3: 'significa que la letra esta en la palabra pero en la posicion incorrecta.',
    rule4Gray: 'Gris',
    rule4: 'significa que la letra no esta en la palabra.',
    examples: 'Ejemplos',
    exampleCorrect: 'W es correcta y esta en el lugar correcto.',
    examplePartial: 'I esta en la palabra pero en el lugar incorrecto.',
    exampleWrong: 'U no esta en la palabra.',
    notEnoughLetters: 'No hay suficientes letras',
    notInWordList: 'No esta en la lista de palabras',
    youWin: 'Excelente!',
    youLose: (word: string) => `La palabra era ${word}`,
    nextWordIn: 'Siguiente palabra en',
    playAgain: 'Jugar de Nuevo',
  },
};

function getEmptyRow(): Tile[] {
  return Array.from({ length: WORD_LENGTH }, () => ({
    letter: '',
    state: 'empty' as TileState,
    evaluating: false,
    shake: false,
    pop: false,
  }));
}

function getEmptyGrid(): Tile[][] {
  return Array.from({ length: MAX_ATTEMPTS }, () => getEmptyRow());
}

// Load/save stats from localStorage
function loadStats(): GameStats {
  try {
    const raw = localStorage.getItem('klystora-dailyword-stats');
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {
    played: 0,
    won: 0,
    lost: 0,
    winPercent: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0],
  };
}

function saveStats(stats: GameStats) {
  localStorage.setItem('klystora-dailyword-stats', JSON.stringify(stats));
}

// Load/save game state from localStorage
interface SavedGameState {
  grid: Tile[][];
  currentRow: number;
  currentCol: number;
  gameState: 'playing' | 'won' | 'lost';
  keyStates: Record<string, KeyState>;
  dateKey: string;
}

function loadGameState(): SavedGameState | null {
  try {
    const raw = localStorage.getItem('klystora-dailyword-state');
    if (raw) {
      const state = JSON.parse(raw) as SavedGameState;
      if (state.dateKey === getDateKey()) return state;
    }
  } catch { /* ignore */ }
  return null;
}

function saveGameState(state: SavedGameState) {
  localStorage.setItem('klystora-dailyword-state', JSON.stringify(state));
}

export default function DailyWordGame() {
  const { lang, t: tBase } = useLanguage();
  const tg = txGame[lang as Lang];

  const targetWord = useMemo(() => getDailyWord(), []);
  const dayNumber = useMemo(() => {
    const start = new Date(2025, 0, 1);
    const now = new Date();
    return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  }, []);

  const [grid, setGrid] = useState<Tile[][]>(getEmptyGrid);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [keyStates, setKeyStates] = useState<Record<string, KeyState>>({});
  const [message, setMessage] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState<GameStats>(loadStats);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [alreadyPlayedToday, setAlreadyPlayedToday] = useState(false);
  const { trackGameComplete } = useAnalytics();

  const shakeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const messageTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show message helper
  const showMessage = useCallback((msg: string, duration = 2000) => {
    if (messageTimeout.current) clearTimeout(messageTimeout.current);
    setMessage(msg);
    messageTimeout.current = setTimeout(() => setMessage(''), duration);
  }, []);

  // Countdown timer
  useEffect(() => {
    const update = () => {
      const next = getNextMidnight();
      const diff = next.getTime() - Date.now();
      setTimeRemaining(formatTimeRemaining(Math.max(0, diff)));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load saved state on mount
  useEffect(() => {
    const saved = loadGameState();
    if (saved && saved.dateKey === getDateKey()) {
      setGrid(saved.grid);
      setCurrentRow(saved.currentRow);
      setCurrentCol(saved.currentCol);
      setGameState(saved.gameState);
      setKeyStates(saved.keyStates);
      if (saved.gameState !== 'playing') {
        setAlreadyPlayedToday(true);
      }
    }
  }, []);

  // Save game state on changes
  useEffect(() => {
    if (gameState !== 'playing' || currentRow > 0 || currentCol > 0) {
      saveGameState({
        grid,
        currentRow,
        currentCol,
        gameState,
        keyStates,
        dateKey: getDateKey(),
      });
    }
  }, [grid, currentRow, currentCol, gameState, keyStates]);

  // Evaluate the current guess
  const evaluateGuess = useCallback(() => {
    if (currentCol < WORD_LENGTH) {
      showMessage(tg.notEnoughLetters);
      return;
    }

    const guess = grid[currentRow].map(t => t.letter).join('');

    if (!isValidWord(guess)) {
      // Shake animation
      setGrid(prev => {
        const next = prev.map(r => r.map(t => ({ ...t })));
        next[currentRow].forEach(t => { t.shake = true; });
        return next;
      });
      if (shakeTimeout.current) clearTimeout(shakeTimeout.current);
      shakeTimeout.current = setTimeout(() => {
        setGrid(prev => {
          const next = prev.map(r => r.map(t => ({ ...t })));
          next[currentRow].forEach(t => { t.shake = false; });
          return next;
        });
      }, 400);
      showMessage(tg.notInWordList);
      return;
    }

    // Evaluate each tile
    const targetLetters = targetWord.split('');
    const guessLetters = guess.split('');
    const newStates: TileState[] = new Array(WORD_LENGTH).fill('wrong');
    const targetUsed = new Array(WORD_LENGTH).fill(false);

    // First pass: correct position
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        newStates[i] = 'correct';
        targetUsed[i] = true;
      }
    }

    // Second pass: partial matches
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (newStates[i] === 'correct') continue;
      for (let j = 0; j < WORD_LENGTH; j++) {
        if (!targetUsed[j] && guessLetters[i] === targetLetters[j]) {
          newStates[i] = 'partial';
          targetUsed[j] = true;
          break;
        }
      }
    }

    // Animate tile flips with staggered timing
    setGrid(prev => {
      const next = prev.map(r => r.map(t => ({ ...t })));
      next[currentRow].forEach((_, i) => {
        // Start flip
        setTimeout(() => {
          setGrid(p => {
            const n = p.map(r => r.map(c => ({ ...c })));
            n[currentRow][i].evaluating = true;
            return n;
          });
        }, i * 100);

        // End flip, set color
        setTimeout(() => {
          setGrid(p => {
            const n = p.map(r => r.map(c => ({ ...c })));
            n[currentRow][i].state = newStates[i];
            n[currentRow][i].evaluating = false;
            return n;
          });
        }, 300 + i * 100);
      });
      return next;
    });

    // Update keyboard states
    setKeyStates(prev => {
      const next = { ...prev };
      guessLetters.forEach((letter, i) => {
        const current = next[letter] || 'default';
        if (newStates[i] === 'correct') {
          next[letter] = 'correct';
        } else if (newStates[i] === 'partial' && current !== 'correct') {
          next[letter] = 'partial';
        } else if (newStates[i] === 'wrong' && current === 'default') {
          next[letter] = 'wrong';
        }
      });
      return next;
    });

    // Check win/lose (after animation completes)
    const allCorrect = newStates.every(s => s === 'correct');
    const isLastRow = currentRow === MAX_ATTEMPTS - 1;

    setTimeout(() => {
      if (allCorrect) {
        setGameState('won');
        setAlreadyPlayedToday(true);
        showMessage(tg.youWin);
        trackGameComplete('daily-word', currentRow + 1, true);
        // Confetti!
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF6B3D', '#6845BC', '#4A8B5B', '#D9A93E'],
        });

        // Update stats
        setStats(prev => {
          const newDist = [...prev.guessDistribution];
          newDist[currentRow] = newDist[currentRow] + 1;
          const newPlayed = prev.played + 1;
          const newWon = prev.won + 1;
          const newStreak = prev.currentStreak + 1;
          const newStats: GameStats = {
            played: newPlayed,
            won: newWon,
            lost: prev.lost,
            winPercent: Math.round((newWon / newPlayed) * 100),
            currentStreak: newStreak,
            maxStreak: Math.max(prev.maxStreak, newStreak),
            guessDistribution: newDist,
          };
          saveStats(newStats);
          return newStats;
        });

        // Show share modal after delay
        setTimeout(() => setShowShare(true), 1200);
      } else if (isLastRow) {
        setGameState('lost');
        setAlreadyPlayedToday(true);
        showMessage(tg.youLose(targetWord));
        trackGameComplete('daily-word', 0, false);

        // Update stats
        setStats(prev => {
          const newPlayed = prev.played + 1;
          const newStats: GameStats = {
            played: newPlayed,
            won: prev.won,
            lost: prev.lost + 1,
            winPercent: Math.round((prev.won / newPlayed) * 100),
            currentStreak: 0,
            maxStreak: prev.maxStreak,
            guessDistribution: prev.guessDistribution,
          };
          saveStats(newStats);
          return newStats;
        });

        // Show stats modal after delay
        setTimeout(() => setShowStats(true), 1200);
      } else {
        setCurrentRow(r => r + 1);
        setCurrentCol(0);
      }
    }, 900);
  }, [currentRow, currentCol, grid, targetWord, tg, showMessage]);

  // Handle key press
  const handleKey = useCallback((key: string) => {
    if (gameState !== 'playing') return;
    if (alreadyPlayedToday) return;

    if (key === 'ENTER') {
      evaluateGuess();
    } else if (key === 'BACKSPACE') {
      if (currentCol > 0) {
        setGrid(prev => {
          const next = prev.map(r => r.map(t => ({ ...t })));
          next[currentRow][currentCol - 1] = {
            ...next[currentRow][currentCol - 1],
            letter: '',
            state: 'empty',
          };
          return next;
        });
        setCurrentCol(c => c - 1);
      }
    } else if (key.length === 1 && currentCol < WORD_LENGTH) {
      setGrid(prev => {
        const next = prev.map(r => r.map(t => ({ ...t })));
        next[currentRow][currentCol] = {
          ...next[currentRow][currentCol],
          letter: key,
          state: 'filled',
          pop: true,
        };
        return next;
      });

      // Clear pop after animation
      const timeoutId = setTimeout(() => {
        setGrid(prev => {
          const next = prev.map(r => r.map(t => ({ ...t })));
          next[currentRow][currentCol] = {
            ...next[currentRow][currentCol],
            pop: false,
          };
          return next;
        });
      }, 150);
      popTimeouts.current.push(timeoutId);

      setCurrentCol(c => c + 1);
    }
  }, [gameState, alreadyPlayedToday, currentRow, currentCol, evaluateGuess]);

  // Physical keyboard listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing' || alreadyPlayedToday) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        handleKey('ENTER');
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleKey('BACKSPACE');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        handleKey(e.key.toUpperCase());
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey, gameState, alreadyPlayedToday]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (shakeTimeout.current) clearTimeout(shakeTimeout.current);
      popTimeouts.current.forEach(clearTimeout);
      if (messageTimeout.current) clearTimeout(messageTimeout.current);
    };
  }, []);

  const handleReset = useCallback(() => {
    setGrid(getEmptyGrid());
    setCurrentRow(0);
    setCurrentCol(0);
    setGameState('playing');
    setKeyStates({});
    setAlreadyPlayedToday(false);
    setMessage('');
    localStorage.removeItem('klystora-dailyword-state');
  }, []);

  const formattedDate = new Date().toLocaleDateString(
    lang === 'es' ? 'es-ES' : 'en-US',
    { month: 'short', day: 'numeric', year: 'numeric' }
  );

  return (
    <div className="w-full max-w-[520px] mx-auto flex flex-col items-center">
      {/* Header bar */}
      <div className="w-full flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-display-sm text-[#1A1714] dark:text-[#F0EDE8]">
            {tBase('dailyWordGame')}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1.5 text-caption text-[#6B6560] dark:text-[#7A748C] mr-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{formattedDate}</span>
          </div>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-2 rounded-[10px] text-[#6B6560] dark:text-[#7A748C] hover:bg-[#F0EDE6] dark:hover:bg-[#282636] transition-colors"
            title={tg.howToPlay}
          >
            <CircleHelp size={20} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setShowStats(true)}
            className="p-2 rounded-[10px] text-[#6B6560] dark:text-[#7A748C] hover:bg-[#F0EDE6] dark:hover:bg-[#282636] transition-colors"
            title="Stats"
          >
            <BarChart3 size={20} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="p-2 rounded-[10px] text-[#6B6560] dark:text-[#7A748C] hover:bg-[#F0EDE6] dark:hover:bg-[#282636] transition-colors"
            title="Share"
          >
            <Share2 size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* How to Play - Collapsible */}
      {showHelp && (
        <div className="w-full mb-4 p-4 bg-[#FAF8F3] dark:bg-[#1E1C26] border border-[#E2DED4] dark:border-[#3A3750] rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-heading-sm text-[#1A1714] dark:text-[#F0EDE8]">{tg.howToPlay}</h3>
            <button
              onClick={() => setShowHelp(false)}
              className="p-1 rounded-lg text-[#6B6560] dark:text-[#7A748C] hover:bg-[#F0EDE6] dark:hover:bg-[#282636] transition-colors"
            >
              <ChevronUp size={16} />
            </button>
          </div>
          <p className="text-body-sm text-[#6B6560] dark:text-[#A8A2B5] mb-3">{tg.howToPlayDesc}</p>
          <ul className="space-y-1.5 text-body-sm text-[#1A1714] dark:text-[#F0EDE8] mb-4">
            <li>{tg.rule1}</li>
            <li>
              <span className="font-semibold text-[#4A8B5B]">{tg.rule2Green}</span>{' '}
              {tg.rule2}
            </li>
            <li>
              <span className="font-semibold text-[#D9A93E]">{tg.rule3Yellow}</span>{' '}
              {tg.rule3}
            </li>
            <li>
              <span className="font-semibold text-[#7A7268]">{tg.rule4Gray}</span>{' '}
              {tg.rule4}
            </li>
          </ul>

          {/* Example tiles */}
          <p className="text-caption font-medium text-[#6B6560] dark:text-[#A8A2B5] mb-2 uppercase tracking-wide">{tg.examples}</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {['W', 'E', 'A', 'R', 'Y'].map((l, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-bold text-white ${
                      i === 0 ? 'bg-[#4A8B5B]' : 'bg-[#7A7268]'
                    }`}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <span className="text-body-sm text-[#6B6560] dark:text-[#A8A2B5]">{tg.exampleCorrect}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {['P', 'I', 'L', 'L', 'S'].map((l, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-bold text-white ${
                      i === 1 ? 'bg-[#D9A93E]' : 'bg-[#7A7268]'
                    }`}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <span className="text-body-sm text-[#6B6560] dark:text-[#A8A2B5]">{tg.examplePartial}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {['V', 'A', 'G', 'U', 'E'].map((l, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-bold text-white ${
                      i === 3 ? 'bg-[#7A7268]' : i === 0 || i === 1 || i === 2 || i === 4 ? 'bg-[#4A8B5B]' : ''
                    }`}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <span className="text-body-sm text-[#6B6560] dark:text-[#A8A2B5]">{tg.exampleWrong}</span>
            </div>
          </div>
        </div>
      )}

      {/* Game grid */}
      <div className="mb-4">
        <GameGrid grid={grid} currentRow={currentRow} />
      </div>

      {/* Message / toast */}
      {message && (
        <div className="mb-3 px-4 py-2.5 bg-[#1A1714] dark:bg-[#282636] text-white rounded-[10px] text-sm font-medium text-center animate-[fade-slide-up_0.25s_ease-out]">
          {message}
        </div>
      )}

      {/* Post-game info */}
      {gameState !== 'playing' && (
        <div className="flex flex-col items-center gap-2 mb-4 animate-[fade-slide-up_0.5s_ease-out]">
          {gameState === 'won' && (
            <div className="flex items-center gap-1.5 text-[#FF6B3D]">
              <Flame size={18} />
              <span className="text-stat-number text-lg">{stats.currentStreak}</span>
            </div>
          )}
          <p className="text-body-sm text-[#6B6560] dark:text-[#A8A2B5]">
            {tg.nextWordIn}: <span className="font-mono font-semibold text-[#1A1714] dark:text-[#F0EDE8]">{timeRemaining}</span>
          </p>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => setShowShare(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-sm font-semibold text-white bg-[#6845BC] hover:bg-[#5437A0] active:scale-[0.98] transition-all duration-200"
            >
              <Share2 size={14} />
              {tBase('share')}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-sm font-medium border-[1.5px] border-[#6845BC] text-[#6845BC] hover:bg-[#F3F0FA] dark:hover:bg-[#2E1E5C]/30 transition-all"
            >
              {tg.playAgain}
            </button>
          </div>
        </div>
      )}

      {/* Virtual keyboard */}
      <div className="w-full">
        <VirtualKeyboard
          keyStates={keyStates}
          onKeyPress={handleKey}
          disabled={gameState !== 'playing' || alreadyPlayedToday}
        />
      </div>

      {/* Modals */}
      {showShare && (
        <ShareModal
          isOpen={showShare}
          onClose={() => setShowShare(false)}
          grid={grid.map(row => row.map(t => ({ letter: t.letter, state: t.state })))}
          gameWon={gameState === 'won'}
          guessCount={currentRow + (gameState === 'won' ? 1 : 0)}
          maxAttempts={MAX_ATTEMPTS}
          dayNumber={dayNumber}
          streak={stats.currentStreak}
          maxStreak={stats.maxStreak}
          winPercent={stats.winPercent}
          lang={lang as Lang}
        />
      )}

      {showStats && (
        <StatsPanel
          isOpen={showStats}
          onClose={() => setShowStats(false)}
          stats={stats}
          currentGuessCount={gameState === 'won' ? currentRow + 1 : 0}
          lang={lang as Lang}
        />
      )}
    </div>
  );
}
