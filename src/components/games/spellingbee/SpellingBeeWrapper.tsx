import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import SpellingBeeGame from './SpellingBeeGame';

interface Props {
  lang?: Lang;
}

export default function SpellingBeeWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <SpellingBeeGame />
    </LanguageProvider>
  );
}
