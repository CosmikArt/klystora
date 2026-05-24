import { LanguageProvider } from '@/hooks/useLanguage';
import DailyWordGame from './DailyWordGame';

export default function DailyWordWrapper() {
  return (
    <LanguageProvider>
      <DailyWordGame />
    </LanguageProvider>
  );
}
