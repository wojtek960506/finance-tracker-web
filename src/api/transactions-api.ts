import { Transaction } from "@/types/transaction-types";
import { api } from "./axios";

export async function getTransactions(): Promise<Transaction[]> {
  const { data } = await api.get('/transactions');
  console.log('transactions', data)
  return data
}