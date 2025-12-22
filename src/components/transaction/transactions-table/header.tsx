"use client"

import { useTranslation } from "react-i18next";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const TransactionsTableHeader = () => {
  const { t } = useTranslation("common");

  return (
    <TableHeader className="sticky top-0 bg-gray-300 z-10">
      <TableRow>
        <TableHead className="text-center">{t('date')}</TableHead>
        <TableHead className="text-center">{t('description')}</TableHead>
        <TableHead className="text-center">{t('amount')}</TableHead>
        <TableHead className="text-center">{t('category')}</TableHead>
        <TableHead className="text-center">{t('paymentMethod')}</TableHead>
        <TableHead className="text-center">{t('account')}</TableHead>
        <TableHead className="text-center">{t('transactionType')}</TableHead>
        <TableHead className="sticky right-0" />
      </TableRow>
    </TableHeader>
  )
}