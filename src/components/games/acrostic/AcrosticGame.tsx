import { useState, useEffect, useCallback } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Lightbulb, Check } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Clue {
  num: number;
  text: string;
  answer: string;
}

interface Puzzle {
  clues: Clue[];
  hiddenWord: string;
  quote: string;
  author: string;
}

const PUZZLES: Record<string, Puzzle[]> = {
  en: [
    {
      clues: [
        { num: 1, text: 'Greek letter often used in math', answer: 'SIGMA' },
        { num: 2, text: 'To make something happen', answer: 'CAUSE' },
        { num: 3, text: 'Large body of water', answer: 'OCEAN' },
        { num: 4, text: 'Opposite of false', answer: 'RIGHT' },
        { num: 5, text: 'To look at and comprehend', answer: 'SEIZE' },
      ],
      hiddenWord: 'SCORE',
      quote: 'The score never interested me, only the game.',
      author: 'Mae West',
    },
    {
      clues: [
        { num: 1, text: 'To begin or start', answer: 'START' },
        { num: 2, text: 'A type of tree', answer: 'MAPLE' },
        { num: 3, text: 'To speak or say', answer: 'UTTER' },
        { num: 4, text: 'A type of bird', answer: 'RAVEN' },
        { num: 5, text: 'To cut with scissors', answer: 'SNIPS' },
      ],
      hiddenWord: 'SMART',
      quote: 'Be smart, not clever.',
      author: 'Anonymous',
    },
  ],
  es: [
    {
      clues: [
        { num: 1, text: 'Animal que da leche', answer: 'VACAS' },
        { num: 2, text: 'Lo opuesto de frío', answer: 'CALOR' },
        { num: 3, text: 'Donde vives', answer: 'CASAS' },
        { num: 4, text: 'Lo que haces con los ojos', answer: 'VERAS' },
        { num: 5, text: 'Instrumento musical de cuerda', answer: 'ARPA' },
      ],
      hiddenWord: 'VOCAL',
      quote: 'La música es el lenguaje universal.',
      author: 'Henry Wadsworth Longfellow',
    },
  ],
  default: [
    {
      clues: [
        { num: 1, text: 'Greek letter', answer: 'SIGMA' },
        { num: 2, text: 'To make happen', answer: 'CAUSE' },
        { num: 3, text: 'Large water body', answer: 'OCEAN' },
        { num: 4, text: 'Opposite of false', answer: 'RIGHT' },
        { num: 5, text: 'To grasp', answer: 'SEIZE' },
      ],
      hiddenWord: 'SCORE',
      quote: 'The score never interested me, only the game.',
      author: 'Mae West',
    },
  ],
};

