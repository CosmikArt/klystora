import { useState, useEffect, useCallback } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Lightbulb, Lock, Unlock, Check } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// Quotes by language
const QUOTES: Record<string, { text: string; author: string }[]> = {
  en: [
    { text: "THE ONLY WAY TO DO GREAT WORK IS TO LOVE WHAT YOU DO", author: "Steve Jobs" },
    { text: "IN THE MIDDLE OF DIFFICULTY LIES OPPORTUNITY", author: "Albert Einstein" },
    { text: "SUCCESS IS NOT FINAL FAILURE IS NOT FATAL", author: "Winston Churchill" },
    { text: "BE THE CHANGE THAT YOU WISH TO SEE IN THE WORLD", author: "Mahatma Gandhi" },
    { text: "THE BEST TIME TO PLANT A TREE WAS TWENTY YEARS AGO", author: "Chinese Proverb" },
  ],
  es: [
    { text: "EN UN LUGAR DE LA MANCHA DE CUYO NOMBRE NO QUIERO ACORDARME", author: "Miguel de Cervantes" },
    { text: "EL QUE LEE MUCHO Y ANDA MUCHO VE MUCHO Y SABE MUCHO", author: "Miguel de Cervantes" },
    { text: "PENSAR ES EL TRABAJO MAS DIFICIL QUE EXISTE", author: "Henry Ford" },
    { text: "LA VIDA NO ES LA QUE UNO VIVIO SINO LA QUE UNO RECUERDA", author: "Gabriel Garcia Marquez" },
  ],
  fr: [
    { text: "JE PENSE DONC JE SUIS", author: "Rene Descartes" },
    { text: "LE MONDE EST DANGEREUX A VIVRE", author: "Albert Einstein" },
    { text: "ON NE VOIT BIEN QU AVEC LE COEUR", author: "Antoine de Saint-Exupery" },
  ],
  de: [
    { text: "WAS WIR WISSEN IST EIN TROPFEN WAS WIR NICHT WISSEN EIN OZEAN", author: "Isaac Newton" },
    { text: "OHNE MUSIK WARE DAS LEBEN EIN IRRTUM", author: "Friedrich Nietzsche" },
  ],
  default: [
    { text: "THE ONLY WAY TO DO GREAT WORK IS TO LOVE WHAT YOU DO", author: "Steve Jobs" },
    { text: "IN THE MIDDLE OF DIFFICULTY LIES OPPORTUNITY", author: "Albert Einstein" },
  ],
};

function getQuotes(lang: string) {
  return QUOTES[lang] || QUOTES['default'];
}

// Generate substitution cipher
function generateCipher(): Record<string, string> {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const shuffled = alphabet.split('').sort(() => Math.random() - 0.5);
  const cipher: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    cipher[alphabet[i]] = shuffled[i];
  }
  return cipher;
}

// Encrypt text
function encrypt(text: string, cipher: Record<string, string>): string {
  return text.split('').map(c => cipher[c] || c).join('');
}

