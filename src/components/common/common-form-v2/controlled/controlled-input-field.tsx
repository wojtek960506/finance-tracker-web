import { Input } from "@/components/ui/input"
// import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { ControlledFormField } from "./controlled-form-field";


type ControlledInputFieldProps = {
  name: string,
  type: "text" | "password" | "date" | "number"
  step?: number,
  isRequired?: boolean,
  isDisabled?: boolean,
  isHorizontal?: boolean,
}

export const ControlledInputField = ({
  name,
  type,
  step = 1,
  isDisabled = false,
  isHorizontal = true,
}: ControlledInputFieldProps) => {
  const { t } = useTranslation("common");

  return (
    <ControlledFormField name={name} label={t(name)} isHorizontal={isHorizontal}>
      {(field) => (
        <Input
          type={type}
          step={step}
          disabled={isDisabled}
          value={field.value ?? ""}
          onChange={field.onChange}
        />
      )}
    </ControlledFormField>
  )
}