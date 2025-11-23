import { CommonFormField } from "@/components/common/common-form-field";
import { CommonSelect } from "@/components/common/common-select";
import { ACCOUNTS } from "@/lib/consts";
import { useTranslation } from "react-i18next";

export const AccountField = () => {
  const { t } = useTranslation("common");
  return (
    <CommonFormField name="account" label={t("account")}>
      {(field) => (
        <CommonSelect
          titleKey="account"
          value={field.value}
          setValue={field.onChange}
          placeholderKey="accountPlaceholder"
          optionsKeys={ACCOUNTS}
        />
      )}
    </CommonFormField>
  )
}