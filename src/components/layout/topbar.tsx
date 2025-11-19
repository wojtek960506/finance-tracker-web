"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function Topbar() {
  const { t, i18n } = useTranslation("common");

  const [lang, setLang] = useState<"en" | "pl">("en");
  const [accessToken, setAccessToken] = useState<string | null>(null);


  useEffect(() => {
    const token = localStorage.getItem("access-token");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAccessToken(token);

    const tmpLanguage = localStorage.getItem("language");
    const language = ["pl", "en"].includes(tmpLanguage || "")
      ? (tmpLanguage as "pl" | "en")
      : "en";
    setLang(language);

  }, [setAccessToken, setLang]);


  console.log("lang", lang);

  const switchLanguage = (lng: "en" | "pl") => {
    localStorage.setItem("language", lng);
    setLang(lng);
    i18n.changeLanguage(lng);
  }

  return (
    <header className="flex items-center h-14 border-b bg-background ">
      {/* App logo / name */}
      <div
        className="flex h-full w-64 flex-shrink-0 text-xl font-semibold px-4 items-center border-r"
      >
        {t('title')}
      </div>
      
      <div
        className="flex items-center justify-between h-14 px-6 w-full  gap-3"
      >

        {/* Left side — app section title or menu */}
        <div className="flex items-center gap-3">
          { accessToken && <h1 className="text-lg font-semibold tracking-tight">
            {t('transactions')}
          </h1> }
        </div>

        {/* Right side — placeholder for future features */}
        <div className="flex items-center gap-4">
          <Button
            variant={lang === "en" ? "default" : "secondary"}
            onClick={() => {
              switchLanguage("en")
              setLang("en")
            }}
          >
            {t('languageEnglish')}
          </Button>
          <Button
            variant={lang === "pl" ? "default" : "secondary"}
            onClick={() => {
              switchLanguage("pl")
              setLang("pl")
            }}
          >
            {t('languagePolish')}
          </Button>     
          { accessToken && <div className="text-sm text-muted-foreground">WZ</div>}
        </div>
      </div>
    </header>
  )
}
