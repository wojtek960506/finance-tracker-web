"use client"

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetTransactionExpenseStatistics,
  useGetTransactionIncomeStatistics,
} from "@/hooks/transaction-statistics";


import { TransactionStatisticsQuery } from "@/schemas/transaction-query";
import { useTranslation } from "react-i18next";

export default function TransactionStatisticsPage() {
  const { t } = useTranslation("common");
  
  const tmpFilters: Omit<TransactionStatisticsQuery, "transactionType"> = {
    year: "2024",
    currency: "PLN",
    omitCategory: ["myAccount"],
  }

  const { data: expenses } = useGetTransactionExpenseStatistics(tmpFilters);
  const { data: incomes } = useGetTransactionIncomeStatistics(tmpFilters);

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col h-full space-y-4 p-1 min-h-[300px]">
        <Card className="overflow-hidden">
          <CardHeader className="flex items-center">
            {/* <div> */}
            <CardTitle className="text-2xl">
              {t('transactionStatistics')}
            </CardTitle>
            {/* </div> */}
          </CardHeader>
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
        </Card>
      </div>
    </AppLayout>
  )
}