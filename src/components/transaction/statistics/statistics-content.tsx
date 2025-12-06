"use client"

import { CardContent } from "@/components/ui/card"
import { useGetTransactionStatistics } from "@/hooks/use-get-transaction-statistics";
import { TransactionStatisticsFilter } from "@/schemas/transaction-statistics";

export const TransactionStatisticsContent = (
  { tmpFilters }: { tmpFilters: TransactionStatisticsFilter }
) => {
  const { data: expenses } = useGetTransactionStatistics(tmpFilters, "expense");
  const { data: incomes } = useGetTransactionStatistics(tmpFilters, "income");

  return (
    <CardContent className="flex flex-col overflow-auto justify-between">
      {expenses && (
        <>
          <span className="mt-4">Expenses</span>
          <div className="border border-2 border-red-900 flex gap-2">
            {JSON.stringify(expenses)}
          </div>
        </>
      )}
      {incomes && (
        <>
          <span className="mt-4">Incomes</span>  
          <div className="border border-2 border-red-900 flex gap-2">
            {JSON.stringify(incomes)}
          </div>
        </>
      )}
    </CardContent>
  )
}