import { getTransactions } from "@/api/transactions-api"
import { buildQueryParams } from "@/lib/utils"
import { TransactionQuery } from "@/schemas/transaction-query"
import { FilteredResponse } from "@/types/api-types"
import { TransactionAPI } from "@/types/transaction-types"
import { useQuery } from "@tanstack/react-query"

export const useGetTransactions = (filters: TransactionQuery) => {
  const { data, isLoading, isError, error } = useQuery<
    FilteredResponse<TransactionAPI[]> | undefined
    , Error
  >({
    queryKey: ['transactions', filters],
    queryFn: () => getTransactions(buildQueryParams(filters))
  })
  return {
    data,
    isLoading,
    isError,
    error
  }
}