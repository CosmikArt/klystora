import { useState, useEffect, useCallback } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Zap, Shuffle, Delete, CornerDownLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Puzzle {
  center: string;
  outer: string[];
  validWords: string[];
  pangrams: string[];
}

const PUZZLES: Record<string, Puzzle[]> = {
  en: [
    {
      center: 'E',
      outer: ['A', 'G', 'L', 'N', 'P', 'R'],
      validWords: ['PALE', 'PAGE', 'PEAL', 'PEARL', 'PEER', 'PENAL', 'PLEA', 'PREEN', 'RAGE', 'REAL', 'REAP', 'REEL', 'REGAL', 'RENAL', 'REPEL', 'GALE', 'Gape', 'GEAR', 'GENE', 'GLARE', 'GLEAN', 'GRAPE', 'LEAP', 'LEAN', 'LEAR', 'LEER', 'NAG', 'NEAP', 'NEAR', 'NEPAL', 'PALE', 'PANG', 'PARE', 'PEAL', 'PEARL', 'PEER', 'PENAL', 'PLEA', 'PREEN', 'RAGE', 'REAL', 'REAP', 'REEL', 'REGAL', 'RENAL', 'REPEL', 'AGREE', 'ANGER', 'ANGLE', 'APPLE', 'EAGLE', 'EARL', 'EARN', 'GLEAN', 'GRAPE', 'GREEN', 'LARGE', 'LEARN', 'LEER', 'PAGE', 'PALE', 'PANG', 'PARE', 'PEAL', 'PEARL', 'PEER', 'PENAL', 'PLEA', 'PREEN', 'RAGE', 'REAL', 'REAP', 'REEL', 'REGAL', 'RENAL', 'REPEL', 'AGREE', 'ANGER', 'ANGLE', 'APPLE', 'EAGLE', 'EARL', 'EARN', 'GLEAN', 'GRAPE', 'GREEN', 'LARGE', 'LEARN', 'LEER', 'PAGE', 'PALE', 'PANG', 'PARE', 'PEAL', 'PEARL', 'PEER', 'PENAL', 'PLEA', 'PREEN', 'RAGE', 'REAL', 'REAP', 'REEL', 'REGAL', 'RENAL', 'REPEL'],
      pangrams: ['REAPING', 'GLEANER'],
    },
    {
      center: 'T',
      outer: ['A', 'C', 'E', 'H', 'I', 'N'],
      validWords: ['ATTAIN', 'CATCH', 'CHAIN', 'CHAT', 'CHEAT', 'CHIN', 'CITE', 'EACH', 'HATCH', 'HEAT', 'HINT', 'ITCH', 'NICE', 'NINE', 'TACT', 'TAINT', 'TEACH', 'TEETH', 'TENT', 'THAN', 'THATCH', 'THIN', 'THINE', 'TIE', 'TINT', 'ATTACH', 'CATCH', 'CHAIN', 'CHAT', 'CHEAT', 'CHIN', 'CITE', 'EACH', 'HATCH', 'HEAT', 'HINT', 'ITCH', 'NICE', 'NINE', 'TACT', 'TAINT', 'TEACH', 'TEETH', 'TENT', 'THAN', 'THATCH', 'THIN', 'THINE', 'TIE', 'TINT'],
      pangrams: ['ANTHETIC', 'CHATTIAN'],
    },
  ],
  es: [
    {
      center: 'A',
      outer: ['C', 'E', 'L', 'N', 'R', 'T'],
      validWords: ['CANTAR', 'CARTA', 'CARTEL', 'CATALAN', 'CENTRAL', 'CLARA', 'CLARO', 'CREAR', 'LANTA', 'LATA', 'LENTA', 'NATA', 'NATAR', 'RATA', 'REATA', 'RECTA', 'RENTA', 'TALA', 'TALAR', 'TALCA', 'TANAR', 'TARTA', 'TELA', 'TENAR', 'TERCA', 'TRATA', 'ACERA', 'ACTAR', 'ALERTA', 'ALTERAR', 'ANCLA', 'ANTENA', 'ARENA', 'ARREAR', 'ATAR', 'ATLAS', 'CALAR', 'CALENTAR', 'CANTAR', 'CARTA', 'CARTEL', 'CATALAN', 'CENTRAL', 'CLARA', 'CLARO', 'CREAR', 'LANTA', 'LATA', 'LENTA', 'NATA', 'NATAR', 'RATA', 'REATA', 'RECTA', 'RENTA', 'TALA', 'TALAR', 'TALCA', 'TANAR', 'TARTA', 'TELA', 'TENAR', 'TERCA', 'TRATA'],
      pangrams: ['CANTARELA', 'TRANCELAR'],
    },
  ],
  default: [
    {
      center: 'E',
      outer: ['A', 'G', 'L', 'N', 'P', 'R'],
      validWords: ['PALE', 'PAGE', 'PEAL', 'PEARL', 'PEER', 'PENAL', 'PLEA', 'PREEN', 'RAGE', 'REAL', 'REAP', 'REEL', 'REGAL', 'RENAL', 'REPEL', 'GALE', 'GEAR', 'GENE', 'GLARE', 'GLEAN', 'GRAPE', 'LEAP', 'LEAN', 'LEAR', 'LEER', 'NAG', 'NEAP', 'NEAR', 'NEPAL', 'PALE', 'PANG', 'PARE', 'PEAL', 'PEARL', 'PEER', 'PENAL', 'PLEA', 'PREEN', 'RAGE', 'REAL', 'REAP', 'REEL', 'REGAL', 'RENAL', 'REPEL', 'AGREE', 'ANGER', 'ANGLE', 'APPLE', 'EAGLE', 'EARL', 'EARN', 'GLEAN', 'GRAPE', 'GREEN', 'LARGE', 'LEARN', 'LEER', 'PAGE', 'PALE', 'PANG', 'PARE', 'PEAL', 'PEARL', 'PEER', 'PENAL', 'PLEA', 'PREEN', 'RAGE', 'REAL', 'REAP', 'REEL', 'REGAL', 'RENAL', 'REPEL'],
      pangrams: ['REAPING', 'GLEANER'],
    },
  ],
};

