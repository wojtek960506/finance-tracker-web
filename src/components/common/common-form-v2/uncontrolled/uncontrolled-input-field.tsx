import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { UncontrolledFormField } from "./uncontrolled-form-field";

type UncontrolledInputFieldProps = {
  name: string,
  type: "text" | "password" | "date" | "number"
  step?: number,
  isRequired?: boolean,
  isDisabled?: boolean,
  isHorizontal?: boolean,
}

export const UncontrolledInputField = ({
  name,
  type,
  step = 1,
  isDisabled = false,
  isHorizontal = true,
}: UncontrolledInputFieldProps) => {
  const { t } = useTranslation("common");
  const { register } = useFormContext();
  
  const registerProps = () => {
    switch (type) {
      case "number":
        return register(name, {
          setValueAs: v => (v === "" ? undefined : Number(v)),
        });
      case "date":
        return register(name, {
          setValueAs: v => (v === "" ? undefined : v),
        })
      default:
        return register(name);
    }
  }

  return (
    <UncontrolledFormField label={t(name)} isHorizontal={isHorizontal}>
      <Input
        type={type}
        step={step}
        disabled={isDisabled}
        {...registerProps()}
      />
    </UncontrolledFormField>
  )
}