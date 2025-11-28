import { TransactionAPI } from "@/types/transaction-types";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { TransactionsTableHeader } from "./header";
import { TransactionContextMenu } from "./context-menu";
import { TransactionInfoCells } from "./info-cells";
import { TransactionUpdateDTO } from "@/schemas/transaction";
import { useEditTransaction } from "@/hooks/use-edit-transaction";
import { useUndoableDelete } from "@/hooks/useUndoableDelete";
import { 
  DeleteTransactionModal,
  EditTransactionModal,
  ShowTransactionModal
} from "../modals";
import { FilteredResponse } from "@/types/api-types";
import { TransactionsPagination } from "./transactions-pagination";


export const TransactionsTable = ({ data }: { data: FilteredResponse<TransactionAPI[]> }) => {
  const { items: transactions, page, total, totalPages } = data;

  const [detailsOpen, setDetailsOpen] = useState(false);  
  const [transactionToDelete, setTransactionToDelete] = useState<TransactionAPI | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [transactionToShow, setTransactionToShow] = useState<TransactionAPI | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<TransactionAPI | null>(null);

  const deleteMutation = useUndoableDelete();
  const editMutation = useEditTransaction();
 
  const handleTransactionDelete = () => {
    if (!transactionToDelete) return;
    deleteMutation(transactionToDelete.id);
  }

  const handleEditTransaction = async (
    id: string,
    updatedTransaction: TransactionUpdateDTO | null
  ) => {
    if (!updatedTransaction) return;
    await editMutation.mutateAsync({
      id,
      updatedTransaction: updatedTransaction!
    });
  }
  
  const handleDetailsClick = (transaction: TransactionAPI) => {
    setTransactionToShow(transaction);
    setDetailsOpen(true);
  }

  const handleEditClick = (transaction: TransactionAPI) => {
    setTransactionToEdit(transaction);
    setEditOpen(true);
  }

  const handleDeleteClick = (transaction: TransactionAPI) => {
    setTransactionToDelete(transaction);
    setDeleteConfirmationOpen(true);
  }
  
  return (
    <div className="grid w-full gap-3">
      <Table className="text-lg">
        <TransactionsTableHeader />
        <TableBody>
          {transactions.map(transaction => (
            <TableRow
              key={transaction.id}
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
      <TransactionsPagination
        page={page}
        total={total}
        totalPages={totalPages}
      /> 
    </div>
  )
}