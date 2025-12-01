import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

type CommonSelectProps = {
  titleKey: string,
  value: string,
  setValue: (value: string) => void;
  placeholderKey: string;
  optionsKeys: Set<string>;
  isClearable?: boolean;
}

export const CommonSelect = ({
  titleKey,
  value,
  setValue,
  placeholderKey,
  optionsKeys,
  isClearable = true
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
        {value && isClearable && 
          <Button
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            // TODO - check this probably is not needed
            form.setValue(titleKey, undefined);
            setValue("");
          }}
          className="p-1 ml-1"
        >
          ✕
        </Button>}
      </Select>
      
    </div>
  )
}