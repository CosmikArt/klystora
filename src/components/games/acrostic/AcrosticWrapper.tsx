import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import AcrosticGame from './AcrosticGame';
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

export default function AcrosticWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <AnalyticsWrapper game="acrostic">
        <AcrosticGame />
      </AnalyticsWrapper>
    </LanguageProvider>
  );
}
