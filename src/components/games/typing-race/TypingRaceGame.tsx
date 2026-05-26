import { useState, useEffect, useRef, useCallback } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Clock, Zap, Target, Keyboard } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// Texts by language — excerpts from public domain literature
const TEXTS_BY_LANG: Record<string, string[]> = {
  en: [
    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    "In the middle of difficulty lies opportunity. The important thing is not to stop questioning.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The best time to plant a tree was twenty years ago. The second best time is now.",
    "It does not matter how slowly you go as long as you do not stop. Persistence is key.",
  ],
  es: [
    "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero.",
    "El que lee mucho y anda mucho, ve mucho y sabe mucho. La lectura es la escuela de la vida.",
    "Pensar es el trabajo más difícil que existe. Tal vez por eso tan pocos se dedican a ello.",
    "La vida no es la que uno vivió, sino la que uno recuerda y cómo la recuerda para contarla.",
    "El mundo es cambiante y la gente se resiste al cambio. Pero el cambio es la única constante.",
  ],
  zh: [
    "学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？",
    "千里之行，始于足下。不积跬步，无以至千里；不积小流，无以成江海。",
    "知之者不如好之者，好之者不如乐之者。兴趣是最好的老师。",
    "天行健，君子以自强不息。地势坤，君子以厚德载物。",
    "博学之，审问之，慎思之，明辨之，笃行之。",
  ],
  fr: [
    "Je pense, donc je suis. La lecture de tous les bons livres est comme une conversation avec les plus honnêtes gens des siècles passés.",
    "Le monde est dangereux à vivre ! Non pas tant à cause de ceux qui font le mal, mais à cause de ceux qui regardent et laissent faire.",
    "La vie est une succession de moments. Il faut savourer chaque instant car le temps ne revient pas.",
    "On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux. C'est le temps passé pour sa rose qui fait sa rose si importante.",
    "Le bonheur est parfois caché dans l'inconnu. Il faut savoir prendre des risques pour avancer.",
  ],
  de: [
    "Was wir wissen, ist ein Tropfen; was wir nicht wissen, ein Ozean. Das Wissen ist die halbe Macht.",
    "Der einzige Weg, großartige Arbeit zu leisten, besteht darin, das zu tun, was man liebt.",
    "Ohne Musik wäre das Leben ein Irrtum. Die Musik gibt dem Leben einen Rhythmus.",
    "Die Grenzen meiner Sprache bedeuten die Grenzen meiner Welt. Sprache formt Denken.",
    "Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren. Mut ist der Anfang des Handelns.",
  ],
  default: [
    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    "In the middle of difficulty lies opportunity. The important thing is not to stop questioning.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  ],
};

function getTexts(lang: string): string[] {
  return TEXTS_BY_LANG[lang] || TEXTS_BY_LANG['default'];
}

interface Stats {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  time: number;
}

export default function TypingRaceGame() {
  const { trackGameComplete } = useAnalytics();
  const { lang } = useLanguage();
  
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedTime, setSelectedTime] = useState(60);
  const [stats, setStats] = useState<Stats>({ wpm: 0, cpm: 0, accuracy: 0, errors: 0, time: 0 });
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);
  const [leaderboard, setLeaderboard] = useState<Stats[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const wpmIntervalRef = useRef<ReturnType<typeof setInterval>>();

  // Load leaderboard from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`typing-race-leaderboard-${lang}`);
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, [lang]);

  // Initialize text
  useEffect(() => {
    const texts = getTexts(lang);
    setText(texts[Math.floor(Math.random() * texts.length)]);
  }, [lang]);

  // Timer
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

  // WPM tracking every second
  useEffect(() => {
    if (isActive) {
      wpmIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000 / 60;
        if (elapsed > 0) {
          const wordsTyped = input.trim().split(/\s+/).length;
          const currentWpm = Math.round(wordsTyped / elapsed);
          setWpmHistory((prev) => [...prev.slice(-29), currentWpm]);
        }
      }, 1000);
    }
    return () => clearInterval(wpmIntervalRef.current);
  }, [isActive, input]);

  const calculateStats = useCallback((): Stats => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const minutes = elapsed / 60;
    const wordsTyped = input.trim().split(/\s+/).length;
    const charsTyped = input.length;
    
    let errors = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== text[i]) errors++;
    }
    
    const accuracy = charsTyped > 0 ? Math.round(((charsTyped - errors) / charsTyped) * 100) : 0;
    const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
    const cpm = minutes > 0 ? Math.round(charsTyped / minutes) : 0;
    
    return { wpm, cpm, accuracy, errors, time: Math.round(elapsed) };
  }, [input, text]);

  const finishGame = useCallback(() => {
    setIsActive(false);
    setIsComplete(true);
    const finalStats = calculateStats();
    setStats(finalStats);
    
    // Save to leaderboard
    const newLeaderboard = [...leaderboard, finalStats]
      .sort((a, b) => b.wpm - a.wpm)
      .slice(0, 10);
    setLeaderboard(newLeaderboard);
    localStorage.setItem(`typing-race-leaderboard-${lang}`, JSON.stringify(newLeaderboard));
    
    trackGameComplete('typing-race', { 
      wpm: finalStats.wpm, 
      accuracy: finalStats.accuracy,
      time: selectedTime 
    });
  }, [calculateStats, leaderboard, lang, selectedTime, trackGameComplete]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!isActive && !isComplete) {
      setIsActive(true);
      startTimeRef.current = Date.now();
    }
    
    setInput(value);
    
    if (value === text) {
      finishGame();
    }
  };

  const reset = () => {
    setInput('');
    setIsActive(false);
    setIsComplete(false);
    setTimeLeft(selectedTime);
    setStats({ wpm: 0, cpm: 0, accuracy: 0, errors: 0, time: 0 });
    setWpmHistory([]);
    const texts = getTexts(lang);
    setText(texts[Math.floor(Math.random() * texts.length)]);
    inputRef.current?.focus();
  };

  const handleTimeChange = (seconds: number) => {
    setSelectedTime(seconds);
    setTimeLeft(seconds);
    reset();
  };

  // Render text with highlighting
  const renderText = () => {
    return text.split('').map((char, i) => {
      let className = 'transition-colors';
      if (i < input.length) {
        className += input[i] === char 
          ? ' text-green-600 bg-green-50' 
          : ' text-red-600 bg-red-50 underline';
      } else if (i === input.length) {
        className += ' bg-violet-100 border-b-2 border-violet-500';
      } else {
        className += ' text-sand-400';
      }
      return (
        <span key={i} className={className}>
          {char}
        </span>
      );
    });
  };

  // WPM sparkline
  const renderSparkline = () => {
    if (wpmHistory.length < 2) return null;
    const max = Math.max(...wpmHistory, 1);
    const min = Math.min(...wpmHistory);
    const range = max - min || 1;
    const width = 200;
    const height = 40;
    const points = wpmHistory.map((wpm, i) => {
      const x = (i / (wpmHistory.length - 1)) * width;
      const y = height - ((wpm - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <div className="mt-4">
        <p className="text-xs text-sand-500 mb-1">WPM over time</p>
        <svg width={width} height={height} className="overflow-visible">
          <polyline
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
            points={points}
          />
          {wpmHistory.map((wpm, i) => {
            const x = (i / (wpmHistory.length - 1)) * width;
            const y = height - ((wpm - min) / range) * height;
            return (
              <circle key={i} cx={x} cy={y} r="2" fill="#8b5cf6" />
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sand-500">
            <Clock className="w-4 h-4" />
            <span className={`font-mono text-lg font-bold ${timeLeft <= 10 ? 'text-red-500' : ''}`}>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>
          {isActive && (
            <div className="flex items-center gap-2 text-violet-500">
              <Zap className="w-4 h-4" />
              <span className="font-mono font-bold">
                {stats.wpm} WPM
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {[30, 60, 120].map((t) => (
            <button
              key={t}
              onClick={() => handleTimeChange(t)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                selectedTime === t
                  ? 'bg-violet-500 text-white'
                  : 'bg-sand-100 text-sand-500 hover:bg-sand-200'
              }`}
              disabled={isActive}
            >
              {t}s
            </button>
          ))}
        </div>
      </div>

      {/* Text Display */}
      <div 
        className="bg-white border border-sand-200 rounded-xl p-6 mb-4 text-lg leading-relaxed font-mono min-h-[120px] cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {renderText()}
      </div>

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
        className="w-full px-4 py-3 border border-sand-200 rounded-xl text-lg font-mono focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        placeholder="Start typing..."
        disabled={isComplete}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />

      {/* WPM Sparkline */}
      {renderSparkline()}

      {/* Results */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 bg-violet-50 border border-violet-200 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-violet-500" />
              <h3 className="font-bold text-lg">Results</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{stats.wpm}</p>
                <p className="text-sm text-sand-500">WPM</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{stats.cpm}</p>
                <p className="text-sm text-sand-500">CPM</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{stats.accuracy}%</p>
                <p className="text-sm text-sand-500">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{stats.errors}</p>
                <p className="text-sm text-sand-500">Errors</p>
              </div>
            </div>

            {/* Leaderboard */}
            {leaderboard.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Top Scores
                </h4>
                <div className="space-y-1">
                  {leaderboard.slice(0, 5).map((entry, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-sand-500">#{i + 1}</span>
                      <span className="font-mono font-bold">{entry.wpm} WPM</span>
                      <span className="text-sand-400">{entry.accuracy}% acc</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 bg-violet-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-violet-600 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!isActive && !isComplete && (
        <div className="mt-6 flex items-start gap-3 text-sm text-sand-500">
          <Keyboard className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <p>Type the text above as fast and accurately as you can. Your WPM (words per minute) and accuracy will be calculated. Select your preferred time limit above.</p>
        </div>
      )}
    </div>
  );
}
