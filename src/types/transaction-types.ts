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

type TotalAmountAndItems = {
  totalAmount: number;
  totalItems: number;
}

type MonthYearStatistics = TotalAmountAndItems;

type TotalAmountAndItemsObj = Record<number, TotalAmountAndItems>;

type MonthStatistics = {
  allTimeByMonth: TotalAmountAndItems;
  yearly: TotalAmountAndItemsObj;
}

type YearStatistics = {
  allTimeByYear: TotalAmountAndItems;
  monthly: TotalAmountAndItemsObj;
}

export type TransactionStatisticsAPI = MonthYearStatistics | MonthStatistics | YearStatistics;