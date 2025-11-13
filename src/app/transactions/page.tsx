"use client"

import { createTransaction, getTransactions } from "@/api/transactions-api";
import { AppLayout } from "@/components/layout/app-layout"
import { AddTransactionModal } from "@/components/transaction/add-transaction-modal";
import { TransactionsTable } from "@/components/transaction/transactions-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CommonError } from "@/types/api-types";
import { Transaction, TransactionCreateDTO } from "@/types/transaction-types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function TransactionsPage() {
  const { t } = useTranslation("common")

  const { data: transactions, isLoading, isError, error } = useQuery<Transaction[], Error>({
    queryKey: ['transactions'],
    queryFn: getTransactions
  })

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: TransactionCreateDTO) => createTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"]})
      toast.success("Transaction created!");
    },
    onError: (err: unknown) => {
      console.log('Creating transaction error:', err)
      toast.error((err as CommonError).message)
    }
  })

  return (
    <AppLayout>
      <div className="flex flex-col h-full space-y-4">
        <Card className="overflow-hidden">
          <CardHeader className="grid grid-cols-2 gap-0 items-center">
            <CardTitle className="text-2xl">
              {t('recentTransactions')}
            </CardTitle>
            <AddTransactionModal
              onCreated={(created: TransactionCreateDTO) => createMutation.mutate(created)}
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
    </AppLayout>
  )
}