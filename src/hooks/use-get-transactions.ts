import { getTransactions } from "@/api/transactions-api"
import { Transaction } from "@/types/transaction-types"
import { useQuery } from "@tanstack/react-query"

export const useGetTransactions = () => {
  const { data, isLoading, isError, error } = useQuery<Transaction[], Error>({
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