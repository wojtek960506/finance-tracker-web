"use client"

import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useGetTransactionExpenseStatistics,
  useGetTransactionIncomeStatistics,
} from "@/hooks/transaction-statistics";
import { CURRENCIES } from "@/lib/consts";


import { TransactionStatisticsQuery } from "@/schemas/transaction-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function TransactionStatisticsPage() {
  const { t } = useTranslation("common");
  
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [currency, setCurrency] = useState("");

  const [tmpFilters, setTmpFilters] = useState<
    Omit<TransactionStatisticsQuery, "transactionType">
  >({
    year: year ? year : undefined,
    month: month ? month : undefined,
    currency: currency,
  })

  const [error, setError] = useState<string | undefined >(undefined);

  const handleButtonClick = () => {
    let isError = false;
    if (!year && !month) {
      setError("Year or month has to be chosen");
      isError = true;
    }
    if (!currency) {
      setError("currency has to be chosen");
      isError = true;
    }
    
    if (![...CURRENCIES].includes(currency)) {
      setError("currency has to be valid value");
      isError = true;
    }

    if (month && (Number(month) > 12 || Number(month) < 1)) {
      console.log(month)
      setError("Month has to be a value between 1 and 12");
      isError = true;
    }

    if (isError) return;
    
    setTmpFilters({
      year: year ? year : undefined,
      month: month ? month : undefined,
      currency: currency
    })
    setError(undefined)
  }

  const { data: expenses } = useGetTransactionExpenseStatistics(tmpFilters);
  const { data: incomes } = useGetTransactionIncomeStatistics(tmpFilters);

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col h-full space-y-4 p-1 min-h-[300px]">
        <Card className="overflow-hidden">
          <CardHeader >
            <div className="flex flex-col items-center justify-start">
            
              <CardTitle className="text-2xl w-full justify-self-start">
                {t('transactionStatistics')}
              </CardTitle>

              <div className="flex w-full items-center justify-between mt-2">
                <Input
                  placeholder="write year"
                  className="w-auto"
                  type="number"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                />
                <Input
                  placeholder="write month"
                  className="w-auto"
                  type="number"
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                />
                <Input
                  placeholder="write currency"
                  className="w-auto"
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                />
                <Button
                  variant="default"
                  onClick={handleButtonClick}
                >
                  Apply
                </Button>
              </div>
              {error && <span className="text-destructive">{error}</span>}
            </div>
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