"use client"

import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { resetTransactionsFilterStore } from "@/store/transactions-filter-store";

export const PageMenu = () => {
  const { t } = useTranslation("common");
  const router = useRouter()
  const pathname = usePathname();

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        onClick={() => {
          resetTransactionsFilterStore();
          router.push('/transactions')
        }}
        className={pathname === '/transactions' ? "border-b border-red-800" : ""}
      >
        {t('allTransactions')}
      </Button>
      <Button
        variant="ghost"
        onClick={() => router.push('/transactions/statistics')}
        className={pathname === '/transactions/statistics' ? "border-b border-red-800" : ""}
      >
        {t('transactionStatistics')}
      </Button>
    </div>
    
  )
}