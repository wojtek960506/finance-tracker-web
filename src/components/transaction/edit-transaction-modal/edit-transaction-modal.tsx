import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { TransactionUpdateDTO, TransactionUpdateSchema } from "@/schemas/transaction";
import { Transaction } from "@/types/transaction-types";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form";
import { DescriptionField } from "./fields/description-field";
import { sleep } from "@/lib/utils";
import { useEffect, useState } from "react";
import { DateField } from "./fields/date-field";
import { AmountField } from "./fields/amount-field";
import { CurrencyField } from "./fields/currency-field";
import { CategoryField } from "./fields/category-field";
import { PaymentMethodField } from "./fields/payment-method-field";
import { AccountField } from "./fields/account-field";
import { TransactionTypeField } from "./fields/transaction-type-field";

type EdtiTransactionModalProps = {
  onEdit: (id: string, updatedTransaction: TransactionUpdateDTO | null) => void;
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const getDefaultTransaction = (transaction: Transaction | null) => ({
  date: transaction?.date ? new Date(transaction?.date).toISOString().slice(0, 10) : "",
  description: transaction?.description,
  amount: transaction?.amount,
  currency: transaction?.currency,
  category: transaction?.category,
  paymentMethod: transaction?.paymentMethod,
  account: transaction?.account,
  transactionType: transaction?.transactionType
})

export const EditTransactionModal = (
  { onEdit, transaction, open, onOpenChange }: EdtiTransactionModalProps
) => {
  const { t } = useTranslation("common");
  const form = useForm<TransactionUpdateDTO>({
    resolver: zodResolver(TransactionUpdateSchema),
    defaultValues: getDefaultTransaction(transaction)
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (transaction)
      form.reset(getDefaultTransaction(transaction));
  }, [form, transaction])

  if (!transaction) return null;

  const handleOpenChange = (value: boolean) => {
    if (value === true) {
      onOpenChange(true)
    } else {
      onOpenChange(false)
      form.reset(getDefaultTransaction(transaction))
    }
  }

  const onSubmit = async (values: TransactionUpdateDTO) => {
    setLoading(true);
    
    await sleep(2000);

    try {
      onEdit(transaction._id, values)
    } catch (err) {
      console.log(err)
      // show toast - TODO add some error handler (some modal or what is any other good way)
      alert((err as Error).message || "Failed");
    } finally {
      handleOpenChange(false);
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex flex-col max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{t('editTransaction')}</DialogTitle>
          <DialogDescription>{t('editTransactionDescription')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="max-w-md flex flex-col overflow-hidden "
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-4 overflow-y-auto pr-1 pl-1">
              <DescriptionField />
              <DateField />
              <AmountField />
              <CurrencyField />
              <CategoryField />
              <PaymentMethodField />
              <AccountField />
              <TransactionTypeField />
            </div>
            <DialogFooter className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>
                {t('cancel')}
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? t("saving") : t("save")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}