import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import Game2048 from './Game2048';

interface Props {
  lang?: Lang;
}

export default function Game2048Wrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <Game2048 />
    </LanguageProvider>
  );
}
