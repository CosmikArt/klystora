import { LanguageProvider } from '@/hooks/useLanguage';
import SpellingBeeGame from './SpellingBeeGame';

export default function SpellingBeeWrapper() {
  return (
    <LanguageProvider>
      <SpellingBeeGame />
    </LanguageProvider>
  );
}
