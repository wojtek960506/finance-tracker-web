import { getTransactions } from "@/api/transactions-api"
import { TransactionAPI } from "@/types/transaction-types"
import { useQuery } from "@tanstack/react-query"

export const useGetTransactions = () => {
  const { data, isLoading, isError, error } = useQuery<TransactionAPI[] | undefined, Error>({
    queryKey: ['transactions'],
    queryFn: getTransactions
  })
  return {
    transactions: data,
    isLoading,
    isError,
    error
  }
}