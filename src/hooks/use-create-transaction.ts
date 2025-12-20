import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TransactionCreateDTO, TransactionCreateExchageDTO } from "@/schemas/transaction";
import { createExchangeTransaction, createStandardTransaction } from "@/api/transactions-api";

export const useCreateTransaction = () => {
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();

  const createStandardMutation = useMutation({
    mutationFn: (payload: TransactionCreateDTO) => createStandardTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"]})
      toast.success(t('standardTransactionCreated'));
    },
  });

  const createExchangeMutation = useMutation({
    mutationFn: (payload: TransactionCreateExchageDTO) => createExchangeTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"]})
      toast.success(t('exchangeTransactionCreated'));
    },
  });

  return {
    createStandardMutation,
    createExchangeMutation,
  }
  
  
}