"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../public/locales/en/common.json";
import plCommon from "../public/locales/pl/common.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      pl: { common: plCommon },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    ns: ["common"],
    defaultNS: "common",
  });

export default i18n;