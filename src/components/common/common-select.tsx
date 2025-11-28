import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

type CommonSelectProps = {
  titleKey: string,
  value: string,
  setValue: (value: string) => void;
  placeholderKey: string;
  optionsKeys: Set<string>;
  clearable?: boolean;
}

export const CommonSelect = ({
  titleKey,
  value,
  setValue,
  placeholderKey,
  optionsKeys,
  clearable = true
}: CommonSelectProps) => {
  const { t } = useTranslation("common");
  const form = useFormContext();

  return (
    <div className="flex relative">
      <Select value={value} onValueChange={v => setValue(v)}>
        <SelectTrigger
          className="w-full"
          onKeyDown={(e) => {
            if (e.key === "Backspace" && value) {
              e.preventDefault();
              // TODO - check this probably is not needed
              form.setValue(titleKey, undefined);
              setValue("");
            }
          }}
        >
          <SelectValue placeholder={t(placeholderKey)} />
          
        </SelectTrigger>
        <SelectContent>
          {[...optionsKeys].map(optionKey => (
            <SelectItem key={optionKey} value={optionKey}>
              {t(`${titleKey}_options.${optionKey}`)}
            </SelectItem>
          ))}
        </SelectContent>
        {value && clearable && 
          <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            // TODO - check this probably is not needed
            form.setValue(titleKey, undefined);
            setValue("");
          }}
          className="mx-1"
        >
          ✕
        </button>}
      </Select>
      
    </div>
  )
}