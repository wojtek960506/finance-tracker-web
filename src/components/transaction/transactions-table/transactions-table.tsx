import { Transaction } from "@/types/transaction-types";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DeleteTransactionModal } from "../delete-transaction-modal";
import { useState } from "react";
import { TransactionsTableHeader } from "./header";
import { TransactionContextMenu } from "./context-menu";
import { TransactionInfoCells } from "./info-cells";
import { ShowTransactionModal } from "../show-transaction-modal";
import { EditTransactionModal } from "../edit-transaction-modal";
import { TransactionUpdateDTO } from "@/schemas/transaction";
import { useEditTransaction } from "@/hooks/use-edit-transaction";
import { useDeleteTransaction } from "@/hooks/use-delete-transaction";


export const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);  
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [transactionToShow, setTransactionToShow] = useState<Transaction | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  const { deleteMutation } = useDeleteTransaction();
  const { editMutation } = useEditTransaction();
 
  const handleTransactionDelete = () => {
    if (!transactionToDelete) return;
    deleteMutation.mutate(transactionToDelete?._id)
  }

  const handleEditTransaction = (id: string, updatedTransaction: TransactionUpdateDTO | null) => {
    if (!updatedTransaction) return;
    editMutation.mutate({
      id,
      updatedTransaction: updatedTransaction!
    });
  }
  
  const handleDetailsClick = (transaction: Transaction) => {
    setTransactionToShow(transaction);
    setDetailsOpen(true);
  }

  const handleEditClick = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setEditOpen(true);
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
            onClick={() => handleDetailsClick(transaction)}
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
        <ShowTransactionModal
          transaction={transactionToShow}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
        />
        <EditTransactionModal
          onEdit={handleEditTransaction}
          transaction={transactionToEdit}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      </TableBody>
    </Table>
  )
}