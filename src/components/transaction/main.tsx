"use client"

import { AddTransactionModal } from "@/components/transaction/add-transaction-modal";
import { TransactionsTable } from "@/components/transaction/transactions-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCreateTransaction } from "@/hooks/use-create-transaction";
import { useGetTransactions } from "@/hooks/use-get-transactions";
import { TransactionCreateAPI } from "@/types/transaction-types"
import { useTranslation } from "react-i18next";

export const TransactionsMain = () => {
  const { t } = useTranslation("common");
  const { transactions, isLoading, isError, error } = useGetTransactions();
  const createMutation = useCreateTransaction();

  return (
    <div className="flex flex-col h-full space-y-4 p-6">
      <Card className="overflow-hidden">
        <CardHeader className="grid grid-cols-2 gap-0 items-center">
          <CardTitle className="text-2xl">
            {t('recentTransactions')}
          </CardTitle>
          <AddTransactionModal
            onCreated={async (created: TransactionCreateAPI) => {
              await createMutation.mutateAsync(created);
            }}
          />
        </CardHeader>
        <CardContent className="flex flex-col overflow-auto">
          {isLoading && <p>Loading...</p>}
          {isError && <p className="text-red-500">{error?.message}</p>}
          {!isLoading && transactions?.length === 0 && <p>No transactions found.</p>}
          {!isLoading && (transactions ?? []).length > 0 && (
            <TransactionsTable transactions={transactions!}/>
          )}
        </CardContent>
      </Card>
    </div>
  )
}