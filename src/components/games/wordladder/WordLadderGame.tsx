import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Check, X, Lightbulb, Clock, ArrowDown } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getPuzzle, getDailyPuzzleIndex, wordsDifferByOne } from './wordLadderData';
import confetti from 'canvas-confetti';

interface LadderStep {
  word: string;
  isValid: boolean;
  changingIndex: number;
  previousWord: string;
}

interface GameStats {
  stepsUsed: number;
  time: number;
  score: number;
  completed: boolean;
  hintsUsed: number;
}

export default function WordLadderGame() {
  const { lang } = useLanguage();
  const [puzzleIndex] = useState(getDailyPuzzleIndex);
  const puzzle = getPuzzle(lang, puzzleIndex);
  const [ladder, setLadder] = useState<LadderStep[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [shakeInput, setShakeInput] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [stats, setStats] = useState<GameStats>({ stepsUsed: 0, time: 0, score: 0, completed: false, hintsUsed: 0 });
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ladderEndRef = useRef<HTMLDivElement>(null);

  const wordLen = puzzle.startWord.length;

  // Timer
  useEffect(() => {
    if (!gameWon && !gameOver) {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameWon, gameOver, startTime]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (ladderEndRef.current) {
      ladderEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ladder.length]);

  const showToastMsg = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const getLastWord = useCallback(() => {
    if (ladder.length === 0) return puzzle.startWord;
    return ladder[ladder.length - 1].word;
  }, [ladder, puzzle.startWord]);

  const findChangingIndex = (from: string, to: string): number => {
    for (let i = 0; i < from.length; i++) {
      if (from[i] !== to[i]) return i;
    }
    return -1;
  };

  const submitWord = useCallback(() => {
    if (!currentInput || gameWon || gameOver) return;
    const word = currentInput.toUpperCase().trim();

    if (word.length !== wordLen) {
      showToastMsg(lang === 'es' ? `Debe tener ${wordLen} letras` : `Must be ${wordLen} letters`);
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 400);
      return;
    }

    const lastWord = getLastWord();

    if (word === lastWord) {
      showToastMsg(lang === 'es' ? 'Misma palabra' : 'Same word');
      setCurrentInput('');
      return;
    }

    if (!wordsDifferByOne(lastWord, word)) {
      showToastMsg(lang === 'es' ? 'Cambia solo una letra' : 'Change only one letter');
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 400);
      setCurrentInput('');
      return;
    }

    // Valid step
    const changingIdx = findChangingIndex(lastWord, word);
    const newStep: LadderStep = {
      word,
      isValid: true,
      changingIndex: changingIdx,
      previousWord: lastWord,
    };

    setLadder((prev) => [...prev, newStep]);
    setStats((s) => ({ ...s, stepsUsed: s.stepsUsed + 1 }));
    setCurrentInput('');

    // Check if reached target
    if (word === puzzle.targetWord) {
      setGameWon(true);
      const time = Math.floor((Date.now() - startTime) / 1000);
      const optimalSteps = puzzle.optimalPath.length - 2; // excluding start and target
      const stepBonus = Math.max(0, (optimalSteps + 2 - ladder.length - 1) * 100);
      const timeBonus = Math.max(0, 300 - time);
      setStats((s) => ({
        ...s,
        time,
        completed: true,
        score: 500 + stepBonus + timeBonus - s.hintsUsed * 50,
      }));
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors: ['#FF6B3D', '#6845BC', '#4A8B5B', '#D9A93E'] });
      setTimeout(() => setShowStats(true), 600);
    } else if (ladder.length + 1 >= puzzle.maxSteps) {
      // Max steps reached
      setGameOver(true);
      const time = Math.floor((Date.now() - startTime) / 1000);
      setStats((s) => ({ ...s, time, completed: true, score: Math.max(0, 100 - s.hintsUsed * 50) }));
      setTimeout(() => setShowStats(true), 600);
    }
  }, [currentInput, gameWon, gameOver, wordLen, getLastWord, puzzle.targetWord, puzzle.optimalPath.length, puzzle.maxSteps, lang, ladder.length, startTime]);

  const getHint = useCallback(() => {
    if (gameWon || gameOver) return;
    setStats((s) => ({ ...s, hintsUsed: s.hintsUsed + 1 }));
    setShowHint(true);
    setTimeout(() => setShowHint(false), 3000);
  }, [gameWon, gameOver]);

  const resetGame = useCallback(() => {
    setLadder([]);
    setCurrentInput('');
    setGameWon(false);
    setGameOver(false);
    setShowStats(false);
    setShowHint(false);
    setStats({ stepsUsed: 0, time: 0, score: 0, completed: false, hintsUsed: 0 });
  }, [lang, puzzleIndex]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameWon || gameOver) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        submitWord();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [submitWord, gameWon, gameOver]);

  const renderWordTiles = (word: string, highlightIdx: number = -1, isTarget: boolean = false) => {
    return (
      <div className="flex gap-1.5">
        {word.split('').map((letter, i) => (
          <div
            key={i}
            className={`w-11 h-11 flex items-center justify-center rounded-lg font-bold text-lg transition-all duration-200 ${
              highlightIdx === i
                ? 'bg-sunset-500 text-white shadow-md'
                : isTarget
                ? 'bg-sage-500 text-white'
                : 'bg-sand-200 dark:bg-dark-elevated text-ink-900 dark:text-dark-text border border-sand-300 dark:border-dark-border'
            }`}
          >
            {letter}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-[520px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-display-sm text-ink-900 dark:text-dark-text">
          {lang === 'es' ? 'Escalera de Palabras' : 'Word Ladder'}
        </h2>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="p-2 rounded-[10px] bg-sand-200 dark:bg-dark-elevated text-ink-700 dark:text-dark-text-secondary hover:bg-sand-300 dark:hover:bg-dark-border transition-colors"
        >
          <Lightbulb size={20} strokeWidth={1.5} />
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
        <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">
          {ladder.length}/{puzzle.maxSteps} {lang === 'es' ? 'pasos' : 'steps'}
        </span>
      </div>

      {/* Hint Text */}
      <p className="text-body-sm text-ink-500 dark:text-dark-text-tertiary text-center mb-4">
        {lang === 'es' ? puzzle.hintEs : puzzle.hint}
      </p>

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
              <li>{lang === 'es' ? 'Transforma la palabra inicial en la palabra objetivo' : 'Transform the start word into the target word'}</li>
              <li>{lang === 'es' ? 'Cambia exactamente una letra en cada paso' : 'Change exactly one letter at each step'}</li>
              <li>{lang === 'es' ? 'Cada palabra intermedia debe ser valida' : 'Every intermediate word must be valid'}</li>
              <li>{lang === 'es' ? 'Usa la menor cantidad de pasos posible' : 'Use as few steps as possible'}</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ladder */}
      <div className="flex flex-col items-center gap-2 mb-6">
        {/* Start Word */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">
            {lang === 'es' ? 'INICIO' : 'START'}
          </span>
          {renderWordTiles(puzzle.startWord, -1, false)}
        </motion.div>

        {/* Connecting Line */}
        <div className="w-0.5 h-6 bg-sand-300 dark:bg-dark-border" />

        {/* Ladder Steps */}
        <AnimatePresence>
          {ladder.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex flex-col items-center gap-1"
            >
              {renderWordTiles(step.word, step.changingIndex)}
              <div className="w-0.5 h-6 bg-sand-300 dark:bg-dark-border" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current Input */}
        {!gameWon && !gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex flex-col items-center gap-1 ${shakeInput ? 'animate-tile-shake' : ''}`}
          >
            <div className="flex gap-1.5">
              {Array.from({ length: wordLen }, (_, i) => {
                const lastWord = getLastWord();
                const letter = currentInput[i] || '';
                return (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={letter}
                    onChange={(e) => {
                      const val = e.target.value.toUpperCase();
                      setCurrentInput((prev) => {
                        const arr = prev.split('');
                        arr[i] = val;
                        return arr.join('').slice(0, wordLen);
                      });
                      // Auto-focus next
                      if (val && i < wordLen - 1) {
                        const nextInput = document.getElementById(`ladder-input-${i + 1}`) as HTMLInputElement;
                        if (nextInput) nextInput.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') submitWord();
                      if (e.key === 'Backspace' && !letter && i > 0) {
                        const prevInput = document.getElementById(`ladder-input-${i - 1}`) as HTMLInputElement;
                        if (prevInput) prevInput.focus();
                      }
                    }}
                    id={`ladder-input-${i}`}
                    className={`w-11 h-11 text-center rounded-lg font-bold text-lg border-2 outline-none transition-all duration-200 bg-sand-100 dark:bg-dark-surface text-ink-900 dark:text-dark-text focus:border-violet-500 focus:shadow-md ${
                      lastWord[i] !== letter && letter ? 'border-sunset-500 bg-sunset-50 dark:bg-sunset-500/10' : 'border-sand-300 dark:border-dark-border'
                    }`}
                  />
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Target Word */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-0.5 h-6 bg-sand-300 dark:bg-dark-border" />
          <span className="text-caption text-sage-500 font-medium">
            {lang === 'es' ? 'OBJETIVO' : 'TARGET'}
          </span>
          {renderWordTiles(puzzle.targetWord, -1, true)}
        </motion.div>

        <div ref={ladderEndRef} />
      </div>

      {/* Actions */}
      {!gameWon && !gameOver && (
        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={getHint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-sand-200 dark:bg-dark-elevated text-ink-700 dark:text-dark-text-secondary hover:bg-sand-300 dark:hover:bg-dark-border transition-all text-sm font-medium"
          >
            <Lightbulb size={14} strokeWidth={1.5} />
            {lang === 'es' ? 'Pista' : 'Hint'}
          </button>
          <button
            onClick={submitWord}
            disabled={currentInput.length !== wordLen}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-[10px] text-sm font-semibold transition-all ${
              currentInput.length === wordLen
                ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-md'
                : 'bg-sand-300 dark:bg-dark-border text-sand-400 dark:text-dark-text-tertiary cursor-not-allowed'
            }`}
          >
            <Check size={14} strokeWidth={1.5} />
            {lang === 'es' ? 'Enviar' : 'Submit'}
          </button>
        </div>
      )}

      {/* Hint Display */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center mb-4 p-3 rounded-lg bg-mustard-500/10 border border-mustard-500/30"
          >
            <p className="text-body-sm text-mustard-600 dark:text-mustard-400">
              {lang === 'es' ? `Camino optimo: ${puzzle.optimalPath.length - 2} pasos` : `Optimal path: ${puzzle.optimalPath.length - 2} steps`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Game Complete Actions */}
      {(gameWon || gameOver) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3"
        >
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-[10px] bg-violet-600 text-white hover:bg-violet-700 transition-all text-sm font-semibold"
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
                    ? (lang === 'es' ? 'Completado!' : 'Completed!')
                    : (lang === 'es' ? 'Juego Terminado' : 'Game Over')}
                </h3>
                <p className="text-caption text-ink-500 dark:text-dark-text-tertiary">
                  {lang === 'es' ? 'Escalera de Palabras' : 'Word Ladder'} — {new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center">
                  <div className="text-stat-number text-violet-600">{stats.stepsUsed}</div>
                  <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">
                    {lang === 'es' ? 'Pasos' : 'Steps'}
                  </div>
                </div>
                <div className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center">
                  <div className="text-stat-number text-sunset-500">{stats.hintsUsed}</div>
                  <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">
                    {lang === 'es' ? 'Pistas' : 'Hints'}
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

              {/* Optimal Path */}
              <div className="mb-6">
                <h4 className="text-heading-sm text-ink-900 dark:text-dark-text text-center mb-2">
                  {lang === 'es' ? 'Camino Optimo' : 'Optimal Path'}
                </h4>
                <div className="flex flex-col items-center gap-1">
                  {puzzle.optimalPath.map((word, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <span className={`text-body-sm font-medium ${
                        idx === 0 ? 'text-violet-600' : idx === puzzle.optimalPath.length - 1 ? 'text-sage-500' : 'text-ink-700 dark:text-dark-text-secondary'
                      }`}>
                        {word}
                      </span>
                      {idx < puzzle.optimalPath.length - 1 && (
                        <ArrowDown size={14} className="text-sand-400 dark:text-dark-text-tertiary my-0.5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetGame}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-violet-600 text-white hover:bg-violet-700 transition-all text-sm font-semibold"
                >
                  <RotateCcw size={16} strokeWidth={1.5} />
                  {lang === 'es' ? 'Jugar de Nuevo' : 'Play Again'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
