import { TransactionAPI, TransactionsAnalysisAPI, TransactionStatisticsAPI } from "@/types/transaction-types";
import { api } from "./axios";
import { TransactionCreateDTO, TransactionUpdateDTO } from "@/schemas/transaction";
import { withRefresh } from "./auth-api";
import { FilteredResponse } from "@/types/api-types";

const getTransactionsNoRefresh = async (query: string): Promise<
  FilteredResponse<TransactionAPI[]>
> => {
  const { data } = await api.get(`/transactions?${query}`);
  return data;
}

export const getTransactions = async (query: string): Promise<
  FilteredResponse<TransactionAPI[]> | undefined> => {
  return withRefresh(getTransactionsNoRefresh, query);
}

const exportTransactionsNoRefresh = async () => {
  const { data } = await api.get(`/transactions/export`, { responseType: 'blob' });
  return data;
}

export const exportTransactions = async () => {
  return withRefresh(exportTransactionsNoRefresh);
}


const getTransactionsAnalysisNoRefresh = async (
  query: string
): Promise<TransactionsAnalysisAPI> => {
  const { data } = await api.get(`/transactions/analysis?${query}`);
  return data;
}

export const getTransactionsAnalysis = async (
  query: string
): Promise<TransactionsAnalysisAPI | undefined> => {
  return withRefresh(getTransactionsAnalysisNoRefresh, query);
}

const getTransactionStatisticsNoRefresh = async (
  query: string
): Promise<TransactionStatisticsAPI> => {
  const { data } = await api.get(`/transactions/statistics?${query}`);
  return data;
}

export const getTransactionStatistics = async (
  query: string
): Promise<TransactionStatisticsAPI | undefined> => {
  return withRefresh(getTransactionStatisticsNoRefresh, query);
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