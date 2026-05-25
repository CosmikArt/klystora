import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Clock, Zap } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const EMOJIS = ['🎮','🎯','🎨','🎭','🎪','🎬','🎸','🎹','🏆','⚡','🔥','💎'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export default function MemoryGame() {
  const { lang } = useLanguage();
  const [cards, setCards] = useState<Card[]>(() => {
    const pairs = EMOJIS.slice(0, 8);
    const deck = shuffle([...pairs, ...pairs].map((emoji, i) => ({ id: i, emoji, isFlipped: false, isMatched: false })));
    return deck;
  });
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [startTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const handleCardClick = useCallback((id: number) => {
    if (flippedIds.length === 2 || cards[id].isFlipped || cards[id].isMatched || isComplete) return;
    
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);
    setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c));

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.id === first || c.id === second ? { ...c, isMatched: true } : c));
          setFlippedIds([]);
          setMatches(m => {
            const newMatches = m + 1;
            if (newMatches === 8) setIsComplete(true);
            return newMatches;
          });
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.id === first || c.id === second ? { ...c, isFlipped: false } : c));
          setFlippedIds([]);
        }, 800);
      }
    }
  }, [cards, flippedIds, isComplete]);

  const reset = () => {
    const pairs = EMOJIS.slice(0, 8);
    const deck = shuffle([...pairs, ...pairs].map((emoji, i) => ({ id: i, emoji, isFlipped: false, isMatched: false })));
    setCards(deck);
    setFlippedIds([]);
    setMoves(0);
    setMatches(0);
    setIsComplete(false);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-coal dark:text-white">{lang === 'es' ? 'Memoria' : 'Memory'}</h2>
          <p className="text-sm text-sand-500">{lang === 'es' ? 'Encuentra los pares' : 'Find the pairs'}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm text-sand-500"><Clock size={14} /> {formatTime(elapsed)}</div>
          <div className="bg-violet-100 dark:bg-violet-900 px-3 py-1 rounded-full text-sm font-bold text-violet-700 dark:text-violet-300">{matches}/8</div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${
              card.isMatched 
                ? 'bg-emerald-100 dark:bg-emerald-900 border-2 border-emerald-400 opacity-60' 
                : card.isFlipped 
                ? 'bg-white dark:bg-sand-800 border-2 border-violet-400 shadow-lg' 
                : 'bg-violet-500 hover:bg-violet-600 border-2 border-violet-400 shadow-md'
            }`}
          >
            <AnimatePresence>
              {(card.isFlipped || card.isMatched) && (
                <motion.span initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} exit={{ rotateY: 90 }} transition={{ duration: 0.3 }}>
                  {card.emoji}
                </motion.span>
              )}
            </AnimatePresence>
            {!card.isFlipped && !card.isMatched && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white text-2xl">?</motion.span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-4 mb-4 text-sm text-sand-500">
        <span>{lang === 'es' ? 'Movimientos' : 'Moves'}: {moves}</span>
        <span>|</span>
        <span>{lang === 'es' ? 'Pares' : 'Pairs'}: {matches}/8</span>
      </div>

      <div className="flex justify-center">
        <button onClick={reset} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors font-medium">
          <RotateCcw size={18} /> {lang === 'es' ? 'Nuevo' : 'New'}
        </button>
      </div>

      {/* Victory */}
      <AnimatePresence>
        {isComplete && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 text-center p-6 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl border-2 border-emerald-400">
            <Trophy size={40} className="mx-auto text-amber-500 mb-2" />
            <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{lang === 'es' ? '¡Completado!' : 'Completed!'}</p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">{moves} {lang === 'es' ? 'movimientos' : 'moves'} · {formatTime(elapsed)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