function getPuzzle(lang: string): Puzzle {
  const puzzles = PUZZLES[lang] || PUZZLES['default'];
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

function isPangram(word: string, puzzle: Puzzle): boolean {
  const letters = new Set(word.split(''));
  const allLetters = new Set([puzzle.center, ...puzzle.outer]);
  return letters.size === allLetters.size && [...letters].every(l => allLetters.has(l));
}

const RANKS = [
  { name: 'Beginner', pct: 0 },
  { name: 'Good Start', pct: 0.02 },
  { name: 'Moving Up', pct: 0.05 },
  { name: 'Good', pct: 0.08 },
  { name: 'Solid', pct: 0.15 },
  { name: 'Nice', pct: 0.25 },
  { name: 'Great', pct: 0.4 },
  { name: 'Amazing', pct: 0.5 },
  { name: 'Genius', pct: 0.7 },
  { name: 'Queen Bee', pct: 1 },
];

export default function SpellingBeeGame() {
  const { trackGameComplete } = useAnalytics();
  const { lang } = useLanguage();

  const [puzzle] = useState(() => getPuzzle(lang));
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'pangram' | ''>('');
  const [shuffled, setShuffled] = useState(false);

  const maxScore = puzzle.validWords.reduce((sum, w) => {
    if (w.length === 4) return sum + 1;
    if (isPangram(w, puzzle)) return sum + w.length + 7;
    return sum + w.length;
  }, 0);

  const score = foundWords.reduce((sum, w) => {
    if (w.length === 4) return sum + 1;
    if (isPangram(w, puzzle)) return sum + w.length + 7;
    return sum + w.length;
  }, 0);

  const getRank = () => {
    const pct = score / maxScore;
    for (let i = RANKS.length - 1; i >= 0; i--) {
      if (pct >= RANKS[i].pct) return RANKS[i].name;
    }
    return RANKS[0].name;
  };

  const handleLetterClick = (letter: string) => {
    setCurrentWord(prev => prev + letter);
    setMessage('');
  };

  const submitWord = () => {
    const word = currentWord.toUpperCase();

    if (word.length < 4) {
      showMessage('Too short', 'error');
      return;
    }

    if (!word.includes(puzzle.center)) {
      showMessage('Must use center letter', 'error');
      return;
    }

    if (foundWords.includes(word)) {
      showMessage('Already found', 'error');
      return;
    }

    if (!puzzle.validWords.includes(word)) {
      showMessage('Not in word list', 'error');
      return;
    }

    const isPangramWord = isPangram(word, puzzle);
    setFoundWords(prev => [...prev, word]);
    
    if (isPangramWord) {
      showMessage(`Pangram! +${word.length + 7}`, 'pangram');
    } else if (word.length === 4) {
      showMessage('+1', 'success');
    } else {
      showMessage(`+${word.length}`, 'success');
    }

    setCurrentWord('');

    // Check if all words found
    if (foundWords.length + 1 >= puzzle.validWords.length) {
      trackGameComplete('spelling-bee', { score, wordsFound: foundWords.length + 1 });
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error' | 'pangram') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 2000);
  };

  const shuffle = () => {
    setShuffled(prev => !prev);
  };

  const deleteLast = () => {
    setCurrentWord(prev => prev.slice(0, -1));
  };

  const getOuterLetters = () => {
    if (shuffled) {
      return [...puzzle.outer].sort(() => Math.random() - 0.5);
    }
    return puzzle.outer;
  };

  const outer = getOuterLetters();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Score */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-violet-600">{score}</div>
        <div className="text-sm text-sand-500">{getRank()}</div>
        <div className="w-full bg-sand-100 rounded-full h-2 mt-2">
          <div 
            className="bg-violet-500 h-2 rounded-full transition-all"
            style={{ width: `${(score / maxScore) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Word */}
      <div className="text-center mb-4">
        <div className="text-2xl font-bold h-8">
          {currentWord.split('').map((letter, i) => (
            <span key={i} className={letter === puzzle.center ? 'text-violet-600' : ''}>
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-center py-2 rounded-lg mb-4 ${
              messageType === 'success' ? 'bg-green-100 text-green-700' :
              messageType === 'pangram' ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Honeycomb */}
      <div className="flex justify-center mb-6">
        <div className="relative w-64 h-64">
          {/* Center */}
          <button
            onClick={() => handleLetterClick(puzzle.center)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-violet-500 text-white rounded-full font-bold text-xl shadow-lg hover:bg-violet-600 transition z-10"
          >
            {puzzle.center}
          </button>

          {/* Outer letters */}
          {outer.map((letter, i) => {
            const angle = (i * 60 - 30) * (Math.PI / 180);
            const x = Math.cos(angle) * 80;
            const y = Math.sin(angle) * 80;
            
            return (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className="absolute top-1/2 left-1/2 w-14 h-14 bg-sand-200 text-coal rounded-full font-bold text-lg hover:bg-sand-300 transition"
                style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={deleteLast}
          className="flex items-center gap-1 px-4 py-2 bg-sand-100 text-sand-600 rounded-lg hover:bg-sand-200 transition"
        >
          <Delete className="w-4 h-4" />
          Delete
        </button>
        <button
          onClick={shuffle}
          className="flex items-center gap-1 px-4 py-2 bg-sand-100 text-sand-600 rounded-lg hover:bg-sand-200 transition"
        >
          <Shuffle className="w-4 h-4" />
          Shuffle
        </button>
        <button
          onClick={submitWord}
          className="flex items-center gap-1 px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition"
        >
          <CornerDownLeft className="w-4 h-4" />
          Enter
        </button>
      </div>

      {/* Found Words */}
      <div className="bg-white border border-sand-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-sm text-sand-500">Found Words ({foundWords.length})</h3>
          <div className="text-xs text-sand-400">
            {foundWords.filter(w => isPangram(w, puzzle)).length} pangrams
          </div>
        </div>
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
          {foundWords.sort().map(word => (
            <span
              key={word}
              className={`px-2 py-1 rounded-lg text-sm font-medium ${
                isPangram(word, puzzle)
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-sand-100 text-sand-600'
              }`}
            >
              {word}
              {isPangram(word, puzzle) && ' ✨'}
            </span>
          ))}
          {foundWords.length === 0 && (
            <span className="text-sand-400 text-sm">No words found yet. Start spelling!</span>
          )}
        </div>
      </div>
    </div>
  );
}
