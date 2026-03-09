"use client";

import { useEffect } from "react";
import i18next from "i18next";
import {
  I18nextProvider,
  initReactI18next,
  useTranslation as useTranslationOriginal,
} from "react-i18next";
import { type Locale, defaultLocale } from "./settings";
import sk from "./locales/sk.json";
import en from "./locales/en.json";

const resources = { sk: { translation: sk }, en: { translation: en } };

i18next.use(initReactI18next).init({
  resources,
  lng: defaultLocale,
  fallbackLng: defaultLocale,
  interpolation: { escapeValue: false },
});

interface TranslationsProviderProps {
  lang: Locale;
  children: React.ReactNode;
}

export function TranslationsProvider({
  lang,
  children,
}: TranslationsProviderProps) {
  useEffect(() => {
    if (i18next.language !== lang) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}

export { useTranslationOriginal as useTranslation };
