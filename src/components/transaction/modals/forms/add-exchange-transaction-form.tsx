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
  TransactionCreateExchageDTO,
  TransactionCreateExchangeFormType,
  TransactionCreateExchangeFormSchema,
} from "@/schemas/transaction";


type AddExchangeTransactionFormProps = {
  onOpenChange: (value: boolean) => void;
  onCreated: (newTxn: TransactionCreateExchageDTO) => Promise<void>;
};

const getEmptyTransaction = () => ({
  date: new Date().toISOString().slice(0,10),
  amountExpense: "0",
  amountIncome: "0",
  currencyExpense: "",
  currencyIncome: "",
  account: "",
  paymentMethod: "",
  additionalDescription: "",
});

export const AddExchangeTransactionForm = ({
  onCreated,
  onOpenChange
}: AddExchangeTransactionFormProps) => {
  const { t } = useTranslation("common");
  const form = useForm<TransactionCreateExchangeFormType>({
    resolver: zodResolver(TransactionCreateExchangeFormSchema),
    defaultValues: getEmptyTransaction()
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.reset(getEmptyTransaction());
  }, [form]);

  const onSubmit = async (values: TransactionCreateExchangeFormType) => {
    setLoading(true);
    try {
      await onCreated({
        ...values,
        amountExpense: Number(values.amountExpense),
        amountIncome: Number(values.amountIncome),
        paymentMethod: values.paymentMethod as "cash" | "bankTransfer",
      })
    } catch (err: unknown) {
      console.log('Creating transaction error:', err);
      toast.error((err as CommonError).message || t('creatingExchangeTransactionFailed'));
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
        <ControlledInputField name="amountExpense" type="number" step={0.01} decimalPlaces={2} />
        <ControlledSelectField
          name={"currencyExpense"}
          placeholderKey={"currencyExpensePlaceholder"}
          optionsKeys={CURRENCIES}
        />
        <ControlledInputField name="amountIncome" type="number" step={0.01} decimalPlaces={2} />
        <ControlledSelectField
          name={"currencyIncome"}
          placeholderKey={"currencyIncomePlaceholder"}
          optionsKeys={CURRENCIES}
        />
        <ControlledSelectField
          name="paymentMethod"
          placeholderKey="paymentMethodPlaceholder"
          optionsKeys={new Set(["cash", "bankTransfer"])}
        />
        <ControlledSelectField
          name={"account"}
          placeholderKey="accountPlaceholder"
          optionsKeys={ACCOUNTS}
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


