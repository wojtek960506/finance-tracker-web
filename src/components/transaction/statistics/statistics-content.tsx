"use client"

import { CardContent } from "@/components/ui/card"
import { TransactionStatisticsFilter } from "@/schemas/transaction-statistics";
import { NoYearNoMonthTable } from "./no-year-no-month-table";

export const TransactionStatisticsContent = (
  { filters }: { filters: TransactionStatisticsFilter }
) => {

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
    </CardContent>
  )
}