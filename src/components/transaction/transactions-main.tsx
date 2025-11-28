"use client"

import { TransactionsTable } from "@/components/transaction/transactions-table";
import { Card, CardContent } from "@/components/ui/card"
import { useGetTransactions } from "@/hooks/use-get-transactions";
import { TransactionsFilterPanel } from "./transactions-filter-panel";
import { useTransactionsFilterStore } from "@/store/transactions-filter-store";
import { useGeneralStore } from "@/store/general-store";
import { TransactionsHeader } from "./transactions-header";
import { useTranslation } from "react-i18next";

export const TransactionsMain = () => {
  const { t } = useTranslation("common");
  const filters = useTransactionsFilterStore(s => s.filters)
  const { data, isLoading, isError, error } = useGetTransactions(filters);
  const { isShown } = useTransactionsFilterStore();
  const isLoggingOut = useGeneralStore(s => s.isLoggingOut);

  if (isLoggingOut) return null;

  return (
    <div className="flex-1 flex flex-col h-full space-y-4 p-6 min-h-[300px]">
      <Card className="overflow-hidden">
        <TransactionsHeader />
        <CardContent className="flex flex-row overflow-hidden justify-between">
          {isLoading && <p>{t('loading')}</p>}
          {isError && <p className="text-red-500">{error?.message}</p>}
          {!isLoading && data?.items.length === 0 && <p>{t('noTransactionsFound')}</p>}
          {!isLoading && (data?.items ?? []).length > 0 && (
            <TransactionsTable data={data!}/>
          )}      
          {isShown && <TransactionsFilterPanel />}
        </CardContent>
      </Card>
    </div>
  )
}