import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TransactionUpdateDTO } from "@/schemas/transaction"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next";

export const DescriptionField = () => {
  const { t } = useTranslation("common");
  const { control } = useFormContext<TransactionUpdateDTO>();

  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('description')}</FormLabel>
          <FormControl>
            <Input type="text" {...field}/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}