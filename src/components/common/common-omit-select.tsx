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

type CommonOmitSelectProps = {
  options: MultiOption[];
  omitted: string[];
  onChange: (v: string[]) => void;
  allInvolvedLabelKey: string;
  excludedLabelKey: string;
  isDisabled?: boolean;
}

export const CommonOmitSelect = ({
  options,
  omitted,
  onChange,
  allInvolvedLabelKey,
  excludedLabelKey,
  isDisabled = false,
}: CommonOmitSelectProps) => {
  const { t } = useTranslation("common");

  const toggle = (value: string) => {
    if (omitted.includes(value)) {
      onChange(omitted.filter(v => v !== value))
    } else {
      onChange([...omitted, value])
    }
  }

  const label = omitted.length === 0
    ? t(allInvolvedLabelKey)
    : `${omitted.length} ${t(excludedLabelKey, { count: omitted.length })}`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
          disabled={isDisabled}
        >
          <span className="truncate">{label}</span>
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
                checked={omitted.includes(option.value)}
                onCheckedChange={() => toggle(option.value)}
              />
              <span className="text-sm">{t(option.label)}</span>
            </Label>
          ))}
        </div>

        <div className="flex flex-col justify-between pt-2">
          <Button size="sm" variant="ghost" onClick={() => onChange([])}>
            {t('includeAll')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}