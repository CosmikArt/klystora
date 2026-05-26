import { useState, useEffect, useCallback } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Clock, Zap, Shuffle, Delete, CornerDownLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Puzzle {
  letters: string[];
  validWords: string[];
  timeLimit: number;
}

const PUZZLES: Record<string, Puzzle[]> = {
  en: [
    { letters: ['T', 'R', 'A', 'I', 'N', 'E', 'D'], validWords: ['TRAINED', 'TRAIN', 'TRADE', 'TREAD', 'TIRED', 'TRIED', 'RAINED', 'RATED', 'READ', 'REIN', 'RENT', 'RIDE', 'RIND', 'RITE', 'TIDE', 'TIED', 'TIER', 'TINE', 'TIRE', 'TRAIN', 'TRADE', 'TREAD', 'TREND', 'TRIED', 'AIDE', 'AIRE', 'ANTE', 'ANTI', 'DARE', 'DARN', 'DATE', 'DEAN', 'DEAR', 'DIET', 'DINE', 'DIRE', 'DIRT', 'DRAIN', 'EARN', 'EDIT', 'IDEA', 'NEAR', 'NEAT', 'NERD', 'RAIN', 'RANT', 'RATE', 'READ', 'REIN', 'RENT', 'RIDE', 'RIND', 'RITE', 'TIDE', 'TIED', 'TIER', 'TINE', 'TIRE', 'TRADE', 'TREAD', 'TREND'], timeLimit: 120 },
    { letters: ['S', 'T', 'A', 'R', 'T', 'E', 'D'], validWords: ['STARTED', 'START', 'STARE', 'STATED', 'STEER', 'STARE', 'TASTE', 'TREAT', 'DARES', 'DARTS', 'DATES', 'DEARS', 'DRATS', 'RATES', 'READS', 'RESTS', 'STARE', 'START', 'STATE', 'TASTE', 'TEARS', 'TREAT', 'DARE', 'DART', 'DATE', 'DEAR', 'EAST', 'EATS', 'RATE', 'READ', 'REDS', 'REST', 'SATE', 'SEAR', 'SEAT', 'STAR', 'STAT', 'TARE', 'TART', 'TEAR', 'TEAS', 'TEST', 'TRAD', 'TRET', 'ARE', 'ART', 'ATE', 'EAR', 'EAT', 'RAT', 'RED', 'RES', 'SAD', 'SAT', 'SEA', 'SET', 'TAD', 'TAR', 'TAT', 'TEA', 'TET'], timeLimit: 120 },
  ],
  es: [
    { letters: ['C', 'A', 'S', 'T', 'I', 'L', 'L', 'O'], validWords: ['CASTILLO', 'CASTILLO', 'CALLISTO', 'COSTILLA', 'CASTILLO', 'COSTILLA', 'LISTA', 'LLANO', 'LOCAL', 'OSTAL', 'TALLO', 'TOLLA', 'ALTO', 'ASILO', 'CALLO', 'CASCO', 'CASTA', 'CATOS', 'CISTA', 'CLARO', 'CLASE', 'CLISO', 'COITO', 'COLLA', 'COSTA', 'LACIO', 'LACTO', 'LAICO', 'LICOR', 'LISTA', 'LLANO', 'LOCAL', 'LOTOS', 'OCTAL', 'OSTAL', 'SALTO', 'SILLA', 'STALL', 'TALLO', 'TASCO', 'TOLLA', 'ALAS', 'ALTO', 'ASILO', 'ATAS', 'CALA', 'CALL', 'CALO', 'CASA', 'CAST', 'CATO', 'CIAO', 'CITA', 'CLAN', 'CLAR', 'COCA', 'COLA', 'COST', 'COTA', 'LACA', 'LACO', 'LADO', 'LAZO', 'LICA', 'LILA', 'LISA', 'LIST', 'LLAN', 'LOCA', 'LOCO', 'LOTA', 'OCAS', 'OLLA', 'OSAR', 'OTAS', 'SACA', 'SALA', 'SALO', 'SATO', 'SILL', 'SITO', 'SOLO', 'TACA', 'TACO', 'TALA', 'TALO', 'TASA', 'TICO', 'TILA', 'TILO', 'TOCA', 'TOLA', 'TOSO', 'ALO', 'ALA', 'ALO', 'ASO', 'ATO', 'CAL', 'CAS', 'CAT', 'CIA', 'CIO', 'CLA', 'COL', 'COS', 'COT', 'LAC', 'LAD', 'LAS', 'LAT', 'LIC', 'LIL', 'LIS', 'LLA', 'LOC', 'LOT', 'OAS', 'OCA', 'OLA', 'OSA', 'OTA', 'SAL', 'SAN', 'SAT', 'SIL', 'SIN', 'SOC', 'SOL', 'SON', 'TAL', 'TAN', 'TAS', 'TIL', 'TOC', 'TOL', 'TOS'], timeLimit: 120 },
  ],
  default: [
    { letters: ['T', 'R', 'A', 'I', 'N', 'E', 'D'], validWords: ['TRAINED', 'TRAIN', 'TRADE', 'TREAD', 'TIRED', 'TRIED', 'RAINED', 'RATED', 'READ', 'REIN', 'RENT', 'RIDE', 'RIND', 'RITE', 'TIDE', 'TIED', 'TIER', 'TINE', 'TIRE', 'TRAIN', 'TRADE', 'TREAD', 'TREND', 'TRIED', 'AIDE', 'AIRE', 'ANTE', 'ANTI', 'DARE', 'DARN', 'DATE', 'DEAN', 'DEAR', 'DIET', 'DINE', 'DIRE', 'DIRT', 'DRAIN', 'EARN', 'EDIT', 'IDEA', 'NEAR', 'NEAT', 'NERD', 'RAIN', 'RANT', 'RATE', 'READ', 'REIN', 'RENT', 'RIDE', 'RIND', 'RITE', 'TIDE', 'TIED', 'TIER', 'TINE', 'TIRE', 'TRADE', 'TREAD', 'TREND'], timeLimit: 120 },
  ],
};

