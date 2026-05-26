import { useState, useEffect, useCallback } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Heart } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const WORDS: Record<string, string[]> = {
  en: ['PUZZLE', 'WORD', 'GAME', 'LETTER', 'ALPHABET', 'PHRASE', 'SENTENCE', 'STORY', 'BOOK', 'READ', 'WRITE', 'SPELL', 'GUESS', 'THINK', 'BRAIN', 'MIND', 'SMART', 'CLEVER', 'QUICK', 'FAST'],
  es: ['PALABRA', 'JUEGO', 'LETRA', 'ALFABETO', 'FRASE', 'ORACION', 'HISTORIA', 'LIBRO', 'LEER', 'ESCRIBIR', 'DELETREAR', 'ADIVINAR', 'PENSAR', 'CEREBRO', 'MENTE', 'LISTO', 'RAPIDO'],
  default: ['PUZZLE', 'WORD', 'GAME', 'LETTER', 'ALPHABET', 'PHRASE', 'SENTENCE', 'STORY'],
};

const MAX_GUESSES = 6;

function getWord(lang: string): string {
  const words = WORDS[lang] || WORDS['default'];
  return words[Math.floor(Math.random() * words.length)];
}

// SVG Hangman figure
function HangmanFigure({ wrongGuesses }: { wrongGuesses: number }) {
  return (
    <svg viewBox="0 0 200 250" className="w-48 h-60 mx-auto">
      {/* Gallows */}
      <line x1="20" y1="230" x2="120" y2="230" stroke="#4a4a4a" strokeWidth="3" />
      <line x1="70" y1="230" x2="70" y2="20" stroke="#4a4a4a" strokeWidth="3" />
      <line x1="70" y1="20" x2="140" y2="20" stroke="#4a4a4a" strokeWidth="3" />
      <line x1="140" y1="20" x2="140" y2="50" stroke="#4a4a4a" strokeWidth="3" />
      
      {/* Head */}
      {wrongGuesses >= 1 && (
        <motion.circle 
          cx="140" cy="70" r="20" 
          stroke="#4a4a4a" strokeWidth="3" fill="none"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
        />
      )}
      {/* Body */}
      {wrongGuesses >= 2 && (
        <motion.line 
          x1="140" y1="90" x2="140" y2="160" 
          stroke="#4a4a4a" strokeWidth="3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        />
      )}
      {/* Left arm */}
      {wrongGuesses >= 3 && (
        <motion.line 
          x1="140" y1="110" x2="110" y2="130" 
          stroke="#4a4a4a" strokeWidth="3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        />
      )}
      {/* Right arm */}
      {wrongGuesses >= 4 && (
        <motion.line 
          x1="140" y1="110" x2="170" y2="130" 
          stroke="#4a4a4a" strokeWidth="3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        />
      )}
      {/* Left leg */}
      {wrongGuesses >= 5 && (
        <motion.line 
          x1="140" y1="160" x2="110" y2="190" 
          stroke="#4a4a4a" strokeWidth="3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        />
      )}
      {/* Right leg */}
      {wrongGuesses >= 6 && (
        <motion.line 
          x1="140" y1="160" x2="170" y2="190" 
          stroke="#4a4a4a" strokeWidth="3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        />
      )}
    </svg>
  );
}

export default function HangmanGame() {
  const { trackGameComplete } = useAnalytics();
  const { lang } = useLanguage();

  const [word] = useState(() => getWord(lang));
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [message, setMessage] = useState('');

  const handleGuess = useCallback((letter: string) => {
    if (isComplete || guessedLetters.has(letter)) return;

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    if (!word.includes(letter)) {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);
      
      if (newWrong >= MAX_GUESSES) {
        setIsComplete(true);
        setIsWon(false);
        trackGameComplete('hangman', { won: false, wrongGuesses: newWrong });
      }
    } else {
      // Check if all letters guessed
      const allGuessed = word.split('').every(l => newGuessed.has(l));
      if (allGuessed) {
        setIsComplete(true);
        setIsWon(true);
        trackGameComplete('hangman', { won: true, wrongGuesses });
      }
    }
  }, [word, guessedLetters, wrongGuesses, isComplete, trackGameComplete]);

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const letter = e.key.toUpperCase();
      if (/^[A-Z]$/.test(letter)) {
        handleGuess(letter);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGuess]);

  const reset = () => {
    window.location.reload();
  };

  const displayWord = word.split('').map(letter => 
    guessedLetters.has(letter) ? letter : '_'
  );

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="max-w-2xl mx-auto">
      {/* Lives */}
      <div className="flex justify-center gap-1 mb-4">
        {Array.from({ length: MAX_GUESSES }).map((_, i) => (
          <Heart 
            key={i} 
            className={`w-6 h-6 ${i < MAX_GUESSES - wrongGuesses ? 'text-red-500 fill-red-500' : 'text-sand-200'}`}
          />
        ))}
      </div>

      {/* Hangman figure */}
      <HangmanFigure wrongGuesses={wrongGuesses} />

      {/* Word display */}
      <div className="flex justify-center gap-2 mb-6 mt-4">
        {displayWord.map((letter, i) => (
          <div 
            key={i}
            className="w-10 h-12 border-b-2 border-coal flex items-end justify-center text-2xl font-bold"
          >
            {letter !== '_' && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {letter}
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-2 mb-4"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard */}
      {!isComplete && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {alphabet.map(letter => {
            const isGuessed = guessedLetters.has(letter);
            const isCorrect = word.includes(letter);
            
            return (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={isGuessed}
                className={`w-9 h-10 rounded-lg font-bold text-sm transition ${
                  isGuessed 
                    ? isCorrect 
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : 'bg-red-100 text-red-700 cursor-default'
                    : 'bg-white border border-sand-200 text-coal hover:bg-violet-50 hover:border-violet-300'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border rounded-xl p-6 ${
              isWon ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className={`w-5 h-5 ${isWon ? 'text-green-500' : 'text-red-500'}`} />
              <h3 className="font-bold text-lg">
                {isWon ? 'You Won!' : 'Game Over'}
              </h3>
            </div>

            {!isWon && (
              <p className="text-center mb-4">
                The word was: <span className="font-bold">{word}</span>
              </p>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">
                  {guessedLetters.size - wrongGuesses}
                </p>
                <p className="text-sm text-sand-500">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{wrongGuesses}</p>
                <p className="text-sm text-sand-500">Wrong</p>
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 bg-violet-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-violet-600 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
