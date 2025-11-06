"use client"

import { getTransactions } from "@/api/transactions-api";
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Transaction } from "@/types/transaction-types"
import { useQuery } from "@tanstack/react-query";

export default function TransactionsPage() {

  const { data: transactions, isLoading, isError, error } = useQuery<Transaction[], Error>({
    queryKey: ['transactions'],
    queryFn: getTransactions
  })


  return (
    <AppLayout>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <p>Loading...</p>}
            {isError && <p className="text-red-500">{error?.message}</p>}
            {!isLoading && transactions?.length === 0 && <p>No transactions found.</p>}
            {!isLoading && (transactions ?? []).length > 0 && (
              <ul>
                {transactions?.map(t => (
                  <li key={t._id}>
                    {t.description} - {t.amount} {t.currency} ({new Date(t.date).toLocaleDateString()})
                  </li>
                ))}
              </ul>
            )}
            
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}