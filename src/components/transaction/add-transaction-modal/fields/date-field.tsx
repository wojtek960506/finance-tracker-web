import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DateFieldProps {
  title: string;
  value: string;
  setValue: (v: string) => void;
  classNameLabel?: string;
  classNameSpan?: string;
}

export const DateField = ({ 
  title,
  value,
  setValue,
  classNameLabel,
  classNameSpan
}: DateFieldProps) => {
  return (
    <Label className={classNameLabel}>
      <span className={classNameSpan}>{title}</span>
      <Input
        type="date"
        value={value}
        onChange={e => setValue(e.target.value)}
        required
      />
    </Label>
  )
}