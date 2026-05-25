import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import WordSearchGame from './WordSearchGame';

interface Props {
  lang?: Lang;
}

export default function WordSearchWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <WordSearchGame />
    </LanguageProvider>
  );
}
