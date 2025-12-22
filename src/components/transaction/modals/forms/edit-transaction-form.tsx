import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CommonError } from "@/types/api-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { TransactionAPI } from "@/types/transaction-types";
import {
  ACCOUNT_OPTIONS,
  CATEGORY_OPTIONS,
  CURRENCY_CODE_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPES
} from "@/lib/consts";
import {
  TransactionUpdateDTO,
  TransactionUpdateFormType,
  TransactionUpdateFormSchema,
} from "@/schemas/transaction";
import {
  ControlledInputField,
  ControlledRadioField,
  ControlledCommonSelectField,
} from "@/components/controlled-form";


const getDefaultTransaction = (
  transaction: TransactionAPI | null
): TransactionUpdateFormType => ({
  date: transaction?.date ? new Date(transaction?.date).toISOString().slice(0, 10) : "",
  description: transaction?.description ?? "",
  amount: transaction?.amount ? String(transaction!.amount) : "",
  currency: transaction?.currency ?? "",
  category: transaction?.category ?? "",
  paymentMethod: transaction?.paymentMethod ?? "",
  account: transaction?.account ?? "",
  transactionType: transaction?.transactionType ?? ""
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
  const form = useForm<TransactionUpdateFormType>({
    resolver: zodResolver(TransactionUpdateFormSchema),
    defaultValues: getDefaultTransaction(transaction)
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
      if (transaction)
        form.reset(getDefaultTransaction(transaction));
    }, [form, transaction])
  
    if (!transaction) return null;

  const onSubmit = async (values: TransactionUpdateFormType) => {
    setLoading(true);
    
    try {
      await onEdit(transaction.id, { ...values, amount: Number(values.amount) });
    } catch (err: unknown) {  
      console.log('Updating transaction error:', err);
      toast.error((err as CommonError).message || "Updating transaction failed");
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
        <ControlledInputField name="date" type="date" />
        <ControlledInputField name="description" type="text" />
        <ControlledInputField name="amount" type="number" step={0.01} decimalPlaces={2} />
        <ControlledCommonSelectField
          name={"currency"}
          placeholderKey={"currencyPlaceholder"}
          options={CURRENCY_CODE_OPTIONS}
        />
        <ControlledCommonSelectField
          name={"category"}
          placeholderKey={"categoryPlaceholder"}
          options={CATEGORY_OPTIONS}
        />
        <ControlledCommonSelectField
          name={"paymentMethod"}
          placeholderKey={"paymentMethodPlaceholder"}
          options={PAYMENT_METHOD_OPTIONS}
        />
        <ControlledCommonSelectField
          name={"account"}
          placeholderKey={"accountPlaceholder"}
          options={ACCOUNT_OPTIONS}
        />
        <ControlledRadioField
          name={"transactionType"}
          optionsKeys={TRANSACTION_TYPES}
        />

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