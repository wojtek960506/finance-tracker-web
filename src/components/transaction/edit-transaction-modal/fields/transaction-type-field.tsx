import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TransactionUpdateDTO } from "@/schemas/transaction"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { TRANSACTION_TYPES } from "@/lib/consts";
import { Label } from "@/components/ui/label";

export const TransactionTypeField = () => {
  const { t } = useTranslation("common");
  const { control } = useFormContext<TransactionUpdateDTO>();

  return (
    <FormField
      control={control}
      name="transactionType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('transactionType')}</FormLabel>
          <FormControl>
            <div className="flex flex-row gap-2">
              {[...TRANSACTION_TYPES].map(option => (
                <Label key={option}>
                  <input
                    type="radio"
                    name="type"
                    checked={field.value === option}
                    onChange={() => field.onChange(option)}
                  />
                  <span>{t(`transactionType_options.${option}`)}</span>
                </Label>
              ))}
            </div>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}