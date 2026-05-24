import { useCallback, useMemo, useState } from 'react';
import { X, Check, Copy } from 'lucide-react';
import type { TileState } from './GameGrid';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  grid: { letter: string; state: TileState }[][];
  gameWon: boolean;
  guessCount: number;
  maxAttempts: number;
  dayNumber: number;
  streak: number;
  maxStreak: number;
  winPercent: number;
  lang: 'en' | 'es';
}

function getShareEmoji(state: TileState): string {
  switch (state) {
    case 'correct': return '\u{1F7E9}'; // 🟩
    case 'partial': return '\u{1F7E8}'; // 🟨
    case 'wrong': return '\u{2B1C}'; // ⬜
    default: return '\u{2B1B}'; // ⬛
  }
}

const txShare = {
  en: {
    shareResult: 'Share Result',
    copied: 'Copied!',
    copyToClipboard: 'Copy to Clipboard',
    klystoraDailyWord: 'Klystora Daily Word',
    streak: 'Streak',
    best: 'Best',
    comeBackTomorrow: 'Come back tomorrow for a new word!',
    youLost: 'Better luck next time!',
  },
  es: {
    shareResult: 'Compartir Resultado',
    copied: 'Copiado!',
    copyToClipboard: 'Copiar al Portapapeles',
    klystoraDailyWord: 'Klystora Palabra Diaria',
    streak: 'Racha',
    best: 'Mejor',
    comeBackTomorrow: 'Vuelve manana para una nueva palabra!',
    youLost: 'Mejor suerte la proxima vez!',
  },
};

export default function ShareModal({
  isOpen,
  onClose,
  grid,
  gameWon,
  guessCount,
  maxAttempts,
  dayNumber,
  streak,
  maxStreak,
  winPercent,
  lang,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const t = txShare[lang];

  const shareText = useMemo(() => {
    const completedRows = grid.filter(row => row.some(tile => tile.state !== 'empty'));
    const resultLine = gameWon
      ? `Guess ${guessCount}/${maxAttempts}`
      : `X/${maxAttempts}`;

    const gridLines = completedRows.map(row =>
      row.map(tile => getShareEmoji(tile.state)).join('')
    );

    return [
      `${t.klystoraDailyWord} #${dayNumber}`,
      '',
      resultLine,
      ...gridLines,
      '',
      `klystora.com`,
    ].join('\n');
  }, [grid, gameWon, guessCount, maxAttempts, dayNumber, t]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareText]);

  if (!isOpen) return null;

  const completedRows = grid.filter(row => row.some(tile => tile.state !== 'empty'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(26,23,20,0.6)] dark:bg-[rgba(20,18,26,0.7)] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-[400px] bg-[#FAF8F3] dark:bg-[#1E1C26] border border-[#E2DED4] dark:border-[#3A3750] rounded-2xl shadow-2xl p-6"
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
        <div className="text-center mb-5">
          <h2 className="text-heading-lg text-[#1A1714] dark:text-[#F0EDE8]">
            {t.shareResult}
          </h2>
          <p className="text-body-sm text-[#6B6560] dark:text-[#7A748C] mt-1">
            {gameWon ? t.comeBackTomorrow : t.youLost}
          </p>
        </div>

        {/* Mini result grid preview */}
        <div className="flex flex-col items-center gap-1 mb-5">
          {completedRows.slice(0, guessCount || maxAttempts).map((row, ri) => (
            <div key={ri} className="flex gap-1">
              {row.map((tile, ci) => (
                <div
                  key={ci}
                  className={`w-8 h-8 rounded-[4px] flex items-center justify-center text-xs font-bold ${
                    tile.state === 'correct'
                      ? 'bg-[#4A8B5B] text-white'
                      : tile.state === 'partial'
                      ? 'bg-[#D9A93E] text-white'
                      : tile.state === 'wrong'
                      ? 'bg-[#7A7268] text-white'
                      : 'bg-[#F0EDE6] dark:bg-[#282636]'
                  }`}
                >
                  {tile.letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-6 mb-5">
          <div className="text-center">
            <p className="text-stat-number text-[#6845BC]">{streak}</p>
            <p className="text-stat-label text-[#6B6560] dark:text-[#7A748C]">{t.streak}</p>
          </div>
          <div className="w-px h-8 bg-[#E2DED4] dark:bg-[#3A3750]" />
          <div className="text-center">
            <p className="text-stat-number text-[#6845BC]">{maxStreak}</p>
            <p className="text-stat-label text-[#6B6560] dark:text-[#7A748C]">{t.best}</p>
          </div>
          <div className="w-px h-8 bg-[#E2DED4] dark:bg-[#3A3750]" />
          <div className="text-center">
            <p className="text-stat-number text-[#6845BC]">{winPercent}%</p>
            <p className="text-stat-label text-[#6B6560] dark:text-[#7A748C]">Win %</p>
          </div>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-[10px] text-sm font-semibold text-white bg-[#6845BC] hover:bg-[#5437A0] active:scale-[0.98] transition-all duration-200"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? t.copied : t.copyToClipboard}
        </button>
      </div>
    </div>
  );
}
