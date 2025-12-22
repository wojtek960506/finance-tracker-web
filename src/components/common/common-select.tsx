import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { ClearFieldButton } from "./clear-field-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export type SelectOption = Record<string, string>

type CommonSelectProps = {
  value: string | undefined;
  setValue: (v: string) => void;
  placeholderKey: string;
  options: SelectOption;
  isDisabled?: boolean;
  isClearable?: boolean;
  className?: string;
}

export const CommonSelect = ({
  value,
  setValue,
  placeholderKey,
  options,
  isDisabled,
  isClearable,
  className = ""
}: CommonSelectProps) => {
  const { t } = useTranslation("common");

  return (
    <div className={cn("flex relative", className)}>
      <Select
        disabled={isDisabled}
        value={value}
        onValueChange={setValue}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t(placeholderKey)} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(options).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {t(value)}
            </SelectItem>
          ))}
        </SelectContent>
        {value && isClearable && !isDisabled && (
          <ClearFieldButton setValue={setValue} />
        )}
      </Select>
    </div>
  )
}