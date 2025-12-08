"use client"

import { CardContent } from "@/components/ui/card"
import { useGetTransactionStatistics } from "@/hooks/use-get-transaction-statistics";
import { TransactionStatisticsFilter } from "@/schemas/transaction-statistics";
import { NoYearNoMonthTable } from "./no-year-no-month-table";

export const TransactionStatisticsContent = (
  { filters }: { filters: TransactionStatisticsFilter }
) => {
  const { data: expenses } = useGetTransactionStatistics(filters, "expense");
  const { data: incomes } = useGetTransactionStatistics(filters, "income");

  const getTmp = () => {
    if (filters.year) {
      if (filters.month) return <span>YEAR AND MONTH</span>;
      else return <span>YEAR AND NO MONTH</span>;
    } else {
      if (filters.month) return <span>NO YEAR AND MONTH</span>;
      else return <NoYearNoMonthTable filters={filters}/>;
    }
  }

  return (
    <CardContent className="flex flex-col overflow-auto justify-between">
      {getTmp()}

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