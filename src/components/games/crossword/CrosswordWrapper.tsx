import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import CrosswordGame from './CrosswordGame';
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

export default function CrosswordWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <AnalyticsWrapper game="crossword">
        <CrosswordGame />
      </AnalyticsWrapper>
    </LanguageProvider>
  );
}
