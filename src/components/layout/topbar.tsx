"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Topbar() {
  const { t, i18n } = useTranslation("common");

  const [lang, setLang] = useState<"en" | "pl">("en")

  const switchLanguage = (lng: "en" | "pl") => i18n.changeLanguage(lng);

  return (
    <header className="flex items-center justify-between h-14 border-b bg-background px-6">
      {/* Left side — app section title or menu */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold tracking-tight">{t('transactions')}</h1>
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
        <div className="text-sm text-muted-foreground">Hello, User</div>
      </div>
    </header>
  )
}
