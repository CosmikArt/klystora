import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Clock, Zap, Star } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const QUESTIONS_EN = [
  { q: 'What is the longest word in English?', options: ['Pneumonoultramicroscopicsilicovolcanoconiosis', 'Antidisestablishmentarianism', 'Supercalifragilisticexpialidocious', 'Hippopotomonstrosesquippedaliophobia'], correct: 0 },
  { q: 'Which language has the most words?', options: ['English', 'Chinese', 'Spanish', 'Arabic'], correct: 0 },
  { q: 'What does "serendipity" mean?', options: ['Finding something good unexpectedly', 'A peaceful state', 'Great happiness', 'Deep sadness'], correct: 0 },
  { q: 'Which word is a palindrome?', options: ['Radar', 'Apple', 'Orange', 'Banana'], correct: 0 },
  { q: 'What is the study of words called?', options: ['Etymology', 'Philology', 'Lexicography', 'Semantics'], correct: 0 },
  { q: 'Which letter is used most in English?', options: ['E', 'A', 'I', 'O'], correct: 0 },
  { q: 'What does "oxymoron" mean?', options: ['Contradictory terms together', 'A wise saying', 'A type of poem', 'A figure of speech'], correct: 0 },
  { q: 'Which word has no rhyme?', options: ['Orange', 'Blue', 'Red', 'Green'], correct: 0 },
  { q: 'What is a word spelled the same backward?', options: ['Palindrome', 'Anagram', 'Homonym', 'Synonym'], correct: 0 },
  { q: 'Which is NOT a part of speech?', options: ['Paragraph', 'Noun', 'Verb', 'Adjective'], correct: 0 },
];

const QUESTIONS_ES = [
  { q: '¿Cuál es la palabra más larga en español?', options: ['Electroencefalografista', 'Anticonstitucionalmente', 'Superextraordinarísimo', 'Esternocleidomastoideo'], correct: 0 },
  { q: '¿Qué idioma tiene más palabras?', options: ['Inglés', 'Chino', 'Español', 'Árabe'], correct: 0 },
  { q: '¿Qué significa "serendipia"?', options: ['Hallazgo inesperado', 'Estado de paz', 'Gran felicidad', 'Tristeza profunda'], correct: 0 },
  { q: '¿Qué palabra es un palíndromo?', options: ['Reconocer', 'Manzana', 'Naranja', 'Plátano'], correct: 0 },
  { q: '¿Cómo se llama el estudio de las palabras?', options: ['Etimología', 'Filología', 'Lexicografía', 'Semántica'], correct: 0 },
  { q: '¿Qué letra se usa más en español?', options: ['E', 'A', 'O', 'S'], correct: 0 },
  { q: '¿Qué es un oxímoron?', options: ['Términos contradictorios juntos', 'Un dicho sabio', 'Un tipo de poema', 'Una figura retórica'], correct: 0 },
  { q: '¿Qué palabra no tiene rima?', options: ['Águila', 'Azul', 'Rojo', 'Verde'], correct: 0 },
  { q: '¿Cómo se llama una palabra que se lee igual al revés?', options: ['Palíndromo', 'Anagrama', 'Homónimo', 'Sinónimo'], correct: 0 },
  { q: '¿Cuál NO es una categoría gramatical?', options: ['Párrafo', 'Sustantivo', 'Verbo', 'Adjetivo'], correct: 0 },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export default function TriviaGame() {
  const { lang } = useLanguage();
  const questions = lang === 'es' ? QUESTIONS_ES : QUESTIONS_EN;
  const [shuffled] = useState(() => shuffle(questions).slice(0, 5));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === shuffled[current].correct;
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, correct]);
    
    setTimeout(() => {
      if (current + 1 < shuffled.length) {
        setCurrent(c => c + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setIsComplete(true);
      }
    }, 1500);
  };

  const reset = () => {
    window.location.reload();
  };

  const q = shuffled[current];

  return (
    <div className="w-full max-w-[520px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-coal dark:text-white">{lang === 'es' ? 'Trivia' : 'Trivia'}</h2>
          <p className="text-sm text-sand-500">{lang === 'es' ? 'Preguntas de palabras' : 'Word questions'}</p>
        </div>
        <div className="bg-violet-100 dark:bg-violet-900 px-3 py-1 rounded-full text-sm font-bold text-violet-700 dark:text-violet-300">
          {current + 1}/{shuffled.length}
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-sand-200 dark:bg-sand-800 rounded-full mb-6 overflow-hidden">
        <motion.div className="h-full bg-violet-500 rounded-full" animate={{ width: `${((current + (showResult ? 1 : 0)) / shuffled.length) * 100}%` }} />
      </div>

      {!isComplete ? (
        <>
          {/* Question */}
          <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <h3 className="text-lg font-semibold text-coal dark:text-white mb-4">{q.q}</h3>
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                    selected === null 
                      ? 'bg-sand-100 dark:bg-sand-800 text-coal dark:text-white hover:bg-violet-100 dark:hover:bg-violet-900 hover:text-violet-700' :
                    selected === i 
                      ? isCorrect 
                        ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 border-2 border-emerald-400' 
                        : 'bg-rose-100 dark:bg-rose-900 text-rose-700 border-2 border-rose-400'
                      : i === q.correct && showResult
                        ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 border-2 border-emerald-400'
                        : 'bg-sand-100 dark:bg-sand-800 text-coal dark:text-white opacity-50'
                  }`}
                >
                  <span className="inline-block w-6 font-bold">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Feedback */}
          <AnimatePresence>
            {showResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`text-center p-3 rounded-xl ${isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                {isCorrect ? '✓ ' + (lang === 'es' ? '¡Correcto!' : 'Correct!') : '✗ ' + (lang === 'es' ? 'Incorrecto' : 'Wrong')}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        /* Results */
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-6 bg-violet-50 dark:bg-violet-900/20 rounded-2xl border-2 border-violet-400">
          <Trophy size={48} className="mx-auto text-amber-500 mb-3" />
          <p className="text-3xl font-bold text-violet-700 dark:text-violet-300 mb-2">{score}/{shuffled.length}</p>
          <p className="text-lg text-coal dark:text-white mb-4">
            {score === shuffled.length ? (lang === 'es' ? '¡Perfecto!' : 'Perfect!') :
             score >= shuffled.length * 0.7 ? (lang === 'es' ? '¡Muy bien!' : 'Great job!') :
             lang === 'es' ? 'Sigue practicando' : 'Keep practicing'}
          </p>
          <div className="flex justify-center gap-2 mb-4">
            {answers.map((a, i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${a ? 'bg-emerald-400 text-white' : 'bg-rose-400 text-white'}`}>
                {a ? '✓' : '✗'}
              </div>
            ))}
          </div>
          <button onClick={reset} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors font-medium mx-auto">
            <RotateCcw size={18} /> {lang === 'es' ? 'Jugar de nuevo' : 'Play again'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
