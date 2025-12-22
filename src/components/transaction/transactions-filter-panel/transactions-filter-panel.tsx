import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form";
import { areObjectsEqual } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransactionsFilterStore } from "@/store/transactions-filter-store";
import {
  ACCOUNT_OPTIONS,
  CATEGORY_OPTIONS,
  CURRENCY_CODE_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPES
} from "@/lib/consts";
import {
  TransactionQuery,
  TransactionFilter,
  TransactionFilterSchema,
} from "@/schemas/transaction-query";
import {
  ControlledSelectField,
  ControlledInputField,
  ControlledRadioField,
} from "@/components/controlled-form";

const denormalizeFilters = (values: TransactionQuery): TransactionFilter => ({
  ...values,
  minAmount: values.minAmount ? String(values.minAmount) : "",
  maxAmount: values.maxAmount ? String(values.maxAmount) : "",
})

const normalizeFilters = (values: TransactionFilter): TransactionQuery => ({
  ...values,
  minAmount: values.minAmount ? Number(values.minAmount) : undefined,
  maxAmount: values.maxAmount ? Number(values.maxAmount) : undefined,
})

export const TransactionsFilterPanel = () => {
  const { t } = useTranslation("common");
  const { filters, setFilters, setIsShown } = useTransactionsFilterStore();
  const form = useForm<TransactionFilter>({
    resolver: zodResolver(TransactionFilterSchema),
    defaultValues: JSON.parse(JSON.stringify(denormalizeFilters(filters)))
  })

  const onSubmit = (values: TransactionQuery) => {
    if (!areObjectsEqual(values, filters)) setFilters(values);
    setIsShown(false);
  }

  const onClear = () => {
    // it has to have empty strings not undefined to let values actually be cleared
    // in case of undefined - controlled inputs do not reset 
    // I have to play a little with zod schema to somehow have string but check it as number
    form.reset({
      page: 1,
      limit: 50,
      sortBy: "date",
      sortOrder: "desc",
      startDate: "",
      endDate: "",
      minAmount: "",
      maxAmount: "",
      transactionType: "",
      currency: "",
      category: "",
      paymentMethod: "",
      account: "",
    })
  }

  const handleSubmit = () => {
    const raw = form.getValues();
    // normalization of empty strings
    for (const [key, value] of Object.entries(raw)) {
      if (value === "") form.setValue(key as keyof TransactionQuery, undefined)
    }
    // zod validation runs when calling form.handleSubmit
    form.handleSubmit(
      (data) => onSubmit(normalizeFilters({ ...data, page: 1, })),
      (errors) => console.log("Validation errors:", errors),
    )();
  };

  const mcn = "flex min-w-fit border-2 border-gray-500 rounded-xl ml-2 p-2 overflow-hidden";
  const isHorizontal = false
  return (
    <div className={mcn}>
      <div className="overflow-auto px-1">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className={
            isHorizontal ? "grid grid-cols-[auto_auto] gap-3" : "flex flex-col gap-2"
          }>
            <ControlledInputField name="startDate" type="date" isHorizontal={isHorizontal} />
            <ControlledInputField name="endDate" type="date" isHorizontal={isHorizontal} />
            <ControlledInputField name="minAmount" type="number" isHorizontal={isHorizontal} />
            <ControlledInputField name="maxAmount" type="number" isHorizontal={isHorizontal} />

            <ControlledSelectField
              name={"currency"}
              placeholderKey={"currencyPlaceholder"}
              options={CURRENCY_CODE_OPTIONS}
              isHorizontal={isHorizontal}
            />
            <ControlledSelectField
              name={"category"}
              placeholderKey={"categoryPlaceholder"}
              options={CATEGORY_OPTIONS}
              isHorizontal={isHorizontal}
            />
            <ControlledSelectField
              name={"paymentMethod"}
              placeholderKey={"paymentMethodPlaceholder"}
              options={PAYMENT_METHOD_OPTIONS}
              isHorizontal={isHorizontal}
            />
            <ControlledSelectField
              name={"account"}
              placeholderKey={"accountPlaceholder"}
              options={ACCOUNT_OPTIONS}
              isHorizontal={isHorizontal}
            />
            <ControlledRadioField
              name={"transactionType"}
              optionsKeys={TRANSACTION_TYPES}
              isHorizontal={isHorizontal}
            />
            <Button className="mt-4" type="button" variant="secondary" onClick={onClear}>
              {t('clear')}
            </Button>
            <Button className={isHorizontal ? "mt-4" : "mt-2"} type="submit">{t("apply")}</Button>
          </div>
        </form>
      </Form>
      </div>
    </div>
  )
}