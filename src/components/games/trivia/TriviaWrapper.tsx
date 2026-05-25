import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import TriviaGame from './TriviaGame';

interface Props {
  lang?: Lang;
}

export default function TriviaWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <TriviaGame />
    </LanguageProvider>
  );
}
