import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { ComponentProps, ReactElement } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";


export const LegendItem = ({ color, label }: { color: string, label: string }) => (
  <div className="flex items-center gap-1">
    <div className={cn("size-4 rounded-[5]", color)} />
    <span className="text-base">{label}</span>
  </div>
);

type XAxisTickFormatterType = ComponentProps<typeof XAxis>["tickFormatter"];
type TooltipLabelFormatterType = ComponentProps<typeof ChartTooltip>["labelFormatter"];
export type TooltipFormatterType = ComponentProps<typeof ChartTooltip>["formatter"];

type CommonBarChartProps = {
  config: ChartConfig,
  data: unknown[],
  dataKey: string,
  bars: ReactElement<typeof Bar>[]
  title?: string,
  xAxisTickFormatter?: XAxisTickFormatterType,
  tooltipLabelFormatter?: TooltipLabelFormatterType,
  tooltipFormatter?: TooltipFormatterType,
  legendItems?: ReactElement<typeof LegendItem>[]
}

export const CommonBarChart = ({
  config,
  data,
  dataKey,
  bars,
  title,
  xAxisTickFormatter,
  tooltipLabelFormatter,
  tooltipFormatter,
  legendItems,
}: CommonBarChartProps) => {

  return (
    <div className="flex flex-col">
      {title && <span className="w-full text-center text-2xl pb-3">{title}</span>}
      <ChartContainer config={config} className="flex-1 min-h-[200px] max-h-[400px]">
        <BarChart data={data}>
          <XAxis 
            dataKey={dataKey}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            className="text-sm"
            tickFormatter={xAxisTickFormatter}
          />
          <YAxis
            tickLine={false}
            tickMargin={5}
            axisLine={false}
            className="text-sm"
          />
          <ChartTooltip 
            content={<ChartTooltipContent />}
            labelClassName="text-base"
            labelFormatter={tooltipLabelFormatter}
            formatter={tooltipFormatter}
          />
          {legendItems && legendItems.length > 0 && (
            <ChartLegend
              content={() => (
                <div className="flex flex-row gap-3 justify-center mt-2">{...legendItems}</div>
              )}
            />)
          }
          <CartesianGrid vertical={false} />          
          {...bars}
        </BarChart>
      </ChartContainer>
    </div>
  )
}