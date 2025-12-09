export type TransactionCreateAPI = {
  date: Date;
  description: string;
  amount: number;
  currency: string;
  category: string;
  transactionType: "income" | "expense";
  paymentMethod: string; // "cash" | "card" | "blik" | "transfer" | "atm";
  account: string;
  idx?: number;
  exchangeRate?: number;
  currencies?: string;
  calcRefIdx?: number;
}

export type TransactionAPI = TransactionCreateAPI & {
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export type TransactionsAnalysisAPI = {
  totalAmount: number;
  totalItems: number;
}

export type TotalAmountAndItems = {
  totalAmount: number;
  totalItems: number;
}

export type MonthYearStatistics = TotalAmountAndItems;

export type TotalAmountAndItemsObj = Record<number, TotalAmountAndItems>;

export type NoYearStatistics = {
  allTime: TotalAmountAndItems;
  yearly: TotalAmountAndItemsObj;
}

export type YearStatistics = {
  allTime: TotalAmountAndItems;
  monthly: TotalAmountAndItemsObj;
}

export type TransactionStatisticsAPI = MonthYearStatistics | NoYearStatistics | YearStatistics;

export type StatisticsType = "sumStatistics" | "averageStatistics";

export type AdjustableStatisticsColumnTitle = "" | "month" | "year";

export type CommonTransactionStatistics = {
  title: AdjustableStatisticsColumnTitle,
  allTimeExpense: TotalAmountAndItems,
  allTimeIncome: TotalAmountAndItems,
  periodicExpense: TotalAmountAndItemsObj,
  periodicIncome: TotalAmountAndItemsObj,
  periodicKeys: string[],
}