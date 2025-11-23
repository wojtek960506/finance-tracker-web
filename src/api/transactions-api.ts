import { TransactionAPI } from "@/types/transaction-types";
import { api } from "./axios";
import { TransactionCreateDTO, TransactionUpdateDTO } from "@/schemas/transaction";
import { withRefresh } from "./auth-api";

const getTransactionsNoRefresh = async (): Promise<TransactionAPI[]> => {
  const { data } = await api.get('/transactions');
  return data
}

export const getTransactions = async (): Promise<TransactionAPI[] | undefined> => {
  return withRefresh(getTransactionsNoRefresh);
}

const createTransactionNoRefresh = async (
  payload: TransactionCreateDTO
): Promise<TransactionAPI> => {
  const { data } = await api.post('/transactions', payload)
  return data
}

export const createTransaction = async (
  payload: TransactionCreateDTO
): Promise<TransactionAPI | undefined> => withRefresh(createTransactionNoRefresh, payload);

export const deleteTransaction = async (id: string): Promise<TransactionAPI> => {
  try {
    const { data } = await api.delete(`/transactions/${id}`);
    return data;
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log((err as any).response.data)
    throw new Error((err as Error).message)
  }
}

const editTransactionNoRefresh = async (
  id: string,
  payload: TransactionUpdateDTO
): Promise<TransactionAPI> => {
  const { data } = await api.put(`/transactions/${id}`, payload)
  return data
}

export const editTransaction = async (
  id: string,
  payload: TransactionUpdateDTO
): Promise<TransactionAPI | undefined> => withRefresh(editTransactionNoRefresh, id, payload);