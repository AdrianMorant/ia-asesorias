import { createContext } from 'react';
import type { LanguageContextProps } from './types';
import { es } from './locales/es';

export const LanguageContext = createContext<LanguageContextProps>({
  language: 'es',
  setLanguage: () => {},
  t: es,
});
