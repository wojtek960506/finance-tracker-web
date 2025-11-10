import { Transaction } from "@/types/transaction-types";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteTransactionModal } from "./delete-transaction-modal";
import { useState } from "react";


export const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => {
  const { t, i18n } = useTranslation("common");

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);

  const handleTransactionDelete = () => {
    console.log('transaction to delete:', transactionToDelete)
  }
  
  return (
    <Table className="text-xl">

      <TableHeader>
        <TableRow>
          <TableHead>{t('date')}</TableHead>
          <TableHead>{t('description')}</TableHead>
          <TableHead>{t('amount')}</TableHead>
          <TableHead>{t('currency')}</TableHead>
          <TableHead>{t('category')}</TableHead>
          <TableHead>{t('paymentMethod')}</TableHead>
          <TableHead>{t('account')}</TableHead>
          <TableHead>{t('transactionType')}</TableHead>
          <TableHead className="sticky right-0 bg-background"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.map(txn => (
          <TableRow
            key={txn._id}
            onClick={() => alert(`Open details for transaction with ID: ${txn._id}`)}
          >
            <TableCell>{new Date(txn.date).toLocaleDateString(i18n.language)}</TableCell>
            
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="max-w-[180px] truncate inline-block text-left">
                    {txn.description}
                  </TooltipTrigger>
                  <TooltipContent>
                    {txn.description}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            
            <TableCell>{txn.amount}</TableCell>
            <TableCell>{`${t(`currency_options.${txn.currency}`)} (${txn.currency})`}</TableCell>
            <TableCell>{t(`category_options.${txn.category}`)}</TableCell>
            <TableCell>{t(`paymentMethod_options.${txn.paymentMethod}`)}</TableCell>
            <TableCell>{t(`account_options.${txn.account}`)}</TableCell>
            <TableCell>{t(`transactionType_options.${txn.transactionType}`)}</TableCell>

            <TableCell className="sticky right-0 bg-background flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="hover:bg-gray-300 ml-5">
                    <MoreVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Details');
                    }}
                  >
                    {t('details')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Edit');
                    }}
                  >
                    {t('edit')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirmationOpen(true);
                      setTransactionToDelete(txn);
                    }}
                  >
                    {t('delete')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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