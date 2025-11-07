"use client"

import { createTransaction, getTransactions } from "@/api/transactions-api";
import { AppLayout } from "@/components/layout/app-layout"
import { AddTransactionModal } from "@/components/transaction/add-transaction-modal";
import { TransactionsTable } from "@/components/transaction/transactions-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Transaction, TransactionCreateDTO } from "@/types/transaction-types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function TransactionsPage() {

  const { data: transactions, isLoading, isError, error } = useQuery<Transaction[], Error>({
    queryKey: ['transactions'],
    queryFn: getTransactions
  })

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: TransactionCreateDTO) => createTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"]})
    }
  })


  return (
    <AppLayout>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            
            <AddTransactionModal
              onCreated={(created: TransactionCreateDTO) => createMutation.mutate(created)}
            />

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