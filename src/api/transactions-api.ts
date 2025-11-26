import { TransactionAPI } from "@/types/transaction-types";
import { api } from "./axios";
import { TransactionCreateDTO, TransactionUpdateDTO } from "@/schemas/transaction";
import { withRefresh } from "./auth-api";
import { FilteredResponse } from "@/types/api-types";

const getTransactionsNoRefresh = async (): Promise<
  FilteredResponse<TransactionAPI[]>
> => {
  const { data } = await api.get('/transactions');
  return data
}

export const getTransactions = async (): Promise<
  FilteredResponse<TransactionAPI[]> | undefined> => {
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

export const deleteTransactionNoRefresh = async (id: string): Promise<TransactionAPI> => {
  const { data } = await api.delete(`/transactions/${id}`);
  return data;
}

export const deleteTransaction = async (
  id: string
): Promise<TransactionAPI | undefined> => withRefresh(deleteTransactionNoRefresh, id);

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