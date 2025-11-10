"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Transaction } from "@/types/transaction-types";
import { useTranslation } from "react-i18next";

type DeleteTransactionModalProps = {
  onDelete: () => void;
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const SimpleInfo = ({ label, value }: { label: string, value: string }) => {
  const classNameLabel = "font-bold justify-self-end";
  return (
    <>
      <span className={classNameLabel}>{label}</span>
      <span>{value}</span>
    </>
  )
}

export const DeleteTransactionModal = (
  { onDelete, transaction, open, onOpenChange }: DeleteTransactionModalProps
) => {
  const { t, i18n } = useTranslation("common");

  if (!transaction) return null;
    
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      
      <DialogContent className="bg-red-50">
        <DialogHeader>
          <DialogTitle className="text-destructive">{t('deleteTransaction')}</DialogTitle>
          <DialogDescription className="text-destructive">{t('deleteTransactionQuestion')}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-[3fr_4fr] gap-x-5 gap-y-3 text-xl">
          <SimpleInfo
            label={t('date')}
            value={new Date(transaction.date).toLocaleDateString(i18n.language)}
          />
          <SimpleInfo label={t("description")} value={transaction.description} />
          <SimpleInfo
            label={t("amount")}
            value={`${transaction.amount} ${transaction.currency}`}
          />
          <SimpleInfo
            label={t("category")}
            value={t(`category_options.${transaction.category}`)}
          />
          <SimpleInfo
            label={t("paymentMethod")}
            value={t(`paymentMethod_options.${transaction.paymentMethod}`)}
          />
          <SimpleInfo
            label={t("account")}
            value={t(`account_options.${transaction.account}`)}
          />
          <SimpleInfo
            label={t("transactionType")} 
            value={t(`transactionType_options.${transaction.transactionType}`)}
          />
          <Separator className="col-span-2 bg-gray-300"/>
          <SimpleInfo
            label={t('created_at')}
            value={new Date(transaction.createdAt).toLocaleString(i18n.language)}
          />
          <SimpleInfo
            label={t('updated_at')}
            value={new Date(transaction.updatedAt).toLocaleString(i18n.language)}
          />
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>No</Button>
          <Button
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation()
              onOpenChange(false)
              onDelete();
            }}
          >Delete</Button>
        </DialogFooter>
        
      </DialogContent>
    </Dialog>
  )
}
