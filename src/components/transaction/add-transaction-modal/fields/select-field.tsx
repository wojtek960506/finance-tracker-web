import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next";

interface SelectFieldProps {
  title: string;
  value: string;
  setValue: (v: string) => void;
  options: Set<string>;
  placeholder?: string; 
  classNameMain?: string;
  classNameLabel?: string;
}

const mainClassName = cn("grid grid-cols-[3fr_5fr] gap-2");
const labelClassName = cn("w-full flex justify-center items-center")

export const SelectField = ({
  title,
  value,
  setValue,
  options,
  placeholder,
  classNameMain = mainClassName,
  classNameLabel = labelClassName,
}: SelectFieldProps) => {
  const { t } = useTranslation("common");

  return (
    <div className={classNameMain}>
      <Label>
        <span className={classNameLabel}>{t(title)}</span>
      </Label>
      <Select value={value} onValueChange={(v) => setValue(v)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder}/>
        </SelectTrigger>
        <SelectContent>
          {[...options].map(option => (
            <SelectItem key={option} value={option}>
              {t(`${title}_options.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}