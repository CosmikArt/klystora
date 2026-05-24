import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Lang } from '@/lib/translations';
import { translations, supportedLanguages } from '@/lib/translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children, initialLang = 'en' }: { children: ReactNode; initialLang?: Lang }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('klystora-lang');
      if (stored && supportedLanguages.includes(stored as Lang)) {
        return stored as Lang;
      }
    }
    return initialLang;
  });

  const setLangFn = useCallback((newLang: Lang) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('klystora-lang', newLang);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const currentIndex = supportedLanguages.indexOf(prev);
      const nextIndex = (currentIndex + 1) % supportedLanguages.length;
      const newLang = supportedLanguages[nextIndex];
      if (typeof window !== 'undefined') {
        localStorage.setItem('klystora-lang', newLang);
      }
      return newLang;
    });
  }, []);

  const t = useCallback((key: string): string => {
    const tr = translations[lang] as Record<string, string>;
    return tr[key] ?? translations.en[key] ?? key;
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
