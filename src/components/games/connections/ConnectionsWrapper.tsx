import { LanguageProvider } from '@/hooks/useLanguage';
import ConnectionsGame from './ConnectionsGame';

export default function ConnectionsWrapper() {
  return (
    <LanguageProvider>
      <ConnectionsGame />
    </LanguageProvider>
  );
}
