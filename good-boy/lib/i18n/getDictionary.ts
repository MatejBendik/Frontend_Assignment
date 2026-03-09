import 'server-only';
import { cache } from 'react';
import type { Locale } from "./settings";

const dictionaries = {
  sk: () => import("./locales/sk.json").then((m) => m.default),
  en: () => import("./locales/en.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
