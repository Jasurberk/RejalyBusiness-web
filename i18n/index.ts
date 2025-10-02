
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// Import from TS modules for wider browser compatibility
import en from './en.ts';
import uz from './uz.ts';
import ru from './ru.ts';

export const resources = {
  en: {
    translation: en,
  },
  uz: {
    translation: uz,
  },
  ru: {
    translation: ru,
  },
} as const;

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;