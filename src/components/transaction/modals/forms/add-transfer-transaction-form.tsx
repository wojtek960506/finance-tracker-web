import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CommonError } from "@/types/api-types";
import { Button } from "@/components/ui/button";
import { ACCOUNTS, CURRENCIES } from "@/lib/consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { ControlledInputField, ControlledSelectField } from "@/components/controlled-form";
import {
  TransactionCreateTransferDTO,
  TransactionCreateTransferFormSchema,
  TransactionCreateTransferFormType
} from "@/schemas/transaction";

const currencyOptions = Object.fromEntries(
  [...CURRENCIES].map(v => [v, v])
);

const paymentMethodOptions = Object.fromEntries(
  ["cash", "bankTransfer", "card"].map(v => [v, `paymentMethod_options.${v}`])
);

const accountOptions = Object.fromEntries(
  [...ACCOUNTS].map(v => [v, `account_options.${v}`])
);

const getEmptyTransaction = () => ({
  date: new Date().toISOString().slice(0,10),
  amount: "0",
  currency: "",
  accountExpense: "",
  accountIncome: "",
  paymentMethod: "",
  additionalDescription: ""
});

type AddTransferTransactionFormProps = {
  onOpenChange: (value: boolean) => void;
  onCreated: (newTxn: TransactionCreateTransferDTO) => Promise<void>;
}

export const AddTransferTransactionForm = ({
  onCreated,
  onOpenChange,
}: AddTransferTransactionFormProps) => {
  const { t } = useTranslation("common");
  const form = useForm<TransactionCreateTransferFormType>({
    resolver: zodResolver(TransactionCreateTransferFormSchema),
    defaultValues: getEmptyTransaction()
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.reset(getEmptyTransaction());
  }, [form]);

  const onSubmit = async (values: TransactionCreateTransferFormType) => {
    setLoading(true);
    try {
      await onCreated({
        ...values,
        amount: Number(values.amount),
        paymentMethod: values.paymentMethod as "cash" | "card" | "bankTransfer",
      })
    } catch (err: unknown) {
      console.log('Creating transfer transaction error:', err);
      toast.error((err as CommonError).message || t('creatingTransferTransactionFailed'));
    } finally {
      onOpenChange(false);
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-[auto_300px] gap-3"
      >
        <ControlledInputField name="date" type="date" />
        <ControlledInputField name="additionalDescription" type="text" />
        {/* TODO fix the bug that when typing 0.0 (when trying to type for example 0.01
                 then it clears it and goes back to 0
        */}
        <ControlledInputField name="amount" type="number" step={0.01} decimalPlaces={2} />
        <ControlledSelectField
          name="currency"
          placeholderKey="currencyPlaceholder"
          options={currencyOptions}
        />
        <ControlledSelectField
          name="paymentMethod"
          placeholderKey="paymentMethodPlaceholder"
          options={paymentMethodOptions}
        />
        <ControlledSelectField
          name="accountExpense"
          placeholderKey="accountFromPlaceholder"
          options={accountOptions}
        />
        <ControlledSelectField
          name="accountIncome"
          placeholderKey="accountToPlaceholder"
          options={accountOptions}
        />
        <DialogFooter className="col-start-2 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? t("saving") : t("save") }
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
