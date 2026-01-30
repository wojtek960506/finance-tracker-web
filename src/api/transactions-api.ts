import { api } from "./axios";
import { withRefresh } from "./auth-api";
import { FilteredResponse } from "@/types/api-types";
import {
  TransactionCreateDTO,
  TransactionCreateExchangeDTO,
  TransactionCreateTransferDTO,
  TransactionUpdateDTO,
} from "@/schemas/transaction";
import {
  TransactionAPI,
  TransactionsAnalysisAPI,
  TransactionStatisticsAPI,
  TransactionTotalsAPI,
} from "@/types/transaction-types";


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

const getTransactionTotalsNoRefresh = async (query: string): Promise<TransactionTotalsAPI> => {
  const { data } = await api.get(`transactions/totals?${query}`);
  return data;
}

export const getTransactionTotals = async (query: string): Promise<
  TransactionTotalsAPI | undefined
> => withRefresh(getTransactionTotalsNoRefresh, query);

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

const createStandardTransactionNoRefresh = async (
  payload: TransactionCreateDTO
): Promise<TransactionAPI> => {
  const { data } = await api.post('/transactions/standard', payload)
  return data
}

export const createStandardTransaction = async (
  payload: TransactionCreateDTO
): Promise<TransactionAPI | undefined> => withRefresh(createStandardTransactionNoRefresh, payload);

const createExchangeTransactionNoRefresh = async (
  payload: TransactionCreateExchangeDTO
): Promise<TransactionAPI> => {
  const { data } = await api.post('/transactions/exchange', payload);
  return data;
}

export const createExchangeTransaction = async (
  payload: TransactionCreateExchangeDTO
): Promise<TransactionAPI | undefined> => withRefresh(createExchangeTransactionNoRefresh, payload);

export const deleteTransactionNoRefresh = async (id: string): Promise<TransactionAPI> => {
  const { data } = await api.delete(`/transactions/${id}`);
  return data;
}

const createTransferTransactionNoRefresh = async (
  payload: TransactionCreateTransferDTO
): Promise<TransactionAPI> => {
  const { data } = await api.post('/transactions/transfer', payload);
  return data;
}

export const createTransferTransaction = async (
  payload: TransactionCreateTransferDTO
): Promise<TransactionAPI | undefined> => withRefresh(createTransferTransactionNoRefresh, payload);

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