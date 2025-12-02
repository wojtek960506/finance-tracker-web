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
          
          // TODO - when we click APPLY and have some error (for example "input less than 0"), then
          // when we clear input then we have error "invalid input: expected number, received
          // string" - I should check why the errors are still applied without clicking APPLY again

          onChange={e => {
            const v = e.target.value;
            console.log('input change', v)

            switch (type) {
              case "number":
                console.log('field value before', field.value);
                field.onChange(v === "" ? "" : Number(v));
                console.log('field value after', field.value);
                break;
              default:
                field.onChange(v)
                break;
            }
          }}
        />
      )}
    </ControlledFormField>
  )
}