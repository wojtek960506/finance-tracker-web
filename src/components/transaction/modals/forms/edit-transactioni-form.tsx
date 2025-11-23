import { Form } from "@/components/ui/form";
import { sleep } from "@/lib/utils";
import { TransactionUpdateDTO, TransactionUpdateSchema } from "@/schemas/transaction";
import { TransactionAPI } from "@/types/transaction-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AccountField, AmountField, CategoryField, CurrencyField, DateField, DescriptionField, PaymentMethodField, TransactionTypeField } from "./fields";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


const getDefaultTransaction = (transaction: TransactionAPI | null) => ({
  date: transaction?.date ? new Date(transaction?.date).toISOString().slice(0, 10) : "",
  description: transaction?.description,
  amount: transaction?.amount,
  currency: transaction?.currency,
  category: transaction?.category,
  paymentMethod: transaction?.paymentMethod,
  account: transaction?.account,
  transactionType: transaction?.transactionType
})

type EdtiTransactionFormProps = {
  onEdit: (id: string, updatedTransaction: TransactionUpdateDTO | null) => void;
  transaction: TransactionAPI | null;
  onOpenChange: (value: boolean) => void;
}

export const EditTransactionForm = ({
  onEdit,
  transaction,
  onOpenChange,
}: EdtiTransactionFormProps) => {

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

  const onSubmit = async (values: TransactionUpdateDTO) => {
    setLoading(true);
    
    await sleep(2000);

    try {
      // TODO for onEdit use async version of mutate
      onEdit(transaction.id, values)
    } catch (err) {
      console.log(err)
      // show toast - TODO add some error handler (some modal or what is any other good way)
      alert((err as Error).message || "Failed");
    } finally {
      onOpenChange(false);
      setLoading(false);
    }
  }
  
  return (
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
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? t("saving") : t("save")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}