import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TransactionUpdateDTO } from "@/schemas/transaction"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { ACCOUNTS } from "@/lib/consts";
import { CommonSelect } from "@/components/common/common-select";

export const AccountField = () => {
  const { t } = useTranslation("common");
  const { control } = useFormContext<TransactionUpdateDTO>();

  return (
    <FormField
      control={control}
      name="account"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('account')}</FormLabel>
          <FormControl>
            <CommonSelect
              titleKey="account"
              value={field.value}
              setValue={field.onChange}
              placeholderKey="accountPlaceholder"
              optionsKeys={ACCOUNTS}
            />
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}