function getPuzzle(lang: string): Puzzle {
  const puzzles = PUZZLES[lang] || PUZZLES['default'];
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

export default function AcrosticGame() {
  const { trackGameComplete } = useAnalytics();
  const { lang } = useLanguage();

  const [puzzle] = useState(() => getPuzzle(lang));
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  const handleInput = (num: number, value: string) => {
    if (isComplete) return;
    const upper = value.toUpperCase().slice(0, puzzle.clues.find(c => c.num === num)?.answer.length || 5);
    setAnswers(prev => ({ ...prev, [num]: upper }));
  };

  const checkSolution = () => {
    let allCorrect = true;
    const newRevealed = new Set(revealed);

    for (const clue of puzzle.clues) {
      const userAnswer = (answers[clue.num] || '').toUpperCase();
      if (userAnswer === clue.answer) {
        newRevealed.add(clue.num);
      } else {
        allCorrect = false;
      }
    }

    setRevealed(newRevealed);

    if (allCorrect && newRevealed.size === puzzle.clues.length) {
      setIsComplete(true);
      trackGameComplete('acrostic', { hintsUsed, clues: puzzle.clues.length });
    }
  };

  const useHint = (num: number) => {
    if (isComplete || revealed.has(num)) return;
    const clue = puzzle.clues.find(c => c.num === num);
    if (!clue) return;

    const current = answers[num] || '';
    if (current.length < clue.answer.length) {
      setAnswers(prev => ({
        ...prev,
        [num]: clue.answer.slice(0, current.length + 1),
      }));
      setHintsUsed(prev => prev + 1);
    }
  };

  const reset = () => {
    setAnswers({});
    setRevealed(new Set());
    setIsComplete(false);
    setHintsUsed(0);
  };

  const getFirstLetters = () => {
    return puzzle.clues.map(clue => {
      const answer = answers[clue.num] || '';
      return answer[0] || '_';
    }).join('');
  };

  const hiddenProgress = getFirstLetters();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-sand-500">
          {revealed.size}/{puzzle.clues.length} solved
        </div>
        <div className="text-sm text-sand-500">
          {hintsUsed} hints
        </div>
      </div>

      {/* Hidden Word Display */}
      <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-6">
        <p className="text-xs text-violet-500 uppercase tracking-wide mb-2">First letters reveal:</p>
        <div className="flex gap-2 justify-center">
          {puzzle.hiddenWord.split('').map((letter, i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
                hiddenProgress[i] === letter
                  ? 'bg-green-500 text-white'
                  : 'bg-white border-2 border-violet-200 text-violet-300'
              }`}
            >
              {hiddenProgress[i] === letter ? letter : '?'}
            </div>
          ))}
        </div>
      </div>

      {/* Clues */}
      <div className="space-y-3 mb-6">
        {puzzle.clues.map(clue => {
          const isRevealed = revealed.has(clue.num);
          const userAnswer = answers[clue.num] || '';

          return (
            <div
              key={clue.num}
              className={`bg-white border rounded-xl p-4 transition ${
                isRevealed ? 'border-green-300 bg-green-50' : 'border-sand-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="font-bold text-violet-500 w-6">{clue.num}</span>
                <div className="flex-1">
                  <p className="text-coal mb-2">{clue.text}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {clue.answer.split('').map((_, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm border ${
                            isRevealed
                              ? 'bg-green-100 border-green-300 text-green-700'
                              : userAnswer[i]
                              ? userAnswer[i] === clue.answer[i]
                                ? 'bg-green-100 border-green-300 text-green-700'
                                : 'bg-red-50 border-red-300 text-red-600'
                              : 'bg-sand-50 border-sand-200'
                          }`}
                        >
                          {userAnswer[i] || ''}
                        </div>
                      ))}
                    </div>
                    {!isRevealed && (
                      <button
                        onClick={() => useHint(clue.num)}
                        className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-lg transition"
                        title="Hint"
                      >
                        <Lightbulb className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {!isRevealed && (
                <input
                  type="text"
                  value={userAnswer}
                  onChange={e => handleInput(clue.num, e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-sand-200 rounded-lg text-center font-mono uppercase tracking-widest focus:outline-none focus:border-violet-400"
                  placeholder="Type answer..."
                  maxLength={clue.answer.length}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      {!isComplete && (
        <button
          onClick={checkSolution}
          className="w-full flex items-center justify-center gap-2 bg-violet-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-violet-600 transition mb-4"
        >
          <Check className="w-4 h-4" />
          Check Answers
        </button>
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
              <h3 className="font-bold text-lg">Acrostic Solved!</h3>
            </div>

            <div className="bg-white rounded-xl p-4 mb-4">
              <p className="text-lg font-medium text-coal italic mb-2">"{puzzle.quote}"</p>
              <p className="text-sm text-sand-500">— {puzzle.author}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{hintsUsed}</p>
                <p className="text-sm text-sand-500">Hints</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{puzzle.clues.length}</p>
                <p className="text-sm text-sand-500">Clues</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{hintsUsed === 0 ? 'Perfect!' : 'Great!'}</p>
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
    </div>
  );
}
