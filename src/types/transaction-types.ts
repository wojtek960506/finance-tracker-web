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

type YearlyResult = (TotalAmountAndItems & { year: number })[];

type MonthStatistics = {
  allTimeByMonth: TotalAmountAndItems;
  yearly: YearlyResult;
}

type MonthlyResult = (TotalAmountAndItems & { month: number })[];

type YearStatistics = {
  allTimeByYear: TotalAmountAndItems;
  monthly: MonthlyResult;
}

export type TransactionStatisticsAPI = MonthYearStatistics | MonthStatistics | YearStatistics;