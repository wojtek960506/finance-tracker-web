export interface Transaction {
  date: Date;
  description: string;
  amount: number;
  currency: string;
  category: string;
  transactionType: "income" | "expense";
  paymentMethod: string; // "cash" | "card" | "blik" | "transfer" | "atm";
  account: string;
  createdAt: Date;
  updatedAt: Date;
  idx?: number;
  exchangeRate?: number;
  currencies?: string;
  calcRefIdx?: number;
  _id: string;
}