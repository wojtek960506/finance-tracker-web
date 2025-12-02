import { Form } from "@/components/ui/form";
import {
  TransactionUpdateDTO,
  TransactionUpdateFormSchema,
  TransactionUpdateFormType
} from "@/schemas/transaction";
import { TransactionAPI } from "@/types/transaction-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CommonError } from "@/types/api-types";
import { ControlledInputField } from "@/components/common/common-form-v2/controlled/controlled-input-field";
import { ControlledSelectField } from "@/components/common/common-form-v2/controlled/controlled-select-field";
import { ControlledRadioField } from "@/components/common/common-form-v2/controlled/controlled-radio-field";
import {
  ACCOUNTS,
  CATEGORIES,
  CURRENCIES,
  PAYMENT_METHODS,
  TRANSACTION_TYPES
} from "@/lib/consts";


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
        <ControlledSelectField
          name={"currency"}
          placeholderKey={"currencyPlaceholder"}
          optionsKeys={CURRENCIES}
        />
        <ControlledSelectField
          name={"category"}
          placeholderKey={"categoryPlaceholder"}
          optionsKeys={CATEGORIES}
        />
        <ControlledSelectField
          name={"paymentMethod"}
          placeholderKey={"paymentMethodPlaceholder"}
          optionsKeys={PAYMENT_METHODS}
        />
        <ControlledSelectField
          name={"account"}
          placeholderKey={"accountPlaceholder"}
          optionsKeys={ACCOUNTS}
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