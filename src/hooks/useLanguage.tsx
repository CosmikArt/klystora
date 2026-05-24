import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Lang } from '@/lib/translations';
import { translations } from '@/lib/translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem('klystora-lang');
    return (stored === 'es' ? 'es' : 'en') as Lang;
  });

  const setLangFn = useCallback((newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('klystora-lang', newLang);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const newLang = prev === 'en' ? 'es' : 'en';
      localStorage.setItem('klystora-lang', newLang);
      return newLang;
    });
  }, []);

  const t = useCallback((key: string): string => {
    const tr = translations[lang] as Record<string, string>;
    return tr[key] ?? key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangFn, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
