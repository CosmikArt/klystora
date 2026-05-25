import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import ConnectionsGame from './ConnectionsGame';

interface Props {
  lang?: Lang;
}

export default function ConnectionsWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <ConnectionsGame />
    </LanguageProvider>
  );
}
