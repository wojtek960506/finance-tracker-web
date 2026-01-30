import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";


type CommonTooltipProps = {
  triggerClassName?: string;
  triggerValue: string | ReactNode;
  contentValue: string | ReactNode;
}

export const CommonTooltip = ({
  triggerClassName,
  triggerValue,
  contentValue,
}: CommonTooltipProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger className={triggerClassName}>
          {triggerValue}
        </TooltipTrigger>
        <TooltipContent>
          {contentValue}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
