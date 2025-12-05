import { getTransactionStatistics } from "@/api/transactions-api";
import { buildQueryParams } from "@/lib/utils";
import { TransactionStatisticsQuery } from "@/schemas/transaction-query";
import { TransactionStatisticsAPI } from "@/types/transaction-types";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionExpenseStatistics = (
  filters: Omit<TransactionStatisticsQuery, "transactionType">
) => {
  const { data, isLoading, isError, error } = useQuery<
    TransactionStatisticsAPI | undefined, Error
  >({
    queryKey: ['transactionExpenseStatistics', { ...filters }],
    queryFn: () => getTransactionStatistics(
      buildQueryParams({ ...filters, transactionType: "expense" })
    )
  });

  return {
    data,
    isLoading,
    isError,
    error,
  }
}