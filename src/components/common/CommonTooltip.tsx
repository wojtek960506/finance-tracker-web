import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

type CommonTooltipProps = {
  triggerClassName: string;
  triggerValue: string;
  contentValue: string;
}

export const CommonTooltip = ({
  triggerClassName,
  triggerValue,
  contentValue,
}: CommonTooltipProps) => {
  return (
    <TooltipProvider>
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
