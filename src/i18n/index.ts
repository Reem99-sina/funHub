import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import ar from "./ar.json";

// 👇 استرجاع اللغة المحفوظة أو الافتراضية
const savedLanguage = localStorage.getItem("lang") || "ar";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: savedLanguage,
    // 👆 استخدم اللغة المحفوظة بدل الثابتة
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// 👇 حفظ اللغة كلما تغيّرت
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
});

export default i18n;
