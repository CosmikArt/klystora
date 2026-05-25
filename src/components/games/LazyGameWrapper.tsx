import { Suspense, lazy, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import type { Lang } from '@/lib/i18n';

interface Props {
  game: 'daily-word' | 'mini-crossword' | 'word-search' | 'anagrams' | 
        'connections' | 'spelling-bee' | 'word-ladder' | 'word-wheel' |
        'sudoku' | 'memory' | 'hangman' | 'trivia';
  lang?: Lang;
}

// Mapa de imports lazy
const gameComponents: Record<string, () => Promise<any>> = {
  'daily-word': () => import('./DailyWordWrapper'),
  'mini-crossword': () => import('./crossword/CrosswordWrapper'),
  'word-search': () => import('./wordsearch/WordSearchWrapper'),
  'anagrams': () => import('./anagrams/AnagramsWrapper'),
  'connections': () => import('./connections/ConnectionsWrapper'),
  'spelling-bee': () => import('./spellingbee/SpellingBeeWrapper'),
  'word-ladder': () => import('./wordladder/WordLadderWrapper'),
  'word-wheel': () => import('./rosco/RoscoWrapper'),
  'sudoku': () => import('./sudoku/SudokuWrapper'),
  'memory': () => import('./memory/MemoryWrapper'),
  'hangman': () => import('./hangman/HangmanWrapper'),
  'trivia': () => import('./trivia/TriviaWrapper'),
};

function GameSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
      <p className="text-sand-500 text-sm">Loading game...</p>
      <div className="w-64 h-2 bg-sand-200 rounded-full overflow-hidden">
        <div className="h-full bg-violet-500 rounded-full animate-pulse w-2/3" />
      </div>
    </div>
  );
}

export default function LazyGameWrapper({ game, lang }: Props) {
  const [GameComponent, setGameComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    const loadGame = async () => {
      const loader = gameComponents[game];
      if (!loader) {
        console.error(`Game not found: ${game}`);
        return;
      }
      const module = await loader();
      setGameComponent(() => module.default);
    };
    loadGame();
  }, [game]);

  if (!GameComponent) {
    return <GameSkeleton />;
  }

  return <GameComponent lang={lang} />;
}
