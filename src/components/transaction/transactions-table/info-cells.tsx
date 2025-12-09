"use client"

import { CommonTooltip } from "@/components/common";
import { TableCell } from "@/components/ui/table";
import { useFormatNumber } from "@/hooks/use-format-number";
import { TransactionAPI } from "@/types/transaction-types";
import { useTranslation } from "react-i18next";

export const TransactionInfoCells = ({ transaction }: { transaction: TransactionAPI}) => {
  const { t, i18n } = useTranslation("common");
  const formatNumber = useFormatNumber();
  
  return (
    <>
      <TableCell className="text-center">
        {new Date(transaction.date).toLocaleDateString(i18n.language)}
      </TableCell>
      <TableCell className="text-center">
        <CommonTooltip
          triggerClassName="max-w-[180px] truncate inline-block text-left"
          triggerValue={transaction.description}
          contentValue={transaction.description}
        />
      </TableCell>
      <TableCell className="text-end">
        {`${formatNumber(transaction.amount, 2, true)} ${transaction.currency}`}
      </TableCell>
      <TableCell className="text-center">
        {t(`category_options.${transaction.category}`)}
      </TableCell>
      <TableCell className="text-center">
        {t(`paymentMethod_options.${transaction.paymentMethod}`)}
      </TableCell>
      <TableCell className="text-center">
        {t(`account_options.${transaction.account}`)}
      </TableCell>
      <TableCell className="text-center">
        {t(`transactionType_options.${transaction.transactionType}`)}
      </TableCell>
    </>
  )
}