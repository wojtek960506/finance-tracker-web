import { Transaction } from "@/types/transaction-types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";


export const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => {
  const { t } = useTranslation("common");
  
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
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.map(txn => (
          <TableRow
            key={txn._id}
            onClick={() => alert(`Open details for transaction with ID: ${txn._id}`)}
          >
            <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
            
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
          </TableRow>
        ))}
      </TableBody>
    
    </Table>
  )
}