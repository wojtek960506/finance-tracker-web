import { CommonFormField } from "@/components/common/common-form-field";
import { CommonSelect } from "@/components/common/common-select";
import { CATEGORIES } from "@/lib/consts";
import { useTranslation } from "react-i18next";

export const CategoryField = () => {
  const { t } = useTranslation("common");
  return (
    <CommonFormField name="category" label={t("category")}>
      {(field) => (
        <CommonSelect 
          titleKey="category"
          value={field.value}
          setValue={field.onChange}
          placeholderKey="categoryPlaceholder"
          optionsKeys={CATEGORIES}  
        />
      )}
    </CommonFormField>
  )
}