function getPuzzle(lang: string): Puzzle {
  const puzzles = PUZZLES[lang] || PUZZLES['default'];
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

export default function AnagramsGame() {
  const { trackGameComplete } = useAnalytics();
  const { lang } = useLanguage();

  const [puzzle] = useState(() => getPuzzle(lang));
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(puzzle.timeLimit);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [usedLetters, setUsedLetters] = useState<boolean[]>(Array(puzzle.letters.length).fill(false));

  useEffect(() => {
    if (!isPlaying || isComplete) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsComplete(true);
          setIsPlaying(false);
          trackGameComplete('anagrams', { wordsFound: foundWords.length, time: puzzle.timeLimit });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying, isComplete, foundWords.length, puzzle.timeLimit, trackGameComplete]);

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(puzzle.timeLimit);
    setFoundWords([]);
    setCurrentWord('');
    setIsComplete(false);
    setUsedLetters(Array(puzzle.letters.length).fill(false));
  };

  const handleLetterClick = (index: number) => {
    if (!isPlaying || isComplete || usedLetters[index]) return;
    
    setCurrentWord(prev => prev + puzzle.letters[index]);
    setUsedLetters(prev => {
      const newUsed = [...prev];
      newUsed[index] = true;
      return newUsed;
    });
    setMessage('');
  };

  const submitWord = () => {
    if (!isPlaying || currentWord.length < 3) {
      showMessage('Too short', 'error');
      return;
    }

    const word = currentWord.toUpperCase();

    if (foundWords.includes(word)) {
      showMessage('Already found', 'error');
      return;
    }

    if (!puzzle.validWords.includes(word)) {
      showMessage('Not a valid word', 'error');
      return;
    }

    setFoundWords(prev => [...prev, word]);
    showMessage(`+${word.length * 10}`, 'success');
    setCurrentWord('');
    setUsedLetters(Array(puzzle.letters.length).fill(false));

    // Check if all words found
    const allFound = puzzle.validWords.every(w => [...foundWords, word].includes(w));
    if (allFound) {
      setIsComplete(true);
      setIsPlaying(false);
      trackGameComplete('anagrams', { wordsFound: foundWords.length + 1, time: puzzle.timeLimit - timeLeft });
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 1500);
  };

  const deleteLast = () => {
    if (currentWord.length === 0) return;
    
    const lastLetter = currentWord[currentWord.length - 1];
    setCurrentWord(prev => prev.slice(0, -1));
    
    // Find the last used instance of this letter and free it
    setUsedLetters(prev => {
      const newUsed = [...prev];
      for (let i = puzzle.letters.length - 1; i >= 0; i--) {
        if (newUsed[i] && puzzle.letters[i] === lastLetter) {
          newUsed[i] = false;
          break;
        }
      }
      return newUsed;
    });
  };

  const shuffle = () => {
    // Shuffle letters while preserving used state
    const indices = puzzle.letters.map((_, i) => i);
    const shuffled = indices.sort(() => Math.random() - 0.5);
    // We need to re-render with shuffled order
    // For simplicity, we'll just shuffle the display
    setUsedLetters(prev => {
      const newUsed = Array(puzzle.letters.length).fill(false);
      // Keep used letters marked
      for (let i = 0; i < prev.length; i++) {
        if (prev[i]) newUsed[i] = true;
      }
      return newUsed;
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-1 ${timeLeft < 30 ? 'text-red-500' : 'text-sand-500'}`}>
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{formatTime(timeLeft)}</span>
          </div>
          <div className="flex items-center gap-1 text-sand-500">
            <Zap className="w-4 h-4" />
            <span className="text-sm">{foundWords.length}</span>
          </div>
        </div>
        {!isPlaying && !isComplete && (
          <button
            onClick={startGame}
            className="px-6 py-2 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600 transition"
          >
            Start
          </button>
        )}
      </div>

      {/* Current Word */}
      <div className="text-center mb-4">
        <div className="text-3xl font-bold h-10 tracking-widest">
          {currentWord || (isPlaying ? '...' : 'Click Start')}
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
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter Tiles */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {puzzle.letters.map((letter, i) => (
          <button
            key={i}
            onClick={() => handleLetterClick(i)}
            disabled={!isPlaying || usedLetters[i]}
            className={`w-12 h-12 rounded-lg font-bold text-xl transition ${
              usedLetters[i]
                ? 'bg-sand-100 text-sand-300 cursor-not-allowed'
                : 'bg-white border-2 border-sand-200 text-coal hover:border-violet-400 hover:bg-violet-50'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Controls */}
      {isPlaying && (
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
      )}

      {/* Found Words */}
      {foundWords.length > 0 && (
        <div className="bg-white border border-sand-200 rounded-xl p-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {foundWords.sort().map(word => (
              <span key={word} className="px-2 py-1 bg-violet-100 text-violet-700 rounded-lg text-sm font-medium">
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-violet-50 border border-violet-200 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-violet-500" />
              <h3 className="font-bold text-lg">Time's Up!</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{foundWords.length}</p>
                <p className="text-sm text-sand-500">Words</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">
                  {foundWords.reduce((sum, w) => sum + w.length * 10, 0)}
                </p>
                <p className="text-sm text-sand-500">Score</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">
                  {Math.round((foundWords.length / puzzle.validWords.length) * 100)}%
                </p>
                <p className="text-sm text-sand-500">Found</p>
              </div>
            </div>

            <button
              onClick={startGame}
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
