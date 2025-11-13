import { deleteTransaction } from "@/api/transactions-api";
import { CommonError } from "@/types/api-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"]})
      toast.success("Transaction deleted successfully!");
    },
    onError: (err: unknown) => {
      console.log("Deleting transaction error:", err);
      toast.error((err as CommonError).message);
    }
  });

  return { deleteMutation }
}