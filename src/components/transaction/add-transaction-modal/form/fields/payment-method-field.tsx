import { CommonFormField } from "@/components/common/common-form-field";
import { CommonSelect } from "@/components/common/common-select";
import { PAYMENT_METHODS } from "@/lib/consts";
import { useTranslation } from "react-i18next";

export const PaymentMethodField = () => {
  const { t } = useTranslation("common");
  return (
    <CommonFormField name="paymentMethod" label={t("paymentMethod")}>
      {(field) => (
        <CommonSelect 
          titleKey="paymentMethod"
          value={field.value}
          setValue={field.onChange}
          placeholderKey="paymentMethodPlaceholder"
          optionsKeys={PAYMENT_METHODS}
        />
      )}
    </CommonFormField>
  )
}