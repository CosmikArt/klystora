import { useState, useCallback, useEffect, useRef } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Check, X, CircleHelp, Zap, Clock } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { RoscoQuestion } from './roscoData';
import { getPuzzle, getDailyPuzzleIndex } from './roscoData';
import confetti from 'canvas-confetti';

type LetterState = 'unanswered' | 'correct' | 'wrong' | 'current' | 'passed';

interface LetterStatus {
  letter: string;
  state: LetterState;
  question: RoscoQuestion;
  userAnswer: string;
}

interface GameStats {
  correct: number;
  wrong: number;
  passed: number;
  score: number;
  time: number;
  completed: boolean;
}

const TOTAL_TIME = 120; // 120 seconds

export default function RoscoGame() {
  const { trackGameComplete } = useAnalytics();
  const { lang } = useLanguage();
  const [puzzleIndex] = useState(getDailyPuzzleIndex);
  const puzzle = getPuzzle(lang, puzzleIndex);
  const [letterStatuses, setLetterStatuses] = useState<LetterStatus[]>(() =>
    puzzle.questions.map((q, i) => ({
      letter: q.letter,
      state: i === 0 ? 'current' : 'unanswered',
      question: q,
      userAnswer: '',
    }))
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [gameComplete, setGameComplete] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [stats, setStats] = useState<GameStats>({ correct: 0, wrong: 0, passed: 0, score: 0, time: 0, completed: false });
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [startTime] = useState(Date.now());
  const [, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalLetters = puzzle.questions.length;

  // Timer
  useEffect(() => {
    if (!gameComplete) {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const elapsedSec = Math.floor((now - startTime) / 1000);
        setElapsed(elapsedSec);
        const remaining = TOTAL_TIME - elapsedSec;
        setTimeLeft(Math.max(0, remaining));

    if (remaining <= 0) {
      endGame(true);
    }
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameComplete, startTime]);

  const endGame = useCallback((timedOut = false) => {
    if (gameComplete) return;
    setGameComplete(true);
    const time = Math.floor((Date.now() - startTime) / 1000);
    const finalStats = { ...stats, time, completed: true, score: stats.correct * 10 + stats.passed * 5 };
    setStats(finalStats);
    trackGameComplete('rosco', finalStats.score, finalStats.correct >= totalLetters * 0.5);
    // Mark all unanswered as passed
    setLetterStatuses((prev) =>
      prev.map((ls) => (ls.state === 'current' || ls.state === 'unanswered' ? { ...ls, state: 'passed' as LetterState } : ls))
    );
    setTimeout(() => setShowStats(true), 600);
  }, [gameComplete, startTime, totalLetters, stats]);

  const showToastMsg = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const getNextUnanswered = useCallback((fromIdx: number): number => {
    for (let i = 1; i <= totalLetters; i++) {
      const idx = (fromIdx + i) % totalLetters;
      if (letterStatuses[idx]?.state === 'unanswered' || letterStatuses[idx]?.state === 'passed') {
        return idx;
      }
    }
    return -1;
  }, [letterStatuses, totalLetters]);

  const submitAnswer = useCallback(() => {
    if (gameComplete || !answer.trim()) return;
    const currentStatus = letterStatuses[currentIdx];
    if (!currentStatus) return;

    const userAns = answer.trim().toUpperCase();
    const correctAnswer = lang === 'es' ? currentStatus.question.answerEs.toUpperCase() : currentStatus.question.answer.toUpperCase();
    const isCorrect = userAns === correctAnswer;

    // Update current letter status
    setLetterStatuses((prev) =>
      prev.map((ls, i) =>
        i === currentIdx
          ? { ...ls, state: isCorrect ? ('correct' as LetterState) : ('wrong' as LetterState), userAnswer: userAns }
          : ls
      )
    );

    // Update stats
    setStats((s) => ({
      ...s,
      correct: s.correct + (isCorrect ? 1 : 0),
      wrong: s.wrong + (isCorrect ? 0 : 1),
      score: s.score + (isCorrect ? 10 : 0),
    }));

    if (isCorrect) {
      showToastMsg(lang === 'es' ? 'Correcto!' : 'Correct!');
    } else {
      showToastMsg(`${lang === 'es' ? 'Incorrecto. Era:' : 'Wrong. It was:'} ${correctAnswer}`);
    }

    setAnswer('');

    // Find next unanswered letter
    const nextIdx = getNextUnanswered(currentIdx);
    if (nextIdx === -1) {
      // All answered
      setTimeout(() => {
        setGameComplete(true);
        const time = Math.floor((Date.now() - startTime) / 1000);
        const finalCorrect = stats.correct + (isCorrect ? 1 : 0);
        const finalScore = finalCorrect * 10 + stats.passed * 5;
        setStats((s) => ({
          ...s,
          time,
          completed: true,
          score: finalScore,
        }));
        trackGameComplete('rosco', finalScore, finalCorrect >= totalLetters * 0.5);
        if (finalCorrect >= totalLetters * 0.7) {
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors: ['#FF6B3D', '#6845BC', '#4A8B5B', '#D9A93E'] });
        }
        setTimeout(() => setShowStats(true), 600);
      }, 500);
    } else {
      // Move to next
      setLetterStatuses((prev) =>
        prev.map((ls, i) => (i === nextIdx ? { ...ls, state: 'current' as LetterState } : ls))
      );
      setCurrentIdx(nextIdx);
    }
  }, [answer, gameComplete, letterStatuses, currentIdx, lang, getNextUnanswered, stats.correct, startTime, totalLetters]);

  const passQuestion = useCallback(() => {
    if (gameComplete) return;
    const currentStatus = letterStatuses[currentIdx];
    if (!currentStatus) return;

    // Mark as passed
    setLetterStatuses((prev) =>
      prev.map((ls, i) =>
        i === currentIdx ? { ...ls, state: 'passed' as LetterState } : ls
      )
    );

    setStats((s) => ({ ...s, passed: s.passed + 1 }));
    setAnswer('');

    // Find next
    const nextIdx = getNextUnanswered(currentIdx);
    if (nextIdx === -1) {
      setTimeout(() => endGame(false), 300);
    } else {
      setLetterStatuses((prev) =>
        prev.map((ls, i) => (i === nextIdx ? { ...ls, state: 'current' as LetterState } : ls))
      );
      setCurrentIdx(nextIdx);
    }
  }, [gameComplete, letterStatuses, currentIdx, getNextUnanswered, endGame]);

  const resetGame = useCallback(() => {
    const p = getPuzzle(lang, puzzleIndex + 1);
    setLetterStatuses(
      p.questions.map((q, i) => ({
        letter: q.letter,
        state: i === 0 ? ('current' as LetterState) : ('unanswered' as LetterState),
        question: q,
        userAnswer: '',
      }))
    );
    setCurrentIdx(0);
    setAnswer('');
    setGameComplete(false);
    setShowStats(false);
    setTimeLeft(TOTAL_TIME);
    setStats({ correct: 0, wrong: 0, passed: 0, score: 0, time: 0, completed: false });
  }, [lang, puzzleIndex]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameComplete) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        submitAnswer();
      } else if (e.key.toUpperCase() === 'P') {
        e.preventDefault();
        passQuestion();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [submitAnswer, passQuestion, gameComplete]);

  const getLetterColor = (state: LetterState) => {
    switch (state) {
      case 'correct': return 'bg-sage-500 text-white';
      case 'wrong': return 'bg-warm-gray-500 text-white';
      case 'current': return 'bg-sunset-500 text-white animate-pulse';
      case 'passed': return 'bg-violet-200 dark:bg-violet-700 text-violet-600 dark:text-violet-300';
      default: return 'bg-sand-200 dark:bg-dark-elevated text-ink-500 dark:text-dark-text-tertiary';
    }
  };

  const currentQuestion = letterStatuses[currentIdx]?.question;

  // Calculate ring positions
  const getRingPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = 140;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <div className="w-full max-w-[520px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-display-sm text-ink-900 dark:text-dark-text">Rosco</h2>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="p-2 rounded-[10px] bg-sand-200 dark:bg-dark-elevated text-ink-700 dark:text-dark-text-secondary hover:bg-sand-300 dark:hover:bg-dark-border transition-colors"
        >
          <CircleHelp size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Info Row */}
      <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
        <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">
          {new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
        <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">|</span>
        <div className={`flex items-center gap-1 text-caption font-medium ${timeLeft <= 30 ? 'text-sunset-500' : 'text-ink-500 dark:text-dark-text-tertiary'}`}>
          <Clock size={14} strokeWidth={1.5} />
          {formatTime(timeLeft)}
        </div>
        <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">|</span>
        <span className="text-caption text-sage-500 font-medium">{stats.correct}/{totalLetters}</span>
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
              <li>{lang === 'es' ? 'Responde una palabra por cada letra' : 'Answer one word per letter'}</li>
              <li>{lang === 'es' ? 'Cada pista da una definicion' : 'Each clue gives a definition'}</li>
              <li>{lang === 'es' ? 'Presiona P para pasar y volver despues' : 'Press P to skip and come back later'}</li>
              <li>{lang === 'es' ? 'Responde antes de que se acabe el tiempo' : 'Answer before time runs out'}</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rosco Ring */}
      <div className="relative w-[300px] h-[300px] mx-auto mb-6">
        {/* Center: Timer + Pass Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10">
          <div className={`text-heading-lg font-mono ${timeLeft <= 30 ? 'text-sunset-500' : 'text-ink-900 dark:text-dark-text'}`}>
            {formatTime(timeLeft)}
          </div>
          <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">
            {stats.correct}/{totalLetters}
          </span>
          {!gameComplete && (
            <button
              onClick={passQuestion}
              className="mt-1 w-16 h-16 rounded-full bg-sunset-500 text-white font-semibold text-xs hover:bg-sunset-600 transition-colors shadow-lg flex flex-col items-center justify-center gap-0.5"
            >
              <Zap size={14} strokeWidth={1.5} />
              {lang === 'es' ? 'PASA' : 'PASS'}
            </button>
          )}
        </div>

        {/* Ring letters */}
        {letterStatuses.map((ls, i) => {
          const pos = getRingPosition(i, totalLetters);
          return (
            <motion.div
              key={ls.letter}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.02, duration: 0.2 }}
              className={`absolute left-1/2 top-1/2 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${getLetterColor(ls.state)}`}
              style={{
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
              }}
            >
              {ls.state === 'correct' && <Check size={14} strokeWidth={2} />}
              {ls.state === 'wrong' && <X size={14} strokeWidth={2} />}
              {ls.state !== 'correct' && ls.state !== 'wrong' && ls.letter}
            </motion.div>
          );
        })}
      </div>

      {/* Question Panel */}
      {currentQuestion && !gameComplete && (
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <p className="text-body text-ink-900 dark:text-dark-text mb-3">
            {lang === 'es' ? currentQuestion.questionEs : currentQuestion.question}
          </p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-display-sm text-sunset-500 font-display">
              {currentQuestion.type === 'startsWith'
                ? `${lang === 'es' ? 'Empieza con' : 'Starts with'} ${currentQuestion.startsWith}...`
                : `${lang === 'es' ? 'Contiene' : 'Contains'} ${currentQuestion.contains}...`}
            </span>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitAnswer();
            }}
            placeholder={lang === 'es' ? 'Escribe tu respuesta...' : 'Type your answer...'}
            className="w-full max-w-[280px] h-12 text-center text-heading-md border-b-2 bg-transparent outline-none transition-all text-ink-900 dark:text-dark-text placeholder:text-sand-400 dark:placeholder:text-dark-text-tertiary border-violet-600 focus:border-violet-700"
            autoFocus
          />
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={passQuestion}
              className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-sand-200 dark:bg-dark-elevated text-ink-700 dark:text-dark-text-secondary hover:bg-sand-300 dark:hover:bg-dark-border transition-all text-sm font-medium"
            >
              <Zap size={14} strokeWidth={1.5} />
              {lang === 'es' ? 'Pasar (P)' : 'Pass (P)'}
            </button>
            <button
              onClick={submitAnswer}
              disabled={!answer.trim()}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-[10px] text-sm font-semibold transition-all ${
                answer.trim()
                  ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-md'
                  : 'bg-sand-300 dark:bg-dark-border text-sand-400 dark:text-dark-text-tertiary cursor-not-allowed'
              }`}
            >
              <Check size={14} strokeWidth={1.5} />
              {lang === 'es' ? 'Responder' : 'Answer'}
            </button>
          </div>
          <p className="text-caption text-ink-400 dark:text-dark-text-tertiary mt-2">
            {lang === 'es' ? 'P = Pasar | Enter = Responder' : 'P = Pass | Enter = Answer'}
          </p>
        </motion.div>
      )}

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
      {gameComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-6"
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
              className="bg-sand-100 dark:bg-dark-surface border border-sand-300 dark:border-dark-border rounded-2xl shadow-2xl p-6 max-w-[420px] w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-heading-lg text-ink-900 dark:text-dark-text mb-1">
                  {lang === 'es' ? 'Rosco Completado!' : 'Rosco Complete!'}
                </h3>
                <p className="text-caption text-ink-500 dark:text-dark-text-tertiary">
                  Rosco — {new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US')}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center">
                  <div className="text-stat-number text-sage-500">{stats.correct}/{totalLetters}</div>
                  <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">
                    {lang === 'es' ? 'Correctas' : 'Correct'}
                  </div>
                </div>
                <div className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center">
                  <div className="text-stat-number text-warm-gray-500">{stats.wrong}</div>
                  <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">
                    {lang === 'es' ? 'Incorrectas' : 'Wrong'}
                  </div>
                </div>
                <div className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center">
                  <div className="text-stat-number text-violet-600">{stats.score}</div>
                  <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">
                    {lang === 'es' ? 'Puntos' : 'Score'}
                  </div>
                </div>
                <div className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center">
                  <div className="text-stat-number text-ink-900 dark:text-dark-text">{formatTime(stats.time)}</div>
                  <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">
                    {lang === 'es' ? 'Tiempo' : 'Time'}
                  </div>
                </div>
              </div>

              {/* Answers */}
              <div className="mb-6">
                <h4 className="text-heading-sm text-ink-900 dark:text-dark-text text-center mb-3">
                  {lang === 'es' ? 'Respuestas' : 'Answers'}
                </h4>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {letterStatuses.map((ls) => (
                    <div
                      key={ls.letter}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                        ls.state === 'correct'
                          ? 'bg-sage-500/10'
                          : ls.state === 'wrong'
                          ? 'bg-warm-gray-500/10'
                          : 'bg-violet-200/30 dark:bg-violet-700/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          ls.state === 'correct'
                            ? 'bg-sage-500 text-white'
                            : ls.state === 'wrong'
                            ? 'bg-warm-gray-500 text-white'
                            : 'bg-violet-200 dark:bg-violet-700 text-violet-600 dark:text-violet-300'
                        }`}>
                          {ls.letter}
                        </span>
                        <span className="text-body-sm text-ink-700 dark:text-dark-text-secondary">
                          {lang === 'es' ? ls.question.answerEs : ls.question.answer}
                        </span>
                      </div>
                      {ls.state === 'correct' ? (
                        <Check size={14} className="text-sage-500" />
                      ) : ls.state === 'wrong' ? (
                        <X size={14} className="text-warm-gray-500" />
                      ) : (
                        <span className="text-caption text-violet-500">{lang === 'es' ? 'Pasada' : 'Passed'}</span>
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
