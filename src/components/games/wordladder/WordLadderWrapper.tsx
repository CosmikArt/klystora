import { LanguageProvider } from '@/hooks/useLanguage';
import WordLadderGame from './WordLadderGame';

export default function WordLadderWrapper() {
  return (
    <LanguageProvider>
      <WordLadderGame />
    </LanguageProvider>
  );
}
