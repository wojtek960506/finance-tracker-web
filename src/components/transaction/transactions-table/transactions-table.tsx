import { Transaction } from "@/types/transaction-types";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DeleteTransactionModal } from "../delete-transaction-modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "@/api/transactions-api";
import { TransactionsTableHeader } from "./header";
import { TransactionContextMenu } from "./context-menu";
import { TransactionInfoCells } from "./info-cells";


export const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"]})
    }
  })

  const handleTransactionDelete = () => {
    if (!transactionToDelete) return;
    deleteMutation.mutate(transactionToDelete?._id)
  }

  const handleDetailsClick = (transaction: Transaction) => {
    console.log('Details', transaction);
  }

  const handleEditClick = (transaction: Transaction) => {
    console.log('Edit', transaction);
  }

  const handleDeleteClick = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setDeleteConfirmationOpen(true);
  }
  
  return (
    <Table className="text-lg">
      <TransactionsTableHeader />
      <TableBody>
        {transactions.map(transaction => (
          <TableRow
            key={transaction._id}
            onClick={() => alert(`Open details for transaction with ID: ${transaction._id}`)}
          >
            <TransactionInfoCells transaction={transaction}/>
            <TableCell className="sticky right-0 bg-background flex justify-center">
              <TransactionContextMenu
                onDetailsClick={() => handleDetailsClick(transaction)}
                onEditClick={() => handleEditClick(transaction)}
                onDeleteClick={() => handleDeleteClick(transaction)}
              />
            </TableCell>
          </TableRow>
        ))}
        <DeleteTransactionModal 
          onDelete={handleTransactionDelete}
          transaction={transactionToDelete}
          open={deleteConfirmationOpen}
          onOpenChange={setDeleteConfirmationOpen}
        />
      </TableBody>
    </Table>
  )
}