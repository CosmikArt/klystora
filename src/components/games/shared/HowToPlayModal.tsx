import { X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface HowToPlayModalProps {
  open: boolean;
  onClose: () => void;
  gameName: string;
  gameNameEs: string;
  instructions: { en: string[]; es: string[] };
}

export default function HowToPlayModal({ open, onClose, gameName, gameNameEs, instructions }: HowToPlayModalProps) {
  const { lang } = useLanguage();

  if (!open) return null;

  const title = lang === 'es' ? `C\u00f3mo Jugar ${gameNameEs}` : `How to Play ${gameName}`;
  const steps = lang === 'es' ? instructions.es : instructions.en;

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
        <h2 className="text-heading-lg text-ink-900 dark:text-dark-text mb-4 pr-8">{title}</h2>
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-body text-ink-700 dark:text-dark-text-secondary">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 text-caption font-semibold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-[10px] text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-all duration-200"
        >
          {lang === 'es' ? 'Entendido' : 'Got it'}
        </button>
      </div>
    </div>
  );
}
