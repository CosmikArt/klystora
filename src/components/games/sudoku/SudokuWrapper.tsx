import { LanguageProvider } from '@/hooks/useLanguage';
import type { Lang } from '@/lib/i18n';
import SudokuGame from './SudokuGame';

interface Props {
  lang?: Lang;
}

export default function SudokuWrapper({ lang }: Props) {
  return (
    <LanguageProvider initialLang={lang}>
      <SudokuGame />
    </LanguageProvider>
  );
}
