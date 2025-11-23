import { Form } from "@/components/ui/form";
import { TransactionUpdateDTO, TransactionUpdateSchema } from "@/schemas/transaction";
import { TransactionAPI } from "@/types/transaction-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { 
  AccountField,
  AmountField,
  CategoryField,
  CurrencyField,
  DateField,
  DescriptionField,
  PaymentMethodField,
  TransactionTypeField
} from "./fields";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


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
  onOpenChange: (value: boolean) => void;
  onEdit: (id: string, updatedTransaction: TransactionUpdateDTO | null) => Promise<void>;
  transaction: TransactionAPI | null;
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
    
    try {
      await onEdit(transaction.id, values);
    } catch (err) {
      toast.error((err as Error).message || "Updating transaction failed");
    } finally {
      onOpenChange(false);
      setLoading(false);
    }
  }
  
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-[auto_1fr] gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <DescriptionField />
        <DateField />
        <AmountField />
        <CurrencyField />
        <CategoryField />
        <PaymentMethodField />
        <AccountField />
        <TransactionTypeField />
        <DialogFooter className="col-start-2 flex justify-end gap-2">
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