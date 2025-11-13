import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TransactionUpdateDTO } from "@/schemas/transaction"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next";

export const AmountField = () => {
  const { t } = useTranslation("common");
  const { control } = useFormContext<TransactionUpdateDTO>();

  return (
    <FormField
      control={control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('amount')}</FormLabel>
          <FormControl>
            <Input
              type="number"
              step={0.01}
              placeholder="0.00"
              {...field}
              onChange={(e) => {
                // keep only 2 decimals
                const val = parseFloat(e.target.value);
                field.onChange(Number.isNaN(val) ? "" : Math.floor(val * 100) / 100);
              }}
            />
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}