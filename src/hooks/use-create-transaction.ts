import { createTransaction } from "@/api/transactions-api";
import { CommonError } from "@/types/api-types";
import { TransactionCreateAPI } from "@/types/transaction-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: TransactionCreateAPI) => createTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"]})
      toast.success("Transaction created successfully!");
    },
    onError: (err: unknown) => {
      console.log('Creating transaction error:', err);
      toast.error((err as CommonError).message);
    }
  });

  return createMutation;
}