export default function CryptogramGame() {
  const { trackGameComplete } = useAnalytics();
  const { lang } = useLanguage();

  const [quote, setQuote] = useState(() => {
    const quotes = getQuotes(lang);
    return quotes[Math.floor(Math.random() * quotes.length)];
  });
  const [cipher, setCipher] = useState(() => generateCipher());
  const [guesses, setGuesses] = useState<Record<string, string>>({});
  const [hints, setHints] = useState(3);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [selectedCipher, setSelectedCipher] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const encrypted = encrypt(quote.text, cipher);

  // Check if puzzle is solved
  useEffect(() => {
    const allLetters = [...new Set(quote.text.replace(/[^A-Z]/g, ''))];
    const allGuessed = allLetters.every(l => guesses[l] === l);
    if (allGuessed && !isComplete) {
      setIsComplete(true);
      trackGameComplete('cryptogram', { time: elapsed, hintsUsed: 3 - hints });
    }
  }, [guesses, quote.text, isComplete, elapsed, hints, trackGameComplete]);

  const handleLetterClick = (cipherLetter: string) => {
    if (isComplete) return;
    setSelectedCipher(cipherLetter);
    setMessage('');
  };

  const handleGuess = (plainLetter: string) => {
    if (!selectedCipher || isComplete) return;

    // Find which cipher letter maps to this plain letter
    const currentMapping = Object.entries(cipher).find(([_, v]) => v === selectedCipher);
    if (!currentMapping) return;

    const [correctPlain] = currentMapping;

    setGuesses(prev => ({ ...prev, [correctPlain]: plainLetter }));

    if (plainLetter === correctPlain) {
      setMessage('Correct!');
    } else {
      setMessage('Not quite...');
    }

    setSelectedCipher(null);
  };

  const useHint = () => {
    if (hints <= 0 || isComplete) return;

    // Find an unguessed letter
    const allLetters = [...new Set(quote.text.replace(/[^A-Z]/g, ''))];
    const unguessed = allLetters.filter(l => guesses[l] !== l);
    if (unguessed.length === 0) return;

    const letter = unguessed[Math.floor(Math.random() * unguessed.length)];
    setGuesses(prev => ({ ...prev, [letter]: letter }));
    setHints(prev => prev - 1);
    setMessage(`Revealed: ${letter}`);
  };

  const reset = () => {
    const quotes = getQuotes(lang);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setCipher(generateCipher());
    setGuesses({});
    setHints(3);
    setIsComplete(false);
    setSelectedCipher(null);
    setMessage('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  // Get frequency of each cipher letter
  const getFrequency = (letter: string) => {
    return encrypted.split('').filter(c => c === letter).length;
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sand-500">
            <Lock className="w-4 h-4" />
            <span className="font-mono">{formatTime(elapsed)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={useHint}
            disabled={hints <= 0 || isComplete}
            className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium bg-amber-100 text-amber-600 hover:bg-amber-200 transition disabled:opacity-50"
          >
            <Lightbulb className="w-4 h-4" />
            {hints}
          </button>
        </div>
      </div>

      {/* Encrypted Text */}
      <div className="bg-white border border-sand-200 rounded-xl p-6 mb-6">
        <div className="text-center">
          {encrypted.split('').map((char, i) => {
            if (char === ' ') {
              return <span key={i} className="inline-block w-4" />;
            }
            if (!/[A-Z]/.test(char)) {
              return <span key={i} className="text-sand-400">{char}</span>;
            }

            const plainLetter = Object.entries(cipher).find(([_, v]) => v === char)?.[0];
            const guessed = plainLetter ? guesses[plainLetter] : null;
            const isCorrect = guessed === plainLetter;
            const isSelected = selectedCipher === char;

            return (
              <button
                key={i}
                onClick={() => handleLetterClick(char)}
                className={`inline-flex flex-col items-center mx-0.5 p-1 rounded transition ${
                  isSelected
                    ? 'bg-violet-100 ring-2 ring-violet-500'
                    : isCorrect
                    ? 'bg-green-50'
                    : guessed
                    ? 'bg-red-50'
                    : 'hover:bg-sand-50'
                }`}
              >
                <span className={`text-lg font-mono font-bold ${
                  isCorrect ? 'text-green-600' : guessed ? 'text-red-600' : 'text-coal'
                }`}>
                  {guessed || '_'}
                </span>
                <span className="text-xs text-sand-400">{char}</span>
              </button>
            );
          })}
        </div>

        {/* Author */}
        <p className="text-center text-sand-500 mt-4 text-sm">
          — {quote.author}
        </p>
      </div>

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-center py-2 rounded-lg mb-4 ${
              message.includes('Correct') || message.includes('Revealed')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alphabet Keyboard */}
      {!isComplete && (
        <div className="mb-6">
          <p className="text-sm text-sand-500 mb-2 text-center">
            {selectedCipher
              ? `What letter does "${selectedCipher}" represent?`
              : 'Click a cipher letter above, then select its real letter below'}
          </p>
          <div className="flex flex-wrap justify-center gap-1">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
              const isUsed = Object.values(guesses).includes(letter);
              return (
                <button
                  key={letter}
                  onClick={() => handleGuess(letter)}
                  disabled={!selectedCipher || isUsed}
                  className={`w-8 h-8 rounded-lg font-mono font-bold text-sm transition ${
                    isUsed
                      ? 'bg-sand-100 text-sand-300 cursor-not-allowed'
                      : selectedCipher
                      ? 'bg-violet-100 text-violet-600 hover:bg-violet-200'
                      : 'bg-sand-50 text-sand-400 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Frequency Analysis */}
      <div className="bg-sand-50 rounded-xl p-4 mb-6">
        <h3 className="text-sm font-semibold text-sand-600 mb-2">Letter Frequency</h3>
        <div className="flex flex-wrap gap-2">
          {[...new Set(encrypted.replace(/[^A-Z]/g, ''))].sort().map(letter => (
            <div key={letter} className="flex items-center gap-1 text-xs">
              <span className="font-mono font-bold">{letter}:</span>
              <span className="text-sand-500">{getFrequency(letter)}</span>
            </div>
          ))}
        </div>
      </div>

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
              <Unlock className="w-5 h-5 text-violet-500" />
              <h3 className="font-bold text-lg">Solved!</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{formatTime(elapsed)}</p>
                <p className="text-sm text-sand-500">Time</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{3 - hints}</p>
                <p className="text-sm text-sand-500">Hints Used</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">
                  {hints === 3 ? 'Perfect!' : hints > 0 ? 'Great!' : 'Good!'}
                </p>
                <p className="text-sm text-sand-500">Rating</p>
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 bg-violet-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-violet-600 transition"
            >
              <RotateCcw className="w-4 h-4" />
              New Puzzle
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!isComplete && (
        <div className="mt-6 flex items-start gap-3 text-sm text-sand-500">
          <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="mb-2">Crack the substitution cipher:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Each letter has been replaced with another letter</li>
              <li>Click a cipher letter, then select its real letter</li>
              <li>Use frequency analysis — E, T, A are most common in English</li>
              <li>Short words like "THE" and "AND" are good starting points</li>
              <li>Use hints if you get stuck</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
