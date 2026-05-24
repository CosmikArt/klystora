import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Check, X, Trash2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getPuzzle, isValidWord, canFormWord, getWordScore, shuffleLetters } from './puzzleData';
import confetti from 'canvas-confetti';

export default function AnagramsGame() {
  const { lang } = useLanguage();
  const [seed] = useState(() => Math.floor(Date.now() / 86400000));
  const puzzle = getPuzzle(seed, lang as 'en' | 'es');
  const [letters, setLetters] = useState(() => shuffleLetters([...puzzle.letters]));
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [shake, setShake] = useState(false);
  const [message, setMessage] = useState('');

  const submitWord = useCallback(() => {
    const word = currentWord.toUpperCase();
    if (word.length < 3) {
      setMessage(lang === 'es' ? 'Mínimo 3 letras' : 'Minimum 3 letters');
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    if (foundWords.includes(word)) {
      setMessage(lang === 'es' ? 'Ya encontrada' : 'Already found');
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    if (!canFormWord(word, puzzle.letters)) {
      setMessage(lang === 'es' ? 'Letras no disponibles' : 'Letters not available');
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    if (isValidWord(word, puzzle)) {
      const wordScore = getWordScore(word);
      setFoundWords(prev => [...prev, word]);
      setScore(prev => prev + wordScore);
      setCurrentWord('');
      setMessage(lang === 'es' ? `+${wordScore} puntos` : `+${wordScore} points`);
      
      // Check if all words found
      const allFound = puzzle.targetWords.every(w => 
        [...foundWords, word].includes(w.toUpperCase())
      );
      if (allFound || foundWords.length + 1 >= puzzle.targetWords.length * 0.5) {
        setGameWon(true);
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      setMessage(lang === 'es' ? 'Palabra no válida' : 'Invalid word');
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  }, [currentWord, foundWords, puzzle, lang]);

  const addLetter = (letter: string) => {
    if (currentWord.length < 15) {
      setCurrentWord(prev => prev + letter);
      setMessage('');
    }
  };

  const deleteLetter = () => {
    setCurrentWord(prev => prev.slice(0, -1));
    setMessage('');
  };

  const clearWord = () => {
    setCurrentWord('');
    setMessage('');
  };

  const resetGame = () => {
    setLetters(shuffleLetters([...puzzle.letters]));
    setCurrentWord('');
    setFoundWords([]);
    setScore(0);
    setGameWon(false);
    setMessage('');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') submitWord();
      if (e.key === 'Backspace') deleteLetter();
      if (e.key === 'Escape') clearWord();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [submitWord]);

  return (
    <div className="w-full max-w-[520px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-coal dark:text-white">
          {lang === 'es' ? 'Anagramas' : 'Anagrams'}
        </h2>
        <div className="text-lg font-semibold text-violet-500">
          {score} pts
        </div>
      </div>

      {/* Letters */}
      <div className="flex justify-center gap-2 mb-4 flex-wrap">
        {letters.map((letter, i) => (
          <button
            key={i}
            onClick={() => addLetter(letter)}
            className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 font-bold text-xl hover:bg-violet-200 dark:hover:bg-violet-800 transition-colors"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Current Word */}
      <div className={`flex items-center justify-center gap-2 mb-4 min-h-[48px] ${shake ? 'animate-shake' : ''}`}>
        {currentWord.split('').map((letter, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-10 h-10 rounded-lg bg-sand-200 dark:bg-sand-700 flex items-center justify-center font-bold text-coal dark:text-white"
          >
            {letter}
          </motion.div>
        ))}
        {currentWord.length === 0 && (
          <span className="text-sand-500 dark:text-sand-400 text-sm">
            {lang === 'es' ? 'Forma una palabra...' : 'Form a word...'}
          </span>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className="text-center mb-4 text-sm font-medium text-coral-500">
          {message}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={deleteLetter}
          className="px-4 py-2 rounded-xl bg-sand-200 dark:bg-sand-700 text-coal dark:text-white hover:bg-sand-300 transition-colors"
        >
          ⌫
        </button>
        <button
          onClick={clearWord}
          className="px-4 py-2 rounded-xl bg-sand-200 dark:bg-sand-700 text-coal dark:text-white hover:bg-sand-300 transition-colors"
        >
          <Trash2 size={18} />
        </button>
        <button
          onClick={submitWord}
          className="px-6 py-2 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors"
        >
          <Check size={18} />
        </button>
      </div>

      {/* Found Words */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-sand-500 dark:text-sand-400 mb-2">
          {lang === 'es' ? `Encontradas (${foundWords.length})` : `Found (${foundWords.length})`}
        </h3>
        <div className="flex flex-wrap gap-2">
          {foundWords.map((word, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300 text-sm font-medium"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Game Over */}
      {gameWon && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-6 bg-sage-50 dark:bg-sage-900 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-sage-700 dark:text-sage-300 mb-2">
            {lang === 'es' ? '¡Excelente!' : 'Great job!'}
          </h3>
          <p className="text-sage-600 dark:text-sage-400 mb-4">
            {lang === 'es' ? `Puntuación: ${score}` : `Score: ${score}`}
          </p>
          <button
            onClick={resetGame}
            className="px-6 py-2 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors"
          >
            <RotateCcw size={18} className="inline mr-2" />
            {lang === 'es' ? 'Jugar de nuevo' : 'Play again'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
