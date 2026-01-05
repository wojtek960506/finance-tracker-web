"use client"

import { useTranslation } from "react-i18next";
import { useGeneralStore } from "@/store/general-store";
import { Card, CardContent } from "@/components/ui/card";
import { useGetTransactions } from "@/hooks/use-get-transactions";
import { NotLoggedLayout } from "@/components/layout/not-logged-layout";
import { useTransactionsFilterStore } from "@/store/transactions-filter-store";
import { TransactionsTable } from "@/components/transaction/transactions-table";
import { TransactionsHeader } from "@/components/transaction/transactions-header";
import { TransactionsFilterPanel } from "@/components/transaction/transactions-filter-panel";


export default function TransactionsPage() {
  const { t } = useTranslation("common");
  const { data, isLoading, isError, error } = useGetTransactions();
  const { isShown } = useTransactionsFilterStore();
  const isLoggingOut = useGeneralStore(s => s.isLoggingOut);

  if (isLoggingOut) return null;

  return (
    <NotLoggedLayout>
      <div className="flex-1 flex flex-col h-full space-y-4 p-2 min-h-[400px]">
        <Card className="overflow-hidden gap-2">
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
    </NotLoggedLayout>
  )
}