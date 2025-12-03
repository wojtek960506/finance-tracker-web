"use client"

import { CommonInfo } from "@/components/common";
import { Separator } from "@/components/ui/separator";
import { TransactionAPI } from "@/types/transaction-types";
import { useTranslation } from "react-i18next";

export const TransactionDetails = ({ transaction }: { transaction: TransactionAPI }) => {
  const { t, i18n } = useTranslation("common")

  return (
    <div className="grid grid-cols-[3fr_4fr] gap-x-5 gap-y-3 text-lg">
      <CommonInfo
        label={t('date')}
        value={new Date(transaction.date).toLocaleDateString(i18n.language)}
      />
      <CommonInfo label={t("description")} value={transaction.description} />
      <CommonInfo
        label={t("amount")}
        value={`${transaction.amount} ${transaction.currency}`}
      />
      <CommonInfo
        label={t("category")}
        value={t(`category_options.${transaction.category}`)}
      />
      <CommonInfo
        label={t("paymentMethod")}
        value={t(`paymentMethod_options.${transaction.paymentMethod}`)}
      />
      <CommonInfo
        label={t("account")}
        value={t(`account_options.${transaction.account}`)}
      />
      <CommonInfo
        label={t("transactionType")} 
        value={t(`transactionType_options.${transaction.transactionType}`)}
      />
      <Separator className="col-span-2 bg-gray-300"/>
      <CommonInfo
        label={t('created_at')}
        value={new Date(transaction.createdAt).toLocaleString(i18n.language)}
      />
      <CommonInfo
        label={t('updated_at')}
        value={new Date(transaction.updatedAt).toLocaleString(i18n.language)}
      />
    </div>
  )
}