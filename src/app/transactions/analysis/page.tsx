"use client"

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTransactionsAnalysis } from "@/hooks/use-get-transactions-analysis";
import { TransactionsAnalysisQuery } from "@/schemas/transaction-query";
import { useTranslation } from "react-i18next";

export default function TransactionsAnalysisPage() {
  const { t } = useTranslation("common");
  const tmpF: TransactionsAnalysisQuery = {
    startDate: "2024/01/01",
    endDate: "2025/01/01",
    transactionType: "expense",
    currency: "PLN",
    // category?: string | undefined;
    // paymentMethod?: string | undefined;
    // account?: string | undefined;
  }

  const { data } = useGetTransactionsAnalysis(tmpF)

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col h-full space-y-4 p-1 min-h-[300px]">
        <Card className="overflow-hidden">
          <CardHeader className="flex items-center">
            {/* <div> */}
            <CardTitle className="text-2xl">
              {t('transactionsHistoryAnalysis')}
            </CardTitle>
            {/* </div> */}
          </CardHeader>
          <CardContent className="flex flex-col overflow-auto justify-between">
            <span>TODO add some monthly and yearly summary with option to choose some categories
            - for sure type of transaction cannot be change here. Maybe by default we will present
            summary for each year with all expenses and incomes and there will some additional panel
            to filter those results by one value (category or payment method, etc.). For each month
            there will be amount of expenses and inconmes and number of operations of each type.
            But somehow for now I can only let one currency to be presented at the time (by default)
            PLN. And later maybe there will be way to calculate other currencies by some exchange
            rate taken from official webpage of NBP - but it might be complicated and not very
            precise. So maybe from server for now I will just return calculations for the given
            period for each currency separately.</span>

            <div className="mt-7">ABC</div>
            {data && <div className="border border-2 border-red-900 flex gap-2">
              <span>{data.totalAmount}</span>
              <span>{data.totalItems}</span>
            </div>}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}