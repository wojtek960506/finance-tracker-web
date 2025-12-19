"use client"

import { useTranslation } from "react-i18next";
import { CommonInfo } from "@/components/common";
import { Separator } from "@/components/ui/separator";
import { TransactionAPI } from "@/types/transaction-types";
import { useFormatNumber } from "@/hooks/use-format-number";

export const TransactionDetails = ({ transaction }: { transaction: TransactionAPI }) => {
  const { t, i18n } = useTranslation("common");
  const formatNumber = useFormatNumber();

  return (
    <div className="grid grid-cols-[3fr_4fr] gap-x-5 gap-y-3 text-lg">
      <CommonInfo
        label={t('date')}
        value={new Date(transaction.date).toLocaleDateString(i18n.language)}
      />
      <CommonInfo label={t("description")} value={transaction.description} />
      <CommonInfo
        label={t("amount")}
        value={`${formatNumber(transaction.amount, 2, true)} ${transaction.currency}`}
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
      
      {(transaction.currencies || transaction.exchangeRate) &&
        <Separator className="col-span-2 bg-gray-300"/>}
      {transaction.currencies && <CommonInfo
        label={t('currencies')}
        value={transaction.currencies}
      />}
      {transaction.exchangeRate && <CommonInfo
        label={t('exchangeRate')}
        value={formatNumber(transaction.exchangeRate, 2, true)}
      />}

      <Separator className="col-span-2 bg-gray-300"/>
      <CommonInfo
        label={t('createdAt')}
        value={new Date(transaction.createdAt).toLocaleString(i18n.language)}
      />
      <CommonInfo
        label={t('updatedAt')}
        value={new Date(transaction.updatedAt).toLocaleString(i18n.language)}
      />

    </div>
  )
}