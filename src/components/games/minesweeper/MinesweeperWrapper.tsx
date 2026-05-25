import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import MinesweeperGame from './MinesweeperGame';

interface Props {
  lang?: Lang;
}

export default function MinesweeperWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <MinesweeperGame />
    </LanguageProvider>
  );
}
