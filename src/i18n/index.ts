import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './translations/en.json'
import pt from './translations/ptBR.json'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    detection: {
      order: [
        'cookie',
        'navigator',
        'htmlTag',
        'localStorage',
        'path',
        'subdomain',
      ],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: en,
      'pt-BR': pt,
    },
  })

document.documentElement.lang = i18n.language

export default i18n
