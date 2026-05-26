import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import SpellingBeeGame from './SpellingBeeGame';
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

export default function SpellingBeeWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <AnalyticsWrapper game="spelling-bee">
        <SpellingBeeGame />
      </AnalyticsWrapper>
    </LanguageProvider>
  );
}
