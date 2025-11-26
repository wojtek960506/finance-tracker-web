import { getTransactions } from "@/api/transactions-api"
import { FilteredResponse } from "@/types/api-types"
import { TransactionAPI } from "@/types/transaction-types"
import { useQuery } from "@tanstack/react-query"



export const useGetTransactions = () => {
  const { data, isLoading, isError, error } = useQuery<
    FilteredResponse<TransactionAPI[]> | undefined
    , Error
  >({
    queryKey: ['transactions'],
    queryFn: getTransactions
  })
  return {
    transactions: data?.items,
    isLoading,
    isError,
    error
  }
}