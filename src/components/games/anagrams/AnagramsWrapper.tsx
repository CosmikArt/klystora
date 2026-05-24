import { LanguageProvider } from '@/hooks/useLanguage';
import AnagramsGame from './AnagramsGame';

export default function AnagramsWrapper() {
  return (
    <LanguageProvider>
      <AnagramsGame />
    </LanguageProvider>
  );
}
