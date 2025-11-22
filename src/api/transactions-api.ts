import { Transaction, TransactionCreateDTO } from "@/types/transaction-types";
import { api } from "./axios";
import { TransactionUpdateDTO } from "@/schemas/transaction";
import { withRefresh } from "./auth-api";

const getTransactionsNoRefresh = async (
  accessToken: string | null
): Promise<Transaction[]> => {
  const { data } = await api.get(
    '/transactions',
    { headers: { Authorization: `Bearer ${accessToken}`} }
  );
  return data
}

export const getTransactions = async (
  accessToken: string | null
): Promise<Transaction[]> => withRefresh(getTransactionsNoRefresh, false, accessToken);

export const createTransaction = async (payload: TransactionCreateDTO): Promise<Transaction> => {
  const { data } = await api.post('/transactions', payload)
  return data
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