import { CommonFormField } from "@/components/common/common-form-field";
import { CommonRadio } from "@/components/common/common-radio";
import { TRANSACTION_TYPES } from "@/lib/consts";
import { useTranslation } from "react-i18next";

export const TransactionTypeField = () => {
  const { t } = useTranslation("common");
  return (
    <CommonFormField name="transactionType" label={t("transactionType")}>
      {(field) => (
        <CommonRadio
          titleKey="transactionType"
          name="type"
          value={field.value}
          setValue={field.onChange}
          optionsKeys={[...TRANSACTION_TYPES]}
        />
      )}
    </CommonFormField>
  )
}