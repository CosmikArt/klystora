import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import Game2048 from './Game2048';
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

export default function Game2048Wrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <AnalyticsWrapper game="2048">
        <Game2048 />
      </AnalyticsWrapper>
    </LanguageProvider>
  );
}
