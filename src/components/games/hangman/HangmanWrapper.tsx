import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import HangmanGame from './HangmanGame';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useEffect } from 'react';

interface Props {
  lang?: Lang;
}

function AnalyticsWrapper({ children, game }: { children: React.ReactNode; game: string }) {
  const { trackGameStart } = useAnalytics();
  
  useEffect(() => {
    trackGameStart(game);
  }, [trackGameStart, game]);
  
  return <>{children}</>;
}

export default function HangmanWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <AnalyticsWrapper game="hangman">
        <HangmanGame />
      </AnalyticsWrapper>
    </LanguageProvider>
  );
}
