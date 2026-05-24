import { CircleHelp, Flame, Share2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface GameHeaderProps {
  title: string;
  titleEs: string;
  difficulty?: number;
  streak?: number;
  onShowHelp: () => void;
  onShare?: () => void;
  showShare?: boolean;
}

export default function GameHeader({
  title,
  titleEs,
  difficulty = 2,
  streak = 0,
  onShowHelp,
  onShare,
  showShare = false,
}: GameHeaderProps) {
  const { lang } = useLanguage();

  const displayTitle = lang === 'es' ? titleEs : title;
  const now = new Date();
  const dateStr = now.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="pt-6 pb-4 max-w-[520px] mx-auto px-4">
      {/* Title row */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-display-sm text-ink-900 dark:text-dark-text">{displayTitle}</h1>
        <div className="flex items-center gap-2">
          {showShare && onShare && (
            <button
              onClick={onShare}
              className="w-10 h-10 rounded-[10px] bg-sand-200 dark:bg-dark-elevated flex items-center justify-center text-ink-700 dark:text-dark-text-secondary hover:bg-sand-300 dark:hover:bg-dark-border transition-colors"
            >
              <Share2 size={20} strokeWidth={1.5} />
            </button>
          )}
          <button
            onClick={onShowHelp}
            className="w-10 h-10 rounded-[10px] bg-sand-200 dark:bg-dark-elevated flex items-center justify-center text-ink-700 dark:text-dark-text-secondary hover:bg-sand-300 dark:hover:bg-dark-border transition-colors"
          >
            <CircleHelp size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Info row */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <span className="text-caption text-ink-500 dark:text-dark-text-tertiary">{dateStr}</span>

        {/* Difficulty dots */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((d) => (
            <div
              key={d}
              className={`w-2 h-2 rounded-full ${
                d <= difficulty ? 'bg-sunset-500' : 'bg-sand-300 dark:bg-dark-border'
              }`}
            />
          ))}
        </div>

        {streak > 0 && (
          <div className="flex items-center gap-1 text-caption text-ink-500 dark:text-dark-text-tertiary">
            <Flame size={16} className="text-sunset-500" />
            <span>{streak}</span>
          </div>
        )}
      </div>
    </div>
  );
}
