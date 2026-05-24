import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, RotateCcw, Check, X, CircleHelp, Clock } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { Category } from './connectionsData';
import { getPuzzle, getDailyPuzzleIndex } from './connectionsData';
import confetti from 'canvas-confetti';

interface GameStats {
  groupsFound: number;
  mistakes: number;
  time: number;
  score: number;
  completed: boolean;
}

interface SolvedCategory {
  category: Category;
  words: string[];
}

export default function ConnectionsGame() {
  const { lang, t } = useLanguage();
  const [puzzleIndex] = useState(getDailyPuzzleIndex);
  const puzzle = getPuzzle(lang, puzzleIndex);
  const [words, setWords] = useState<string[]>(() => {
    const allWords = puzzle.categories.flatMap((c) => c.words);
    return shuffleArray([...allWords]);
  });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [solved, setSolved] = useState<SolvedCategory[]>([]);
  const [mistakes, setMistakes] = useState(4);
  const [shakeWords, setShakeWords] = useState<Set<string>>(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [stats, setStats] = useState<GameStats>({ groupsFound: 0, mistakes: 0, time: 0, score: 0, completed: false });
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [, setCategoryRevealing] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (!gameOver && !gameWon) {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameOver, gameWon, startTime]);

  const shuffleWords = useCallback(() => {
    setWords((prev) => shuffleArray([...prev]));
    setSelected(new Set());
  }, []);

  const deselectAll = useCallback(() => {
    setSelected(new Set());
  }, []);

  const toggleWord = useCallback((word: string) => {
    if (gameOver || gameWon) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(word)) {
        next.delete(word);
      } else if (next.size < 4) {
        next.add(word);
      }
      return next;
    });
  }, [gameOver, gameWon]);

  const submitGuess = useCallback(() => {
    if (selected.size !== 4) return;
    const selectedArr = Array.from(selected);

    // Check if all 4 belong to the same category
    for (const cat of puzzle.categories) {
      if (selectedArr.every((w) => cat.words.includes(w))) {
        // Found a correct group!
        setCategoryRevealing(solved.length);
        setSolved((prev) => [...prev, { category: cat, words: selectedArr }]);
        setWords((prev) => prev.filter((w) => !selected.has(w)));
        setSelected(new Set());
        setStats((s) => ({
          ...s,
          groupsFound: s.groupsFound + 1,
          score: s.score + (mistakes * 25) + 100,
        }));

        // Check win condition
        setTimeout(() => {
          setCategoryRevealing(null);
          if (solved.length + 1 === 4) {
            setGameWon(true);
            const time = Math.floor((Date.now() - startTime) / 1000);
            setStats((s) => ({ ...s, time, completed: true, score: s.score + Math.max(0, 300 - time) }));
            confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors: ['#FF6B3D', '#6845BC', '#4A8B5B', '#D9A93E'] });
            setTimeout(() => setShowStats(true), 600);
          }
        }, 800);
        return;
      }
    }

    // Wrong guess
    setMistakes((m) => m - 1);
    setStats((s) => ({ ...s, mistakes: s.mistakes + 1 }));
    setShakeWords(new Set(selected));
    setTimeout(() => setShakeWords(new Set()), 400);

    if (mistakes <= 1) {
      // Game over
      setGameOver(true);
      const time = Math.floor((Date.now() - startTime) / 1000);
      setStats((s) => ({ ...s, time, completed: true }));
      // Reveal remaining categories
      const remaining = puzzle.categories.filter(
        (c) => !solved.some((s) => s.category.name === c.name)
      );
      const newSolved = remaining.map((c) => ({ category: c, words: c.words }));
      setSolved((prev) => [...prev, ...newSolved]);
      setWords([]);
      setTimeout(() => setShowStats(true), 600);
    }
  }, [selected, puzzle.categories, solved, mistakes, startTime]);

  const resetGame = useCallback(() => {
    const p = getPuzzle(lang, puzzleIndex + 1);
    const allWords = p.categories.flatMap((c) => c.words);
    setWords(shuffleArray([...allWords]));
    setSelected(new Set());
    setSolved([]);
    setMistakes(4);
    setShakeWords(new Set());
    setGameOver(false);
    setGameWon(false);
    setStats({ groupsFound: 0, mistakes: 0, time: 0, score: 0, completed: false });
    setShowStats(false);
  }, [lang, puzzleIndex]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const categoryColors = ['bg-sage-500', 'bg-mustard-500', 'bg-violet-500', 'bg-sunset-500'];

  return (
    <div className="w-full max-w-[520px] mx-auto">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-display-sm text-ink-900 dark:text-dark-text">
          {t('connections')}
        </h2>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="p-2 rounded-[10px] bg-sand-200 dark:bg-dark-elevated text-ink-700 dark:text-dark-text-secondary hover:bg-sand-300 dark:hover:bg-dark-border transition-colors"
        >
          <CircleHelp size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Info Row */}
      <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
        <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">
          {new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
        <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">|</span>
        <div className="flex items-center gap-1 text-caption text-ink-500 dark:text-dark-text-tertiary">
          <Clock size={14} strokeWidth={1.5} />
          {formatTime(elapsed)}
        </div>
        <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">|</span>
        <div className="flex items-center gap-1">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                i < mistakes ? 'bg-sunset-500' : 'bg-sand-300 dark:bg-dark-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* How to Play */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-2xl bg-sand-100 dark:bg-dark-surface border border-sand-300 dark:border-dark-border"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-heading-sm text-ink-900 dark:text-dark-text">
                {lang === 'es' ? 'Como Jugar' : 'How to Play'}
              </h3>
              <button onClick={() => setShowHelp(false)} className="p-1">
                <X size={16} />
              </button>
            </div>
            <ul className="text-body-sm text-ink-700 dark:text-dark-text-secondary space-y-1 list-disc list-inside">
              <li>{lang === 'es' ? 'Encuentra grupos de 4 palabras que compartan un tema' : 'Find groups of 4 words that share a common theme'}</li>
              <li>{lang === 'es' ? 'Selecciona 4 palabras y presiona Enviar' : 'Select 4 words and tap Submit'}</li>
              <li>{lang === 'es' ? 'Tienes 4 oportunidades' : 'You have 4 chances'}</li>
              <li>{lang === 'es' ? 'Las categorias se vuelven mas dificiles' : 'Categories get harder as you go'}</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Solved Categories */}
      <div className="space-y-2 mb-4">
        <AnimatePresence>
          {solved.map((s, idx) => (
            <motion.div
              key={s.category.name}
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className={`rounded-[10px] p-3 ${categoryColors[idx % 4]}`}
            >
              <div className="text-center">
                <p className="text-white font-semibold text-sm">
                  {lang === 'es' ? s.category.nameEs : s.category.name}
                </p>
                <p className="text-white/80 text-xs mt-1">
                  {s.words.join(', ')}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Word Grid */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <AnimatePresence mode="popLayout">
          {words.map((word) => (
            <motion.button
              key={word}
              layout
              layoutId={word}
              onClick={() => toggleWord(word)}
              whileTap={{ scale: 0.95 }}
              className={`relative rounded-[10px] p-3 min-h-[64px] flex items-center justify-center font-semibold text-sm transition-all duration-200 border-2 ${
                selected.has(word)
                  ? 'bg-violet-100 dark:bg-violet-900 border-violet-500 shadow-md'
                  : shakeWords.has(word)
                  ? 'bg-sand-200 dark:bg-dark-elevated border-sunset-500 animate-tile-shake'
                  : 'bg-sand-200 dark:bg-dark-elevated border-sand-300 dark:border-dark-border hover:border-sand-400 dark:hover:border-dark-text-tertiary'
              } ${gameOver || gameWon ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span className={`text-ink-900 dark:text-dark-text ${selected.has(word) ? 'text-violet-700 dark:text-violet-300' : ''}`}>
                {word}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Mistakes Counter */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-body-sm text-ink-700 dark:text-dark-text-secondary">
          {lang === 'es' ? 'Errores restantes:' : 'Mistakes remaining:'}
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: 4 }, (_, i) => (
            <motion.div
              key={i}
              animate={i >= mistakes ? { scale: [1, 0.8, 1], opacity: [1, 0.3, 0.3] } : {}}
              transition={{ duration: 0.3 }}
              className={`w-3 h-3 rounded-full ${
                i < mistakes ? 'bg-sunset-500' : 'bg-sand-300 dark:bg-dark-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      {!gameOver && !gameWon && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={shuffleWords}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-[10px] bg-sand-200 dark:bg-dark-elevated text-ink-700 dark:text-dark-text-secondary hover:bg-sand-300 dark:hover:bg-dark-border transition-all duration-200 text-sm font-medium"
          >
            <Shuffle size={16} strokeWidth={1.5} />
            {lang === 'es' ? 'Mezclar' : 'Shuffle'}
          </button>
          <button
            onClick={deselectAll}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-[10px] bg-sand-200 dark:bg-dark-elevated text-ink-700 dark:text-dark-text-secondary hover:bg-sand-300 dark:hover:bg-dark-border transition-all duration-200 text-sm font-medium"
          >
            <X size={16} strokeWidth={1.5} />
            {lang === 'es' ? 'Deseleccionar' : 'Deselect All'}
          </button>
          <button
            onClick={submitGuess}
            disabled={selected.size !== 4}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-all duration-200 ${
              selected.size === 4
                ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-md'
                : 'bg-sand-300 dark:bg-dark-border text-sand-400 dark:text-dark-text-tertiary cursor-not-allowed'
            }`}
          >
            <Check size={16} strokeWidth={1.5} />
            {lang === 'es' ? 'Enviar' : 'Submit'}
          </button>
        </div>
      )}

      {/* Game Over / Won Actions */}
      {(gameOver || gameWon) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3"
        >
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-[10px] bg-violet-600 text-white hover:bg-violet-700 transition-all duration-200 text-sm font-semibold"
          >
            <RotateCcw size={16} strokeWidth={1.5} />
            {lang === 'es' ? 'Jugar de Nuevo' : 'Play Again'}
          </button>
        </motion.div>
      )}

      {/* Stats Modal */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 dark:bg-dark-bg/70 backdrop-blur-sm"
            onClick={() => setShowStats(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="bg-sand-100 dark:bg-dark-surface border border-sand-300 dark:border-dark-border rounded-2xl shadow-2xl p-6 max-w-[400px] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-heading-lg text-ink-900 dark:text-dark-text mb-1">
                  {gameWon
                    ? (lang === 'es' ? 'Juego Completado' : 'Game Complete')
                    : (lang === 'es' ? 'Juego Terminado' : 'Game Over')}
                </h3>
                <p className="text-caption text-ink-500 dark:text-dark-text-tertiary">
                  {t('connections')} — {new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US')}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center">
                  <div className="text-stat-number text-violet-600">{stats.groupsFound}/4</div>
                  <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">
                    {lang === 'es' ? 'Grupos' : 'Groups'}
                  </div>
                </div>
                <div className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center">
                  <div className="text-stat-number text-sunset-500">{stats.mistakes}/4</div>
                  <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">
                    {lang === 'es' ? 'Errores' : 'Mistakes'}
                  </div>
                </div>
                <div className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center">
                  <div className="text-stat-number text-ink-900 dark:text-dark-text">{formatTime(stats.time)}</div>
                  <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">
                    {lang === 'es' ? 'Tiempo' : 'Time'}
                  </div>
                </div>
                <div className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center">
                  <div className="text-stat-number text-sage-500">{stats.score}</div>
                  <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">
                    {lang === 'es' ? 'Puntuacion' : 'Score'}
                  </div>
                </div>
              </div>

              {/* Categories Found */}
              <div className="space-y-2 mb-6">
                <h4 className="text-heading-sm text-ink-900 dark:text-dark-text text-center mb-2">
                  {lang === 'es' ? 'Categorias' : 'Categories'}
                </h4>
                {puzzle.categories.map((cat, idx) => {
                  const found = solved.some((s) => s.category.name === cat.name);
                  return (
                    <div
                      key={cat.name}
                      className={`rounded-lg p-2.5 ${found ? categoryColors[idx % 4] : 'bg-sand-200 dark:bg-dark-elevated'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${found ? 'text-white' : 'text-ink-500 dark:text-dark-text-tertiary'}`}>
                          {lang === 'es' ? cat.nameEs : cat.name}
                        </span>
                        {found ? (
                          <Check size={14} className="text-white" />
                        ) : (
                          <X size={14} className="text-warm-gray-500" />
                        )}
                      </div>
                      {found && (
                        <p className="text-white/80 text-xs mt-1">{cat.words.join(', ')}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetGame}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-violet-600 text-white hover:bg-violet-700 transition-all text-sm font-semibold"
                >
                  <RotateCcw size={16} strokeWidth={1.5} />
                  {lang === 'es' ? 'Jugar de Nuevo' : 'Play Again'}
                </button>
              </div>

              <button
                onClick={() => setShowStats(false)}
                className="w-full mt-3 py-2 text-sm text-ink-500 dark:text-dark-text-tertiary hover:text-ink-700 dark:hover:text-dark-text transition-colors"
              >
                {lang === 'es' ? 'Cerrar' : 'Close'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
