import { createContext, useContext, useEffect, useState, type ReactNode, useCallback } from "react";
import allTranslations, { type LangCode, type Translations, languages } from "@/i18n/translations";

interface LanguageContextType {
  lang: LangCode;
  t: Translations;
  setLang: (l: LangCode) => void;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(
    () => (localStorage.getItem("fcc-lang") as LangCode) || "en"
  );

  const applyLang = useCallback((code: LangCode) => {
    const meta = languages.find((l) => l.code === code);
    const isRtl = meta?.rtl ?? false;
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", code);
  }, []);

  const setLang = (code: LangCode) => {
    setLangState(code);
    localStorage.setItem("fcc-lang", code);
    applyLang(code);
  };

  useEffect(() => {
    applyLang(lang);
  }, []);

  const meta = languages.find((l) => l.code === lang);
  const isRtl = meta?.rtl ?? false;

  return (
    <LanguageContext.Provider value={{ lang, t: allTranslations[lang], setLang, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
