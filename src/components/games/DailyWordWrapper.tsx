import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import DailyWordGame from './DailyWordGame';

interface Props {
  lang?: Lang;
}

export default function DailyWordWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <DailyWordGame />
    </LanguageProvider>
  );
}
