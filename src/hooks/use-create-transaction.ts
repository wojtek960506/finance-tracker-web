import { createTransaction } from "@/api/transactions-api";
import { TransactionCreateDTO } from "@/schemas/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: TransactionCreateDTO) => createTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"]})
      toast.success("Transaction created successfully!");
    },
  });

  return createMutation;
}