import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import WordLadderGame from './WordLadderGame';

interface Props {
  lang?: Lang;
}

export default function WordLadderWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <WordLadderGame />
    </LanguageProvider>
  );
}
