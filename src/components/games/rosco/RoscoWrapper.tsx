import { LanguageProvider } from '@/hooks/useLanguage';
import RoscoGame from './RoscoGame';

export default function RoscoWrapper() {
  return (
    <LanguageProvider>
      <RoscoGame />
    </LanguageProvider>
  );
}
