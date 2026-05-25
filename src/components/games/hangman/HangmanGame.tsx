import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Clock, Heart } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const WORDS_EN = ['JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'ASTRO', 'TAILWIND', 'COMPONENT', 'FUNCTION', 'VARIABLE', 'ARRAY', 'OBJECT'];
const WORDS_ES = ['JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'ASTRO', 'TAILWIND', 'COMPONENTE', 'FUNCION', 'VARIABLE', 'MATRIZ', 'OBJETO'];

const HANGMAN_PARTS = [
  'head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'
];

export default function HangmanGame() {
  const { lang } = useLanguage();
  const words = lang === 'es' ? WORDS_ES : WORDS_EN;
  const [word] = useState(() => words[Math.floor(Math.random() * words.length)]);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [startTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const handleGuess = useCallback((letter: string) => {
    if (guessed.has(letter) || wrongGuesses >= 6 || word.split('').every(c => guessed.has(c))) return;
    
    const newGuessed = new Set(guessed);
    newGuessed.add(letter);
    setGuessed(newGuessed);

    if (!word.includes(letter)) {
      setWrongGuesses(w => w + 1);
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  }, [guessed, wrongGuesses, word]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) handleGuess(key);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleGuess]);

  const isWon = word.split('').every(c => guessed.has(c));
  const isLost = wrongGuesses >= 6;
  const isComplete = isWon || isLost;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-coal dark:text-white">{lang === 'es' ? 'Ahorcado' : 'Hangman'}</h2>
          <p className="text-sm text-sand-500">{lang === 'es' ? 'Adivina la palabra' : 'Guess the word'}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm text-sand-500"><Clock size={14} /> {formatTime(elapsed)}</div>
          <div className="flex gap-1">
            {Array.from({ length: 6 }, (_, i) => (
              <Heart key={i} size={16} className={i < 6 - wrongGuesses ? 'text-rose-500 fill-rose-500' : 'text-sand-300'} />
            ))}
          </div>
        </div>
      </div>

      {/* Word display */}
      <motion.div 
        animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
        className="flex justify-center gap-2 mb-6"
      >
        {word.split('').map((letter, i) => (
          <div key={i} className="w-10 h-12 border-b-4 border-violet-500 flex items-end justify-center">
            <AnimatePresence>
              {guessed.has(letter) && (
                <motion.span 
                  initial={{ y: -20, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-bold text-coal dark:text-white"
                >
                  {letter}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      {/* Hangman SVG */}
      <div className="flex justify-center mb-6">
        <svg width="120" height="140" viewBox="0 0 120 140" className="text-coal dark:text-white">
          {/* Gallows */}
          <line x1="20" y1="130" x2="100" y2="130" stroke="currentColor" strokeWidth="3" />
          <line x1="40" y1="130" x2="40" y2="20" stroke="currentColor" strokeWidth="3" />
          <line x1="40" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="3" />
          <line x1="80" y1="20" x2="80" y2="35" stroke="currentColor" strokeWidth="3" />
          
          {/* Body parts */}
          {wrongGuesses > 0 && <motion.circle initial={{ r: 0 }} animate={{ r: 10 }} cx="80" cy="45" fill="none" stroke="currentColor" strokeWidth="3" />}
          {wrongGuesses > 1 && <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="80" y1="55" x2="80" y2="90" stroke="currentColor" strokeWidth="3" />}
          {wrongGuesses > 2 && <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="80" y1="65" x2="60" y2="80" stroke="currentColor" strokeWidth="3" />}
          {wrongGuesses > 3 && <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="80" y1="65" x2="100" y2="80" stroke="currentColor" strokeWidth="3" />}
          {wrongGuesses > 4 && <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="80" y1="90" x2="65" y2="110" stroke="currentColor" strokeWidth="3" />}
          {wrongGuesses > 5 && <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="80" y1="90" x2="95" y2="110" stroke="currentColor" strokeWidth="3" />}
        </svg>
      </div>

      {/* Keyboard */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {alphabet.map(letter => {
          const isGuessed = guessed.has(letter);
          const isCorrect = word.includes(letter);
          return (
            <motion.button
              key={letter}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleGuess(letter)}
              disabled={isGuessed || isComplete}
              className={`aspect-square rounded-lg font-bold text-sm transition-all ${
                isGuessed 
                  ? isCorrect 
                    ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600' 
                    : 'bg-rose-100 dark:bg-rose-900 text-rose-600 opacity-50'
                  : 'bg-sand-100 dark:bg-sand-800 text-coal dark:text-white hover:bg-violet-100 dark:hover:bg-violet-900'
              }`}
            >
              {letter}
            </motion.button>
          );
        })}
      </div>

      {/* Result */}
      <AnimatePresence>
        {isComplete && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 text-center p-6 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl border-2 border-emerald-400">
            <Trophy size={40} className="mx-auto text-amber-500 mb-2" />
            <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
              {isWon ? (lang === 'es' ? '¡Ganaste!' : 'You Won!') : `${lang === 'es' ? 'La palabra era' : 'The word was'}: ${word}`}
            </p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">{formatTime(elapsed)}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center mt-4">
        <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors font-medium">
          <RotateCcw size={18} /> {lang === 'es' ? 'Nuevo' : 'New'}
        </button>
      </div>
    </div>
  );
}
