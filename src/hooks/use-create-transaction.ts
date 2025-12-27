import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TransactionCreateDTO,
  TransactionCreateExchangeDTO,
  TransactionCreateTransferDTO,
} from "@/schemas/transaction";
import {
  createExchangeTransaction,
  createStandardTransaction,
  createTransferTransaction,
} from "@/api/transactions-api";

export const useCreateTransaction = () => {
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();

  // TODO update queryKey in all of the above mutations with `filters`
  // as it is probably not working properly

  const createStandardMutation = useMutation({
    mutationFn: (payload: TransactionCreateDTO) => createStandardTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"]});
      toast.success(t('standardTransactionCreated'));
    },
  });

  const createExchangeMutation = useMutation({
    mutationFn: (payload: TransactionCreateExchangeDTO) => createExchangeTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"]});
      toast.success(t('exchangeTransactionCreated'));
    },
  });

  const createTransferMutation = useMutation({
    mutationFn: (payload: TransactionCreateTransferDTO) => createTransferTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"]});
      toast.success(t('transferTransactionCreated'));
    }
  })

  return {
    createStandardMutation,
    createExchangeMutation,
    createTransferMutation,
  }
  
  
}