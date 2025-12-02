import { useTranslation } from "react-i18next";
import { ControlledFormField } from "./controlled-form-field";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


type ControlledRadioFieldProps = {
  name: string;
  optionsKeys: Set<string>;
  isDisabled?: boolean;
  isClearable?: boolean;
  isHorizontal?: boolean;
}

export const ControlledRadioField = ({
  name,
  optionsKeys,
  isDisabled = false,
  isClearable = true,
  isHorizontal = true,
}: ControlledRadioFieldProps) => {
  const { t } = useTranslation("common");

  return (
    <ControlledFormField name={name} label={t(name)} isHorizontal={isHorizontal}>
      {(field) => (
      <div className={`flex flex-row justify-between ${isHorizontal ? "h-7" : ""} items-center`}>
        <div className={`flex flex-${isHorizontal ? "row" : "col"} gap-2`}>
          {[...optionsKeys].map(optionKey => (
            <Label key={optionKey}>
              <input
                type="radio"
                name={name}
                checked={field.value === optionKey}
                onChange={() => field.onChange(optionKey)}
                disabled={isDisabled}
              />
              <span>{t(`${name}_options.${optionKey}`)}</span>
            </Label>
          ))}
        </div>
        { field.value && isClearable && !isDisabled &&
          <Button
            variant="ghost"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              field.onChange("");
            }}
            className="p-1 ml-1"
          >
            ✕
          </Button>
        }
      </div>
      )}
    </ControlledFormField>
  )
}