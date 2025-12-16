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
import { cn } from "@/lib/utils";


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
  
  // const expenseRowColor = "bg-[rgb(255,152,0)]"
  // const expenseRowHoverColor = "hover:bg-[rgba(255,152,0, 0.8)]"
  // const incomeRowColor = "bg-[rgb(33,150,243)]"
  // const incomeRowHoverColor = "hover:bg-[rgba(33,150,243, 0.9)]"

  const expenseRowColor = "bg-orange-300"
  const expenseRowHoverColor = "hover:bg-orange-400"
  const incomeRowColor = "bg-blue-300"
  const incomeRowHoverColor = "hover:bg-blue-400"

  return (
    <div className="grid w-full gap-3">
      <Table className="text-lg">
        <TransactionsTableHeader />
        <TableBody>
          {transactions.map(transaction => (
            <TableRow
              key={transaction.id}
              onClick={() => handleDetailsClick(transaction)}
              className={cn(
                transaction.transactionType === "expense"
                  ? cn(expenseRowColor, expenseRowHoverColor)
                  : cn(incomeRowColor, incomeRowHoverColor),
                "border-y border-y-1 border-y-gray-300"
              )}
            >
              <TransactionInfoCells transaction={transaction}/>
              <TableCell
                className={cn(
                  "sticky right-0 flex justify-center",
                  "bg-transparent",
              )}
              >
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