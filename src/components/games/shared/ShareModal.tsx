import { useState } from 'react';
import { X, Share2, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  gameName: string;
  gameSlug: string;
  stats: {
    guesses?: string;
    time: string;
    streak: number;
    score?: string;
    wordsFound?: string;
  };
  emojiGrid?: string;
}

export default function ShareModal({ open, onClose, gameName, gameSlug, stats, emojiGrid }: ShareModalProps) {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const now = new Date();
  const dateStr = now.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const shareText = lang === 'es'
    ? `Klystora ${gameName} — ${dateStr}\n${emojiGrid || ''}\n${stats.wordsFound ? `Palabras: ${stats.wordsFound}` : stats.guesses ? `Intentos: ${stats.guesses}` : ''} | Tiempo: ${stats.time}\nRacha: ${stats.streak} 🔥\nklystora.com/es/${gameSlug}`
    : `Klystora ${gameName} — ${dateStr}\n${emojiGrid || ''}\n${stats.wordsFound ? `Words: ${stats.wordsFound}` : stats.guesses ? `Guesses: ${stats.guesses}` : ''} | Time: ${stats.time}\nStreak: ${stats.streak} 🔥\nklystora.com/${gameSlug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[rgba(26,23,20,0.6)] dark:bg-[rgba(20,18,26,0.7)] backdrop-blur-sm" />
      <div
        className="relative bg-sand-100 dark:bg-dark-surface border border-sand-300 dark:border-dark-border rounded-2xl shadow-2xl max-w-[400px] w-full p-6 animate-fade-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-ink-500 dark:text-dark-text-tertiary hover:bg-sand-200 dark:hover:bg-dark-elevated transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <Share2 size={28} className="mx-auto text-violet-600 mb-2" />
          <h2 className="text-heading-lg text-ink-900 dark:text-dark-text">
            {lang === 'es' ? 'Compartir Resultado' : 'Share Result'}
          </h2>
        </div>

        {/* Share preview card */}
        <div className="bg-sand-50 dark:bg-dark-elevated rounded-2xl p-5 mb-5 border border-sand-300 dark:border-dark-border">
          <div className="text-center mb-3">
            <span className="font-display font-semibold text-lg text-ink-900 dark:text-dark-text">Klystora</span>
            <span className="text-body-sm text-ink-500 dark:text-dark-text-tertiary ml-2">{gameName}</span>
          </div>
          {emojiGrid && (
            <div className="text-center mb-3 text-lg leading-tight whitespace-pre font-mono">{emojiGrid}</div>
          )}
          <div className="flex justify-center gap-4 text-caption text-ink-500 dark:text-dark-text-tertiary">
            {stats.wordsFound && <span>{lang === 'es' ? 'Palabras' : 'Words'}: {stats.wordsFound}</span>}
            {stats.guesses && <span>{lang === 'es' ? 'Intentos' : 'Guesses'}: {stats.guesses}</span>}
            <span>{lang === 'es' ? 'Tiempo' : 'Time'}: {stats.time}</span>
          </div>
          <div className="text-center mt-2 text-caption text-ink-500 dark:text-dark-text-tertiary">
            {lang === 'es' ? 'Racha' : 'Streak'}: {stats.streak} 🔥
          </div>
          <div className="text-center mt-2 text-caption text-violet-600 dark:text-violet-400">
            klystora.com/{gameSlug}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="w-full py-2.5 rounded-[10px] text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? (lang === 'es' ? '¡Copiado!' : 'Copied!') : (lang === 'es' ? 'Copiar al Portapapeles' : 'Copy to Clipboard')}
        </button>
      </div>
    </div>
  );
}
