import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import MemoryGame from './MemoryGame';

interface Props {
  lang?: Lang;
}

export default function MemoryWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <MemoryGame />
    </LanguageProvider>
  );
}
