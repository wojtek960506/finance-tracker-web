"use client"

import { TransactionStatisticsTable } from "../statistics-table";
import {
  AdjustableStatisticsColumnTitle,
  MonthYearStatistics,
  NoYearStatistics,
  StatisticsType,
  TotalAmountAndItems,
  TotalAmountAndItemsObj,
  TransactionStatisticsAPI,
  VisualisationType,
  YearStatistics
} from "@/types/transaction-types";
import {
  isMonthYearStatistics,
  isNoYearStatistics,
  isYearStatistics
} from "./check-statistics-types";
import { CardContent } from "@/components/ui/card"
import { TransactionStatisticsFilter } from "@/schemas/transaction-statistics";
import { useGetTransactionStatistics } from "@/hooks/use-get-transaction-statistics";
import { useTranslation } from "react-i18next";
import { prepareStatistics } from "@/utils/prepare-statistics";
import { TransactionStatisticsBarCharts } from "../statistics-bar-charts";

type TransactionStatisticsContentProps = {
  filters: TransactionStatisticsFilter,
  statisticsType: StatisticsType,
  visualisationType: VisualisationType,
}

const StatisticsNotAvailable = () => {
  const { t } = useTranslation("common");
  return (
    <CardContent className="flex flex-col overflow-auto justify-between">
      <div>{t('averageStatisticsNotAvailableForMonthOrYear')}</div>
    </CardContent>
  ) 
};

export const TransactionStatisticsContent = ({
  filters,
  statisticsType,
  visualisationType,
}: TransactionStatisticsContentProps) => {
  const { data: dataExpense } = useGetTransactionStatistics(filters, "expense");
  const { data: dataIncome } = useGetTransactionStatistics(filters, "income");

  if (!dataExpense || !dataIncome) return null;

  let expense: TransactionStatisticsAPI | undefined = undefined;
  let income: TransactionStatisticsAPI | undefined = undefined;
  let periodicExpense: TotalAmountAndItemsObj | undefined = undefined;
  let periodicIncome: TotalAmountAndItemsObj | undefined = undefined;
  let allTimeExpense: TotalAmountAndItems | undefined = undefined;
  let allTimeIncome: TotalAmountAndItems | undefined = undefined;
  let periodicTitle: AdjustableStatisticsColumnTitle = "";

  if (isMonthYearStatistics(dataExpense) && isMonthYearStatistics(dataIncome)) {
    if (statisticsType === "averageStatistics")
      return <StatisticsNotAvailable />;
    
    expense = dataExpense as MonthYearStatistics;
    income = dataIncome as MonthYearStatistics;

    periodicExpense = {}
    periodicIncome = {}
    allTimeExpense = expense;
    allTimeIncome = income;
    periodicTitle = "";
  }
  if (isNoYearStatistics(dataExpense) && isNoYearStatistics(dataIncome)) {
    if (statisticsType === "averageStatistics" && filters.month)
      return <StatisticsNotAvailable />;
    
    expense = dataExpense as NoYearStatistics;
    income = dataIncome as NoYearStatistics;

    periodicExpense = expense.yearly;
    periodicIncome = income.yearly;
    allTimeExpense = expense.allTime;
    allTimeIncome = income.allTime;
    periodicTitle = "year"
  }
  if (isYearStatistics(dataExpense) && isYearStatistics(dataIncome)) {
    if (statisticsType === "averageStatistics")
      return <StatisticsNotAvailable />;
    
    expense = dataExpense as YearStatistics;
    income = dataIncome as YearStatistics;

    periodicExpense = expense.monthly;
    periodicIncome = income.monthly;
    allTimeExpense = expense.allTime;
    allTimeIncome = income.allTime;
    periodicTitle = "month"
  }
  if (
    !expense || !income ||
    !periodicExpense || !periodicIncome ||
    !allTimeExpense || !allTimeIncome
  ) return null;

  const periodicKeys = [
    ... new Set([...Object.keys(periodicExpense), ...Object.keys(periodicIncome)])
  ].sort((a,b) => Number(a) - Number(b));

  const statistics = prepareStatistics({
    periodicTitle,
    allTimeExpense,
    allTimeIncome,
    periodicExpense,
    periodicIncome,
    periodicKeys,
  }, statisticsType);

  const isSum = statisticsType === "sumStatistics";
  const firstHeaderKeys = [
    "",
    isSum ? "totalAmountTransactions" : "averageAmountTransactions",
    isSum ? "totalItemsTransactions" : "averageItemsTransactions",
  ] as [string, string, string];
  const secondHeaderKeys = [
    periodicTitle,
    "expense",
    "income",
    "balance",
    "expense",
    "income",
  ] as [string, string, string, string, string, string];

  return (
    <CardContent className="flex flex-col overflow-auto justify-between">
      {visualisationType === "tableVisualisation" ? (
        <TransactionStatisticsTable
          statistics={statistics}
          firstHeaderKeys={firstHeaderKeys}
          secondHeaderKeys={secondHeaderKeys}
          currency={filters.currency}
        />
      ) : (
        <TransactionStatisticsBarCharts
          statistics={statistics}
          currency={filters.currency}
          isSum={isSum}
        />
      )}
    </CardContent>
  )
}