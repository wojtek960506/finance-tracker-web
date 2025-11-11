"use client"

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from "react-i18next"

export const TransactionsTableHeader = () => {
  const { t } = useTranslation("common");

  return (
    <TableHeader className="sticky top-0 bg-background z-10">
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
  )
}