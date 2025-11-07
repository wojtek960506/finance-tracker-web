export type TransactionCreateDTO = {
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

export type Transaction = TransactionCreateDTO & {
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}