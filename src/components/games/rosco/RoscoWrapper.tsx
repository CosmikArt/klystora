import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import RoscoGame from './RoscoGame';

interface Props {
  lang?: Lang;
}

export default function RoscoWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <RoscoGame />
    </LanguageProvider>
  );
}
