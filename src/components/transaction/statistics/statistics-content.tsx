"use client"

import { 
  AdjustableStatisticsColumnTitle,
  CommonTransactionStatistics,
  CommonTransactionStatisticsTable
} from "./common-statistics-table";

import {
  MonthYearStatistics,
  NoYearStatistics,
  TotalAmountAndItems,
  TotalAmountAndItemsObj,
  TransactionStatisticsAPI,
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

export const TransactionStatisticsContent = (
  { filters }: { filters: TransactionStatisticsFilter }
) => {

  const { data: dataExpense } = useGetTransactionStatistics(filters, "expense");
  const { data: dataIncome } = useGetTransactionStatistics(filters, "income");

  if (!dataExpense || !dataIncome) return null;

  let expense: TransactionStatisticsAPI | undefined = undefined;
  let income: TransactionStatisticsAPI | undefined = undefined;
  let periodicExpense: TotalAmountAndItemsObj | undefined = undefined;
  let periodicIncome: TotalAmountAndItemsObj | undefined = undefined;
  let allTimeExpense: TotalAmountAndItems | undefined = undefined;
  let allTimeIncome: TotalAmountAndItems | undefined = undefined;
  let title: AdjustableStatisticsColumnTitle = "";

  if (isMonthYearStatistics(dataExpense) && isMonthYearStatistics(dataIncome)) {
    expense = dataExpense as MonthYearStatistics;
    income = dataIncome as MonthYearStatistics;

    periodicExpense = {}
    periodicIncome = {}
    allTimeExpense = expense;
    allTimeIncome = income;
    title = "";
  }
  if (isNoYearStatistics(dataExpense) && isNoYearStatistics(dataIncome)) {
    expense = dataExpense as NoYearStatistics;
    income = dataIncome as NoYearStatistics;

    periodicExpense = expense.yearly;
    periodicIncome = income.yearly;
    allTimeExpense = expense.allTime;
    allTimeIncome = income.allTime;
    title = "year"
  }
  if (isYearStatistics(dataExpense) && isYearStatistics(dataIncome)) {
    expense = dataExpense as YearStatistics;
    income = dataIncome as YearStatistics;

    periodicExpense = expense.monthly;
    periodicIncome = income.monthly;
    allTimeExpense = expense.allTime;
    allTimeIncome = income.allTime;
    title = "month"
  }
  if (
    !expense || !income ||
    !periodicExpense || !periodicIncome ||
    !allTimeExpense || !allTimeIncome
  ) return null;

  const periodicKeys = [
    ... new Set([...Object.keys(periodicExpense), ...Object.keys(periodicIncome)])
  ].sort((a,b) => Number(a) - Number(b));

  const statistics: CommonTransactionStatistics = {
    title,
    allTimeExpense,
    allTimeIncome,
    periodicExpense,
    periodicIncome,
    periodicKeys
  }

  return (
    <CardContent className="flex flex-col overflow-auto justify-between">
      <CommonTransactionStatisticsTable statistics={statistics} />
    </CardContent>
  )
}