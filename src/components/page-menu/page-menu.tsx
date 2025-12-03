"use client"

import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

export const PageMenu = () => {
  const { t } = useTranslation("common");
  const router = useRouter()
  const pathname = usePathname();

  console.log('pathname', pathname);

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        onClick={() => router.push('/transactions')}
        className={pathname === '/transactions' ? "border-b border-red-800" : ""}
      >
        {t('allTransactions')}
      </Button>
      <Button
        variant="ghost"
        onClick={() => router.push('/transactions/analysis')}
        className={pathname === '/transactions/analysis' ? "border-b border-red-800" : ""}
      >
        {t('historyAnalysis')}
      </Button>
    </div>
    
  )
}