import { useEffect, useState } from 'react';
import { Share2, RotateCcw, X, Flame } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import ShareModal from './ShareModal';

interface PostGameStatsProps {
  open: boolean;
  onClose: () => void;
  gameName: string;
  gameNameEs: string;
  gameSlug: string;
  won: boolean;
  stats: {
    guesses?: string;
    time: string;
    streak: number;
    maxStreak: number;
    score?: string;
    wordsFound?: string;
    hintsUsed?: number;
  };
  emojiGrid?: string;
  onPlayAgain?: () => void;
}

export default function PostGameStats({
  open,
  onClose,
  gameName,
  gameNameEs,
  gameSlug,
  won,
  stats,
  emojiGrid,
  onPlayAgain,
}: PostGameStatsProps) {
  const { lang, t } = useLanguage();
  const [showShare, setShowShare] = useState(false);
  const [animatedStreak, setAnimatedStreak] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (open) {
      // Animate numbers counting up
      const duration = 400;
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setAnimatedStreak(Math.round(stats.streak * progress));
        const scoreVal = stats.score ? parseInt(stats.score) : 0;
        setAnimatedScore(Math.round(scoreVal * progress));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [open, stats.streak, stats.score]);

  if (!open) return null;

  const displayName = lang === 'es' ? gameNameEs : gameName;
  const now = new Date();
  const dateStr = now.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const statItems = [
    { label: lang === 'es' ? 'Tiempo' : 'Time', value: stats.time },
    { label: lang === 'es' ? 'Racha' : 'Streak', value: `${animatedStreak}`, icon: <Flame size={14} className="text-sunset-500 inline ml-1" /> },
    { label: lang === 'es' ? 'Racha M\u00e1x' : 'Max Streak', value: `${stats.maxStreak}` },
    ...(stats.score !== undefined ? [{ label: lang === 'es' ? 'Puntuaci\u00f3n' : 'Score', value: `${animatedScore}` }] : []),
    ...(stats.wordsFound ? [{ label: lang === 'es' ? 'Palabras' : 'Words', value: stats.wordsFound }] : []),
    ...(stats.guesses ? [{ label: lang === 'es' ? 'Intentos' : 'Guesses', value: stats.guesses }] : []),
    ...(stats.hintsUsed !== undefined ? [{ label: lang === 'es' ? 'Pistas' : 'Hints', value: `${stats.hintsUsed}` }] : []),
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-[rgba(26,23,20,0.6)] dark:bg-[rgba(20,18,26,0.7)] backdrop-blur-sm" />
        <div
          className="relative bg-sand-100 dark:bg-dark-surface border border-sand-300 dark:border-dark-border rounded-2xl shadow-2xl max-w-[480px] w-full p-6 animate-fade-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-ink-500 dark:text-dark-text-tertiary hover:bg-sand-200 dark:hover:bg-dark-elevated transition-colors"
          >
            <X size={20} />
          </button>

          <h2 className="text-heading-lg text-ink-900 dark:text-dark-text mb-1">
            {won
              ? lang === 'es' ? '¡Juego Completado!' : 'Game Complete!'
              : lang === 'es' ? '¡Más suerte mañana!' : 'Better luck tomorrow!'}
          </h2>
          <p className="text-caption text-ink-500 dark:text-dark-text-tertiary mb-5">
            {displayName} — {dateStr}
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {statItems.map((item, i) => (
              <div
                key={i}
                className="bg-sand-50 dark:bg-dark-elevated rounded-lg p-3 text-center border border-sand-300 dark:border-dark-border"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="text-stat-number text-violet-600 dark:text-violet-400 flex items-center justify-center">
                  {item.value}
                  {item.icon}
                </div>
                <div className="text-stat-label text-ink-500 dark:text-dark-text-tertiary mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowShare(true)}
              className="flex-1 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Share2 size={16} />
              {t('share')}
            </button>
            {onPlayAgain && (
              <button
                onClick={onPlayAgain}
                className="flex-1 py-2.5 rounded-[10px] text-sm font-semibold text-violet-600 border-1.5 border-violet-600 bg-transparent hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} />
                {lang === 'es' ? 'Jugar de Nuevo' : 'Play Again'}
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-[10px] text-sm font-medium text-ink-700 dark:text-dark-text-secondary hover:bg-sand-200 dark:hover:bg-dark-elevated transition-colors"
            >
              {lang === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>
      </div>

      <ShareModal
        open={showShare}
        onClose={() => setShowShare(false)}
        gameName={displayName}
        gameSlug={gameSlug}
        stats={{
          guesses: stats.guesses,
          time: stats.time,
          streak: stats.streak,
          wordsFound: stats.wordsFound,
        }}
        emojiGrid={emojiGrid}
      />
    </>
  );
}
