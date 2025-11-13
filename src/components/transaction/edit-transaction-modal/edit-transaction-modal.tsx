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
import { useEffect } from "react";
import { DateField } from "./fields/date-field";
import { AmountField } from "./fields/amount-field";
import { CurrencyField } from "./fields/currency-field";
import { CategoryField } from "./fields/category-field";
import { PaymentMethodField } from "./fields/payment-method-field";
import { AccountField } from "./fields/account-field";

type EdtiTransactionModalProps = {
  onEdit: (transaction: Transaction | null) => void;
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
    console.log("Validated", values);

    await Promise.resolve(console.log("amma"))
    await sleep(2000);

    onEdit(null)
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('editTransaction')}</DialogTitle>
          <DialogDescription>{t('editTransactionDescription')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4 max-w-md"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DescriptionField />
            <DateField />
            <AmountField />
            <CurrencyField />
            <CategoryField />
            <PaymentMethodField />
            <AccountField />
            <DialogFooter className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>
                {t('cancel')}
              </Button>
              {/* <Button type="submit" disabled={loading}>
                {loading ? t("saving") : t("save")}
              </Button> */}
              <Button type="submit">{t("save")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}