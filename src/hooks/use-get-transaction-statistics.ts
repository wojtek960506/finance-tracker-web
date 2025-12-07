import { getTransactionStatistics } from "@/api/transactions-api";
import { buildQueryParams } from "@/lib/utils";
import { TransactionStatisticsQuery } from "@/schemas/transaction-statistics";
import { TransactionStatisticsAPI } from "@/types/transaction-types";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionStatistics = (
  filters: Omit<TransactionStatisticsQuery, "transactionType">,
  transactionType: "expense" | "income"
) => {
  const { data, isLoading, isError, error } = useQuery<
    TransactionStatisticsAPI | undefined, Error
  >({
    queryKey: ['transactionStatistics', transactionType, { ...filters }],
    queryFn: () => getTransactionStatistics(
      buildQueryParams({ ...filters, transactionType })
    ),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  }
}