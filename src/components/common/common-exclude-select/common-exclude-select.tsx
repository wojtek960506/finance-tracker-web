import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


export type MultiOption = {
  label: string;
  value: string;
}

type CommonExcludeSelectProps = {
  options: MultiOption[];
  excluded: string[];
  onChange: (v: string[]) => void;
  allInvolvedLabelKey: string;
  excludedLabelKey: string;
  isDisabled?: boolean;
}

export const CommonExcludeSelect = ({
  options,
  excluded,
  onChange,
  allInvolvedLabelKey,
  excludedLabelKey,
  isDisabled = false,
}: CommonExcludeSelectProps) => {
  const { t } = useTranslation("common");

  const toggle = (value: string) => {
    if (excluded.includes(value)) {
      onChange(excluded.filter(v => v !== value))
    } else {
      onChange([...excluded, value])
    }
  }

  const label = excluded.length === 0
    ? t(allInvolvedLabelKey)
    : `${excluded.length} ${t(excludedLabelKey, { count: excluded.length })}`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
          disabled={isDisabled}
        >
          <span className="truncate" data-testid="exclude-select-label">{label}</span>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2">
        <div className="space-y-2 max-h-[min(320px,calc(80vh-200px))] overflow-y-auto">
          {options
            .sort((a, b) => t(a.label).toUpperCase() > t(b.label).toUpperCase() ? 1 : -1)
            .map(option => (
            <Label key={option.value}>
              <Checkbox
                data-testid={`exclude-select-checkbox-${option.value}`}
                checked={excluded.includes(option.value)}
                onCheckedChange={() => toggle(option.value)}
              />
              <span className="text-sm" data-testid="exclude-select-option-label">
                {t(option.label)}
              </span>
            </Label>
          ))}
        </div>

        <div className="flex flex-col justify-between pt-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onChange([])}
            data-testid="exclude-select-include-all-button"
          >{t('includeAll')}</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}