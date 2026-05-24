import { useMemo } from 'react';
import { X, Flame, BarChart3, Target, Zap } from 'lucide-react';

export interface GameStats {
  played: number;
  won: number;
  lost: number;
  winPercent: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[]; // index 0 = guess 1, index 5 = guess 6
}

interface StatsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  currentGuessCount: number; // 1-6, which guess they won on (0 if lost)
  lang: 'en' | 'es';
}

const txStats = {
  en: {
    statistics: 'Statistics',
    played: 'Played',
    winPercent: 'Win %',
    currentStreak: 'Current\nStreak',
    maxStreak: 'Max\nStreak',
    guessDistribution: 'Guess Distribution',
    nextWordIn: 'Next word in',
  },
  es: {
    statistics: 'Estadisticas',
    played: 'Jugadas',
    winPercent: 'Victorias %',
    currentStreak: 'Racha\nActual',
    maxStreak: 'Racha\nMaxima',
    guessDistribution: 'Distribucion de Intentos',
    nextWordIn: 'Siguiente palabra en',
  },
};

export default function StatsPanel({
  isOpen,
  onClose,
  stats,
  currentGuessCount,
  lang,
}: StatsPanelProps) {
  const t = txStats[lang];

  const maxDistribution = useMemo(() =>
    Math.max(...stats.guessDistribution, 1),
    [stats.guessDistribution]
  );

  const formatLabel = (label: string) => {
    return label.split('\n').map((line, i) => (
      <span key={i}>
        {i > 0 && <br />}
        {line}
      </span>
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(26,23,20,0.6)] dark:bg-[rgba(20,18,26,0.7)] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto bg-[#FAF8F3] dark:bg-[#1E1C26] border border-[#E2DED4] dark:border-[#3A3750] rounded-2xl shadow-2xl p-6"
        style={{
          animation: 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <style>{`
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-[#6B6560] dark:text-[#7A748C] hover:bg-[#F0EDE6] dark:hover:bg-[#282636] transition-colors"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-1">
            <BarChart3 size={20} strokeWidth={1.5} className="text-[#6845BC]" />
            <h2 className="text-heading-lg text-[#1A1714] dark:text-[#F0EDE8]">
              {t.statistics}
            </h2>
          </div>
        </div>

        {/* Stat summary row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="text-center">
            <p className="text-stat-number text-[#1A1714] dark:text-[#F0EDE8]">
              {stats.played}
            </p>
            <p className="text-stat-label text-[#6B6560] dark:text-[#7A748C] mt-0.5">
              {t.played}
            </p>
          </div>
          <div className="text-center">
            <p className="text-stat-number text-[#1A1714] dark:text-[#F0EDE8]">
              {stats.winPercent}
            </p>
            <p className="text-stat-label text-[#6B6560] dark:text-[#7A748C] mt-0.5">
              {t.winPercent}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Flame size={16} className="text-[#FF6B3D]" />
              <p className="text-stat-number text-[#1A1714] dark:text-[#F0EDE8]">
                {stats.currentStreak}
              </p>
            </div>
            <p className="text-stat-label text-[#6B6560] dark:text-[#7A748C] mt-0.5">
              {formatLabel(t.currentStreak)}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Zap size={16} className="text-[#FF6B3D]" />
              <p className="text-stat-number text-[#1A1714] dark:text-[#F0EDE8]">
                {stats.maxStreak}
              </p>
            </div>
            <p className="text-stat-label text-[#6B6560] dark:text-[#7A748C] mt-0.5">
              {formatLabel(t.maxStreak)}
            </p>
          </div>
        </div>

        {/* Guess Distribution */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-3">
            <Target size={16} strokeWidth={1.5} className="text-[#6845BC]" />
            <h3 className="text-heading-sm text-[#1A1714] dark:text-[#F0EDE8]">
              {t.guessDistribution}
            </h3>
          </div>

          <div className="space-y-1.5">
            {stats.guessDistribution.map((count, i) => {
              const guessNum = i + 1;
              const isCurrent = currentGuessCount === guessNum;
              const widthPercent = count > 0
                ? Math.max((count / maxDistribution) * 100, 8)
                : 0;

              return (
                <div key={guessNum} className="flex items-center gap-2">
                  <span className="w-4 text-xs font-semibold text-[#6B6560] dark:text-[#A8A2B5] text-right">
                    {guessNum}
                  </span>
                  <div className="flex-1 h-6 bg-[#F0EDE6] dark:bg-[#282636] rounded overflow-hidden">
                    {count > 0 && (
                      <div
                        className={`h-full rounded flex items-center justify-end px-2 transition-all duration-500 ease-out ${
                          isCurrent
                            ? 'bg-[#FF6B3D]'
                            : 'bg-[#7D5BBF] dark:bg-[#9B7DD0]'
                        }`}
                        style={{ width: `${widthPercent}%` }}
                      >
                        <span className="text-xs font-semibold text-white">
                          {count}
                        </span>
                      </div>
                    )}
                  </div>
                  {count === 0 && (
                    <span className="text-xs text-[#C4BFB3] dark:text-[#7A748C]">0</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
