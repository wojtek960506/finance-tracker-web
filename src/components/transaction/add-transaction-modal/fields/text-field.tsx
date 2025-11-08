import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TextFieldProps {
  title: string;
  value: string;
  setValue: (v: string) => void;
  classNameLabel?: string;
  classNameSpan?: string;
}

export const TextField = ({ 
  title,
  value,
  setValue,
  classNameLabel,
  classNameSpan
}: TextFieldProps) => {
  return (
    <Label className={classNameLabel}>
      <span className={classNameSpan}>{title}</span>
      <Input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        required
      />
    </Label>
  )
}