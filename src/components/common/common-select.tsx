import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

type CommonSelectProps = {
  titleKey: string,
  value: string,
  setValue: (value: string) => void;
  placeholderKey: string;
  optionsKeys: Set<string>;
}

export const CommonSelect = ({
  titleKey,
  value,
  setValue,
  placeholderKey,
  optionsKeys,
}: CommonSelectProps) => {
  const { t } = useTranslation("common");

  return (
    <Select value={value} onValueChange={v => setValue(v)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={t(placeholderKey)} />
      </SelectTrigger>
      <SelectContent>
        {[...optionsKeys].map(optionKey => (
          <SelectItem key={optionKey} value={optionKey}>
            {t(`${titleKey}_options.${optionKey}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}