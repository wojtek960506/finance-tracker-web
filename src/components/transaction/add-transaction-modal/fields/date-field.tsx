import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DateFieldProps {
  title: string;
  value: string;
  setValue: (v: string) => void;
  classNameMain?: string;
  classNameLabel?: string;
}

export const DateField = ({ 
  title,
  value,
  setValue,
  classNameMain,
  classNameLabel
}: DateFieldProps) => {
  return (
    <Label className={classNameMain}>
      <span className={classNameLabel}>{title}</span>
      <Input
        type="date"
        value={value}
        onChange={e => setValue(e.target.value)}
        required
      />
    </Label>
  )
}