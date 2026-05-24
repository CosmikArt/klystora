import { LanguageProvider } from '@/hooks/useLanguage';
import WordSearchGame from './WordSearchGame';

export default function WordSearchWrapper() {
  return (
    <LanguageProvider>
      <WordSearchGame />
    </LanguageProvider>
  );
}
