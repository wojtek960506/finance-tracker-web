"use client"

import { TransactionsTable } from "@/components/transaction/transactions-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCreateTransaction } from "@/hooks/use-create-transaction";
import { useGetTransactions } from "@/hooks/use-get-transactions";
import { useTranslation } from "react-i18next";
import { AddTransactionModal } from "./modals";
import { TransactionCreateDTO } from "@/schemas/transaction";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { TransactionsFilter } from "./transactions-filter";
import { useTransactionsFilterStore } from "@/store/transactions-filter-store";
import { useGeneralStore } from "@/store/general-store";
import { TransactionsFilterHeader } from "./transactions-filter/transactions-filter-header";

export const TransactionsMain = () => {
  const { t } = useTranslation("common");
  const { transactions, isLoading, isError, error } = useGetTransactions();
  const { isShown, setIsShown } = useTransactionsFilterStore();
  const createMutation = useCreateTransaction();
  const [filterPanelOn, setFilterPanelOn] = useState(isShown);
  const isLoggingOut = useGeneralStore(s => s.isLoggingOut);

  if (isLoggingOut) return null;

  return (
    <div className="flex-1 flex flex-col h-full space-y-4 p-6 min-h-[300px]">
      <Card className="overflow-hidden">
        <CardHeader >
          <div className="flex justify-between">
            <CardTitle className="text-2xl">
              {t('recentTransactions')}
            </CardTitle>
            <div className="flex gap-6">
              <AddTransactionModal
                onCreated={async (created: TransactionCreateDTO) => {
                  await createMutation.mutateAsync(created);
                }}
              />
              <div className="flex gap-2 justify-self-end items-center border-2 border-black rounded-lg px-4">
                <Switch
                  id="filter-switch"
                  checked={filterPanelOn}
                  onCheckedChange={(v: boolean) => {
                    setFilterPanelOn(v);
                    setIsShown(v);
                  }}
                />
                <Label htmlFor="filter-switch" className="text-lg">{t('filterPanel')}</Label>
              </div>
            </div>
            
          </div>
          <TransactionsFilterHeader />
        </CardHeader>
        <CardContent className="flex flex-row overflow-hidden">
          {isLoading && <p>Loading...</p>}
          {isError && <p className="text-red-500">{error?.message}</p>}
          {!isLoading && transactions?.length === 0 && <p>No transactions found.</p>}
          {!isLoading && (transactions ?? []).length > 0 && (
            <>
              <TransactionsTable transactions={transactions!}/>
              {filterPanelOn && <TransactionsFilter />}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}