import { useLanguage } from '@/hooks/useLanguage';
import type { CrosswordWord } from './puzzleData';

interface CrosswordCluesProps {
  words: CrosswordWord[];
  selectedWord: CrosswordWord | null;
  direction: 'across' | 'down';
  onClueClick: (word: CrosswordWord) => void;
  completedWords: Set<string>;
}

export default function CrosswordClues({ words, selectedWord, onClueClick, completedWords }: CrosswordCluesProps) {
  const { lang } = useLanguage();

  const across = words.filter(w => w.direction === 'across');
  const down = words.filter(w => w.direction === 'down');

  const renderClueList = (clueWords: CrosswordWord[], title: string) => (
    <div className="mb-4">
      <h3 className="text-heading-sm text-ink-900 dark:text-dark-text mb-2 sticky top-0 bg-sand-50 dark:bg-dark-bg py-1 z-10">
        {title}
      </h3>
      <ul className="space-y-1">
        {clueWords.map((word) => {
          const wordKey = `${word.direction}-${word.number}`;
          const isCompleted = completedWords.has(wordKey);
          const isSelected = selectedWord?.direction === word.direction && selectedWord?.number === word.number;

          return (
            <li
              key={wordKey}
              onClick={() => onClueClick(word)}
              className={`flex gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors duration-150 ${
                isSelected
                  ? 'bg-violet-50 dark:bg-violet-800/30 text-violet-600 dark:text-violet-400'
                  : isCompleted
                  ? 'text-sage-500 line-through opacity-60'
                  : 'text-ink-700 dark:text-dark-text-secondary hover:bg-sand-100 dark:hover:bg-dark-surface'
              }`}
            >
              <span className="font-semibold text-sm min-w-[20px]">{word.number}</span>
              <span className="text-sm">{lang === 'es' ? word.clueEs : word.clue}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="w-full lg:w-[280px] lg:shrink-0 bg-sand-50 dark:bg-dark-bg rounded-xl p-4 max-h-[400px] lg:max-h-[500px] overflow-y-auto border border-sand-300 dark:border-dark-border">
      {renderClueList(across, lang === 'es' ? 'Horizontal' : 'Across')}
      {renderClueList(down, lang === 'es' ? 'Vertical' : 'Down')}
    </div>
  );
}
