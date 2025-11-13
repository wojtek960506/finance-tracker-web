import { Transaction, TransactionCreateDTO } from "@/types/transaction-types";
import { api } from "./axios";
import { TransactionUpdateDTO } from "@/schemas/transaction";

export const getTransactions = async (): Promise<Transaction[]> => {
  const { data } = await api.get('/transactions');
  console.log('transactions', data)
  return data
}

export const createTransaction = async (payload: TransactionCreateDTO): Promise<Transaction> => {
  try {
    const { data } = await api.post('/transactions', payload)
    return data
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log((err as any).response.data)
    throw new Error((err as Error).message)
  }
}

export const deleteTransaction = async (id: string): Promise<Transaction> => {
  try {
    const { data } = await api.delete(`/transactions/${id}`);
    return data;
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log((err as any).response.data)
    throw new Error((err as Error).message)
  }
}

export const editTransaction = async (id: string, payload: TransactionUpdateDTO): Promise<Transaction> => {
  try {
    const { data } = await api.put(`/transactions/${id}`, payload)
    return data
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log((err as any).response.data)
    throw new Error((err as Error).message)
  }
}