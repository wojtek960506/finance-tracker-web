import { CommonTransactionStatistics, StatisticsType } from "@/types/transaction-types";

export const prepareStatistics = (
  {
    periodicTitle,
    allTimeExpense,
    allTimeIncome,
    periodicExpense,
    periodicIncome,
    periodicKeys,
  }: CommonTransactionStatistics,
  statisticsType: StatisticsType
) => {
  const divideByMonths = statisticsType === "sumStatistics" ? 1 : 12;
  const divideByYears = statisticsType === "sumStatistics" ? 1 : periodicKeys.length;
  const statistics: CommonTransactionStatistics = {
    periodicTitle,
    allTimeExpense: {
      totalAmount: allTimeExpense.totalAmount / divideByYears,
      totalItems: allTimeExpense.totalItems / divideByYears,
    },
    allTimeIncome: {
      totalAmount: allTimeIncome.totalAmount / divideByYears,
      totalItems: allTimeIncome.totalItems / divideByYears,
    },
    periodicExpense: Object.fromEntries(
      Object.entries(periodicExpense).map(([key, value]) => {
        return [
          key,
          {
            totalAmount: value.totalAmount / divideByMonths,
            totalItems: value.totalItems / divideByMonths,
          }
        ]
      })
    ),
    periodicIncome: Object.fromEntries(
      Object.entries(periodicIncome).map(([key, value]) => {
        return [
          key,
          {
            totalAmount: value.totalAmount / divideByMonths,
            totalItems: value.totalItems / divideByMonths,
          }
        ]
      })
    ),
    periodicKeys
  }
  return statistics;
}