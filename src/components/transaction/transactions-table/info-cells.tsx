"use client"

import { CommonTooltip } from "@/components/common/common-tooltip";
import { TableCell } from "@/components/ui/table";
import { TransactionAPI } from "@/types/transaction-types";
import { useTranslation } from "react-i18next";

export const TransactionInfoCells = ({ transaction }: { transaction: TransactionAPI}) => {
  const { t, i18n } = useTranslation("common");
  
  return (
    <>
      <TableCell>{new Date(transaction.date).toLocaleDateString(i18n.language)}</TableCell>
      <TableCell>
        <CommonTooltip
          triggerClassName="max-w-[180px] truncate inline-block text-left"
          triggerValue={transaction.description}
          contentValue={transaction.description}
        />
      </TableCell>
      <TableCell>{transaction.amount}</TableCell>
      <TableCell>
        {/* {`${t(`currency_options.${transaction.currency}`)} (${transaction.currency})`} */}
        {transaction.currency}
      </TableCell>
      <TableCell>{t(`category_options.${transaction.category}`)}</TableCell>
      <TableCell>{t(`paymentMethod_options.${transaction.paymentMethod}`)}</TableCell>
      <TableCell>{t(`account_options.${transaction.account}`)}</TableCell>
      <TableCell>{t(`transactionType_options.${transaction.transactionType}`)}</TableCell>
    </>
  )
}