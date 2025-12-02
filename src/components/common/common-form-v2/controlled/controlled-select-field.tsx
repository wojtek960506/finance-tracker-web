import { ControlledFormField } from "./controlled-form-field";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type ControlledSelectFieldProps = {
  name: string;
  placeholderKey: string;
  optionsKeys: Set<string>;
  isDisabled?: boolean;
  isClearable?: boolean;
  isHorizontal?: boolean;
}

export const ControlledSelectField = ({
  name,
  placeholderKey,
  optionsKeys,
  isDisabled = false,
  isClearable = true,
  isHorizontal = true,
}: ControlledSelectFieldProps) => {
  const { t } = useTranslation("common");

  return (
    <ControlledFormField name={name} label={t(name)} isHorizontal={isHorizontal}>
      {(field) => (
        <div className="flex relative">
          <Select
            disabled={isDisabled}
            value={field.value ?? ""}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t(placeholderKey)} />
            </SelectTrigger>
            <SelectContent>
              {[...optionsKeys].map(optionKey => (
                <SelectItem key={optionKey} value={optionKey}>
                  {t(`${name}_options.${optionKey}`)}
                </SelectItem>
              ))}
            </SelectContent>
            {field.value && isClearable &&
              <Button
                variant="ghost"
                type="button"
                onClick={() => field.onChange("")}
                className="p-1 ml-1"
              >
                ✕
              </Button>
            }
          </Select>
        </div>
      )}
    </ControlledFormField>
  )
}