import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type ExpandableItemProps = {
  trigger: ReactNode,
  contentClassName: string,
  children: ReactNode,
}

export const ExpandableItem = ({
  trigger,
  contentClassName,
  children,
}: ExpandableItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between">
        {trigger}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className={contentClassName}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  )

}