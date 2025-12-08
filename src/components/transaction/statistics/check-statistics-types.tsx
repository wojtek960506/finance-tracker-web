import {
  MonthYearStatistics,
  NoYearStatistics,
  TransactionStatisticsAPI,
  YearStatistics
} from "@/types/transaction-types";

export function isMonthYearStatistics(
  data: TransactionStatisticsAPI
): data is MonthYearStatistics {
  return "totalAmount" in data && "totalAmount" in data && !("allTime" in data);
}

export function isNoYearStatistics(
  data: TransactionStatisticsAPI
): data is NoYearStatistics {
  return "allTime" in data && "yearly" in data;
}

export function isYearStatistics(
  data: TransactionStatisticsAPI
): data is YearStatistics {
  return "allTime" in data && "monthly" in data;
}
