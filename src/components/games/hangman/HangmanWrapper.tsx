import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import HangmanGame from './HangmanGame';

interface Props {
  lang?: Lang;
}

export default function HangmanWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <HangmanGame />
    </LanguageProvider>
  );
}
