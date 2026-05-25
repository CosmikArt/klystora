import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import AnagramsGame from './AnagramsGame';

interface Props {
  lang?: Lang;
}

export default function AnagramsWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <AnagramsGame />
    </LanguageProvider>
  );
}
