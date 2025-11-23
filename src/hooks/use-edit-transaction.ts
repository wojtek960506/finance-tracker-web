import { editTransaction } from "@/api/transactions-api";
import { TransactionUpdateDTO } from "@/schemas/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditTransaction = () => {
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: (
      payload: { id: string, updatedTransaction: TransactionUpdateDTO}
    ) => editTransaction(payload.id, payload.updatedTransaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"]})
      toast.success("Transaction updated successfully!");
    },
  });

  return editMutation;
}