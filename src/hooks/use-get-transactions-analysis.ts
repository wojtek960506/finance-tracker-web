import { getTransactionsAnalysis } from "@/api/transactions-api";
import { buildQueryParams } from "@/lib/utils";
import { TransactionsAnalysisQuery } from "@/schemas/transaction-query";
import { TransactionsAnalysisAPI } from "@/types/transaction-types";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionsAnalysis = (filters: TransactionsAnalysisQuery) => {
  const { data, isLoading, isError, error } = useQuery<
    TransactionsAnalysisAPI | undefined, Error
  >({
    queryKey: ['transactionAnalysis', filters],
    queryFn: () => getTransactionsAnalysis(buildQueryParams(filters))
  })

  return {
    data,
    isLoading,
    isError,
    error
  }
}