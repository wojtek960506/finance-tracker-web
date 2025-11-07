import { Transaction } from "@/types/transaction-types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <Table className="text-xl">
      
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Account</TableHead>
          <TableHead>Transaction Type</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.map(t => (
          <TableRow
            key={t._id}
            onClick={() => alert(`Open details for transaction with ID: ${t._id}`)}
          >
            <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
            <TableCell className="max-w-[180px] truncate">{t.description}</TableCell>
            <TableCell>{t.amount}</TableCell>
            <TableCell>{t.currency}</TableCell>
            <TableCell>{t.category}</TableCell>
            <TableCell>{t.paymentMethod}</TableCell>
            <TableCell>{t.account}</TableCell>
            <TableCell>{t.transactionType}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    
    </Table>
  )
}