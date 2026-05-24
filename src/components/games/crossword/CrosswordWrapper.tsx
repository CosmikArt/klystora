import { LanguageProvider } from '@/hooks/useLanguage';
import CrosswordGame from './CrosswordGame';

export default function CrosswordWrapper() {
  return (
    <LanguageProvider>
      <CrosswordGame />
    </LanguageProvider>
  );
}
