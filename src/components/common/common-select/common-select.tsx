import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { ClearFieldButton } from "@/components/common";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";


export type SelectOptions = Record<string, string>

type CommonSelectProps = {
  value: string | undefined;
  setValue: (v: string) => void;
  placeholderKey: string;
  options: SelectOptions;
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
  className = "",
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
          {Object.entries(options)
            .sort((a, b) => t(a[1]).toUpperCase() > t(b[1]).toUpperCase() ? 1 : -1)
            .map(([key, val]) => (
              <SelectItem key={key} value={key}>
                {t(val)}
              </SelectItem>
            ))
          }
        </SelectContent>
        {value && isClearable && (
          <ClearFieldButton setValue={setValue} isDisabled={isDisabled} />
        )}
      </Select>
    </div>
  )
}