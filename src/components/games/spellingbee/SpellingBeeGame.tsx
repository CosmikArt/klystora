import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Delete, RotateCcw, Check, X, Star, Clock, Zap } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getPuzzle, getDailyPuzzleIndex, getWordScore, getRank, getRankEs, getRankThresholds } from './spellingBeeData';
import confetti from 'canvas-confetti';

interface GameStats {
  wordsFound: number;
  score: number;
  pangrams: number;
  time: number;
  completed: boolean;
  rank: string;
}

export default function SpellingBeeGame() {
  const { lang } = useLanguage();
  const [puzzleIndex] = useState(getDailyPuzzleIndex);
  const puzzle = getPuzzle(lang, puzzleIndex);
  const [input, setInput] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [shakeInput, setShakeInput] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [pangramFlash, setPangramFlash] = useState(false);
  const [outerLetters, setOuterLetters] = useState(puzzle.outerLetters);
  const [stats, setStats] = useState<GameStats>({ wordsFound: 0, score: 0, pangrams: 0, time: 0, completed: false, rank: 'Beginner' });
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const maxScore = puzzle.validWords.reduce((sum, w) => {
    const isPangram = puzzle.pangrams.some((p) => w.toUpperCase().includes(p));
    return sum + getWordScore(w, isPangram);
  }, 0);

  const currentRank = lang === 'es' ? getRankEs(stats.score, maxScore) : getRank(stats.score, maxScore);
  const rankThresholds = getRankThresholds(maxScore);

  // Timer
  useEffect(() => {
    if (!gameComplete) {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameComplete, startTime]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameComplete) return;
      const key = e.key.toUpperCase();
      if (key === 'ENTER') {
        e.preventDefault();
        submitWord();
      } else if (key === 'BACKSPACE') {
        e.preventDefault();
        setInput((prev) => prev.slice(0, -1));
      } else if (key === 'ESCAPE') {
        setInput('');
      } else if (allLetters.includes(key)) {
        setInput((prev) => prev.length < 15 ? prev + key : prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const allLetters = [puzzle.centerLetter, ...puzzle.outerLetters];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const submitWord = useCallback(() => {
    if (!input) return;
    const word = input.toUpperCase().trim();

    if (word.length < 4) {
      showToast(lang === 'es' ? 'Minimo 4 letras' : 'Minimum 4 letters');
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 400);
      setInput('');
      return;
    }

    if (!word.includes(puzzle.centerLetter)) {
      showToast(lang === 'es' ? `Debe contener ${puzzle.centerLetter}` : `Must contain ${puzzle.centerLetter}`);
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 400);
      return;
    }

    if (foundWords.includes(word)) {
      showToast(lang === 'es' ? 'Ya encontrada' : 'Already found');
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 400);
      setInput('');
      return;
    }

    // Check if word is valid (using puzzle.validWords or heuristic)
    // Check if word uses only available letters and is in valid words list
    const usesOnlyAvailableLetters = word.split('').every((c) => allLetters.includes(c));

    if (!usesOnlyAvailableLetters || !puzzle.validWords.some((vw) => vw.toUpperCase() === word)) {
      showToast(lang === 'es' ? 'No en la lista' : 'Not in word list');
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 400);
      setInput('');
      return;
    }

    // Word is valid!
    const isPangram = puzzle.pangrams.some((p) => p.split('').every((c) => word.includes(c))) ||
      puzzle.outerLetters.every((l) => word.includes(l));
    const score = getWordScore(word, isPangram);

    setFoundWords((prev) => [...prev, word].sort());
    setStats((s) => ({
      ...s,
      wordsFound: s.wordsFound + 1,
      score: s.score + score,
      pangrams: s.pangrams + (isPangram ? 1 : 0),
    }));

    if (isPangram) {
      setPangramFlash(true);
      setTimeout(() => setPangramFlash(false), 600);
      showToast(lang === 'es' ? 'Pangrama!' : 'Pangram!');
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 }, colors: ['#FF6B3D', '#D9A93E'] });
    }

    setInput('');

    // Check if reached Genius
    const newScore = stats.score + score;
    if (newScore >= Math.floor(maxScore * 0.7) && !gameComplete) {
      setGameComplete(true);
      const time = Math.floor((Date.now() - startTime) / 1000);
      setStats((s) => ({ ...s, time, completed: true, rank: lang === 'es' ? 'Genio' : 'Genius' }));
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors: ['#FF6B3D', '#6845BC', '#4A8B5B', '#D9A93E'] });
      setTimeout(() => setShowStats(true), 800);
    }
  }, [input, puzzle, foundWords, stats.score, maxScore, gameComplete, lang, startTime, allLetters]);

  const shuffleOuter = useCallback(() => {
    setOuterLetters((prev) => shuffleArray([...prev]));
  }, []);

  const deleteLast = useCallback(() => {
    setInput((prev) => prev.slice(0, -1));
  }, []);

  const addLetter = useCallback((letter: string) => {
    if (gameComplete) return;
    setInput((prev) => prev.length < 15 ? prev + letter : prev);
  }, [gameComplete]);

  const resetGame = useCallback(() => {
    const p = getPuzzle(lang, puzzleIndex + 1);
    setInput('');
    setFoundWords([]);
    setGameComplete(false);
    setShowStats(false);
    setStats({ wordsFound: 0, score: 0, pangrams: 0, time: 0, completed: false, rank: 'Beginner' });
    setOuterLetters(p.outerLetters);
  }, [lang, puzzleIndex]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  // Hexagon clip path
  const hexPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';

  return (
    <div className="w-full max-w-[520px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-display-sm text-ink-900 dark:text-dark-text">
          {lang === 'es' ? 'Abeja de Ortografia' : 'Spelling Bee'}
        </h2>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="p-2 rounded-[10px] bg-sand-200 dark:bg-dark-elevated text-ink-700 dark:text-dark-text-secondary hover:bg-sand-300 dark:hover:bg-dark-border transition-colors"
        >
          <Zap size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Info Row */}
      <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
        <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">
          {new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
        <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">|</span>
        <div className="flex items-center gap-1 text-caption text-ink-500 dark:text-dark-text-tertiary">
          <Clock size={14} strokeWidth={1.5} />
          {formatTime(elapsed)}
        </div>
        <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">|</span>
        <span className="text-caption text-violet-600 font-medium">{currentRank}</span>
      </div>

      {/* How to Play */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 rounded-2xl bg-sand-100 dark:bg-dark-surface border border-sand-300 dark:border-dark-border"
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
              <li>{lang === 'es' ? 'Forma palabras con las 7 letras' : 'Make words using the 7 letters'}</li>
              <li>{lang === 'es' ? 'Cada palabra debe incluir la letra central' : 'Every word must include the center letter'}</li>
              <li>{lang === 'es' ? 'Minimo 4 letras' : 'Minimum 4 letters'}</li>
              <li>{lang === 'es' ? 'Pangramas (todas las 7 letras) dan puntos extra' : 'Pangrams (all 7 letters) earn bonus points'}</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Honeycomb + Input */}
        <div className="flex-1 flex flex-col items-center">
          {/* Honeycomb */}
          <div className={`relative w-[200px] h-[200px] mb-4 transition-all duration-300 ${pangramFlash ? 'scale-110' : ''}`}>
            {/* Center letter */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => addLetter(puzzle.centerLetter)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center text-white font-bold text-xl bg-sunset-500 hover:bg-sunset-600 transition-colors"
              style={{ clipPath: hexPath }}
            >
              {puzzle.centerLetter}
            </motion.button>

            {/* Outer letters - arranged in a hexagon */}
            {outerLetters.map((letter, i) => {
              const angle = (i * 60 - 90) * (Math.PI / 180);
              const radius = 70;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <motion.button
                  key={letter}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addLetter(letter)}
                  className="absolute left-1/2 top-1/2 w-11 h-11 flex items-center justify-center text-ink-900 dark:text-dark-text font-bold text-lg bg-sand-200 dark:bg-dark-elevated hover:bg-sand-300 dark:hover:bg-dark-border transition-colors border border-sand-300 dark:border-dark-border"
                  style={{
                    clipPath: hexPath,
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  {letter}
                </motion.button>
              );
            })}
          </div>

          {/* Input Field */}
          <div
            className={`w-full max-w-[280px] h-12 rounded-xl border-2 flex items-center justify-center mb-3 transition-all duration-200 ${
              shakeInput ? 'animate-tile-shake border-sunset-500' : 'border-sand-300 dark:border-dark-border'
            } bg-sand-100 dark:bg-dark-surface`}
          >
            <span className="text-heading-md text-ink-900 dark:text-dark-text font-semibold tracking-wider">
              {input || <span className="text-sand-400 dark:text-dark-text-tertiary text-sm">{lang === 'es' ? 'Escribe o toca letras' : 'Type or tap letters'}</span>}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={deleteLast}
              className="flex items-center gap-1 px-3 py-2 rounded-[10px] bg-sand-200 dark:bg-dark-elevated text-ink-700 dark:text-dark-text-secondary hover:bg-sand-300 dark:hover:bg-dark-border transition-all text-sm font-medium"
            >
              <Delete size={14} strokeWidth={1.5} />
              {lang === 'es' ? 'Borrar' : 'Delete'}
            </button>
            <button
              onClick={shuffleOuter}
              className="flex items-center gap-1 px-3 py-2 rounded-[10px] bg-sand-200 dark:bg-dark-elevated text-ink-700 dark:text-dark-text-secondary hover:bg-sand-300 dark:hover:bg-dark-border transition-all text-sm font-medium"
            >
              <Shuffle size={14} strokeWidth={1.5} />
              {lang === 'es' ? 'Mezclar' : 'Shuffle'}
            </button>
            <button
              onClick={submitWord}
              disabled={input.length < 4}
              className={`flex items-center gap-1 px-4 py-2 rounded-[10px] text-sm font-semibold transition-all ${
                input.length >= 4
                  ? 'bg-violet-600 text-white hover:bg-violet-700'
                  : 'bg-sand-300 dark:bg-dark-border text-sand-400 dark:text-dark-text-tertiary cursor-not-allowed'
              }`}
            >
              <Check size={14} strokeWidth={1.5} />
              {lang === 'es' ? 'Enter' : 'Enter'}
            </button>
          </div>

          {/* Toast */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-[10px] bg-ink-900 dark:bg-dark-elevated text-white text-sm shadow-lg"
              >
                {toast}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Score + Rank */}
          <div className="w-full max-w-[280px] mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-body-sm text-ink-700 dark:text-dark-text-secondary">
                {stats.score} {lang === 'es' ? 'puntos' : 'points'}
              </span>
              <span className="text-caption text-violet-600 font-medium">{currentRank}</span>
            </div>
            {/* Rank Progress */}
            <div className="w-full h-2 bg-sand-200 dark:bg-dark-elevated rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-violet-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (stats.score / maxScore) * 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mt-1">
              {rankThresholds.map((r) => (
                <span key={r.rank} className="text-[10px] text-ink-500 dark:text-dark-text-tertiary">
                  {lang === 'es' ? r.rankEs : r.rank}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Found Words */}
        <div className="flex-1 max-h-[360px] overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-heading-sm text-ink-900 dark:text-dark-text">
              {lang === 'es' ? 'Palabras Encontradas' : 'Found Words'}
            </h3>
            <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">
              {foundWords.length}
            </span>
          </div>
          <div className="space-y-1.5">
            <AnimatePresence>
              {foundWords.map((word) => {
                const isPangram = puzzle.outerLetters.every((l) => word.includes(l));
                return (
                  <motion.div
                    key={word}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg ${
                      isPangram
                        ? 'bg-sunset-500/10 dark:bg-sunset-500/20'
                        : 'bg-sand-50 dark:bg-dark-elevated'
                    }`}
                  >
                    <span className={`text-body-sm font-medium ${
                      isPangram ? 'text-sunset-500' : 'text-sage-500'
                    }`}>
                      {word}
                    </span>
                    <div className="flex items-center gap-1">
                      {isPangram && <Star size={12} className="text-sunset-500" />}
                      <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">
                        {getWordScore(word, isPangram)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {foundWords.length === 0 && (
              <p className="text-body-sm text-sand-400 dark:text-dark-text-tertiary text-center py-8">
                {lang === 'es' ? 'Aun no has encontrado palabras' : 'No words found yet'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Game Complete Actions */}
      {gameComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mt-6"
        >
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-[10px] bg-violet-600 text-white hover:bg-violet-700 transition-all text-sm font-semibold"
          >
            <RotateCcw size={16} strokeWidth={1.5} />
            {lang === 'es' ? 'Nuevo Juego' : 'New Game'}
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
                  {lang === 'es' ? 'Juego Completado!' : 'Game Complete!'}
                </h3>
                <p className="text-caption text-ink-500 dark:text-dark-text-tertiary">
                  {lang === 'es' ? 'Abeja de Ortografia' : 'Spelling Bee'} — {new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center">
                  <div className="text-stat-number text-violet-600">{stats.wordsFound}</div>
                  <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">
                    {lang === 'es' ? 'Palabras' : 'Words'}
                  </div>
                </div>
                <div className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center">
                  <div className="text-stat-number text-sunset-500">{stats.score}</div>
                  <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">
                    {lang === 'es' ? 'Puntos' : 'Score'}
                  </div>
                </div>
                <div className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center">
                  <div className="text-stat-number text-mustard-500">{stats.pangrams}</div>
                  <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">
                    {lang === 'es' ? 'Pangramas' : 'Pangrams'}
                  </div>
                </div>
                <div className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center">
                  <div className="text-stat-number text-sage-500">{formatTime(stats.time)}</div>
                  <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">
                    {lang === 'es' ? 'Tiempo' : 'Time'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetGame}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-violet-600 text-white hover:bg-violet-700 transition-all text-sm font-semibold"
                >
                  <RotateCcw size={16} strokeWidth={1.5} />
                  {lang === 'es' ? 'Nuevo Juego' : 'New Game'}
                </button>
              </div>
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
