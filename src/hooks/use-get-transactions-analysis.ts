import { buildQueryParams } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getTransactionsAnalysis } from "@/api/transactions-api";
import { TransactionsAnalysisAPI } from "@/types/transaction-types";
import { TransactionsAnalysisQuery } from "@/schemas/transaction-statistics";


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