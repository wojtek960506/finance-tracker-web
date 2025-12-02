import {
  TransactionFilter,
  TransactionFilterSchema,
  TransactionQuery,
  // TransactionQuerySchema
} from "@/schemas/transaction-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import {
  // defaultTransactionFilters,
  useTransactionsFilterStore
} from "@/store/transactions-filter-store"
import { areObjectsEqual } from "@/lib/utils"
import { ControlledSelectField } from "@/components/common/common-form-v2/controlled/controlled-select-field"
import {
  ACCOUNTS,
  CATEGORIES,
  CURRENCIES,
  PAYMENT_METHODS,
  TRANSACTION_TYPES
} from "@/lib/consts"
import { ControlledInputField } from "@/components/common/common-form-v2/controlled/controlled-input-field"
import { ControlledRadioField } from "@/components/common/common-form-v2/controlled/controlled-radio-field"

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

  const mcn = "flex min-w-fit border-1 border-gray-500 rounded-xl ml-2 p-2 overflow-hidden";
  return (
    <div className={mcn}>
      <div className="overflow-auto pr-1">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid grid-cols-[auto_auto] gap-3">
            <ControlledInputField name="startDate" type="date"/>
            <ControlledInputField name="endDate" type="date" />
            <ControlledInputField name="minAmount" type="number" />
            <ControlledInputField name="maxAmount" type="number" />

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
            <Button className="mt-4" type="button" variant="secondary" onClick={onClear}>
              {t('clear')}
            </Button>
            <Button className="mt-4" type="submit">{t("apply")}</Button>
          </div>
        </form>
      </Form>
      </div>
    </div>
  )
}