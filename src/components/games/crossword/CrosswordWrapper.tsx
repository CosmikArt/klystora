import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import CrosswordGame from './CrosswordGame';

interface Props {
  lang?: Lang;
}

export default function CrosswordWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <CrosswordGame />
    </LanguageProvider>
  );
}
