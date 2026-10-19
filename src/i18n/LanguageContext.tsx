import React, { useState, useEffect } from 'react';
import type { Language, TranslationSchema } from './types';
import { LanguageContext } from './context';
import { es } from './locales/es';
import { va } from './locales/va';
import { en } from './locales/en';

const translations: Record<Language, TranslationSchema> = {
  es,
  va,
  en,
};

const STORAGE_LANG_KEY = 'kontapro_language_preference';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      if (saved === 'ca') {
        localStorage.setItem(STORAGE_LANG_KEY, 'va');
        return 'va';
      }
      if (saved && (saved === 'es' || saved === 'va' || saved === 'en')) {
        return saved as Language;
      }
    } catch {
      // Fallback
    }
    return 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {
      // Silencioso
    }
  };

  useEffect(() => {
    document.documentElement.lang = language === 'va' ? 'ca-valencia' : language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language] || es,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
