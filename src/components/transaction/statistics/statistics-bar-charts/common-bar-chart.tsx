import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { ComponentProps } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export type NonEmptyArray<T> = [T, ...T[]];

type XAxisTickFormatterType = ComponentProps<typeof XAxis>["tickFormatter"];
type TooltipLabelFormatterType = ComponentProps<typeof ChartTooltip>["labelFormatter"];
export type TooltipFormatterType = ComponentProps<typeof ChartTooltip>["formatter"];

type CommonBarChartProps = {
  config: ChartConfig,
  data: unknown[],
  dataKey: string,
  bars: NonEmptyArray<{ dataKey: string, fillColor: string }>
  title?: string,
  xAxisTickFormatter?: XAxisTickFormatterType,
  tooltipLabelFormatter?: TooltipLabelFormatterType,
  tooltipFormatter?: TooltipFormatterType,
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
}: CommonBarChartProps) => {

  return (
    <div className="flex flex-col">
      {title && <span className="w-full text-center text-2xl py-5">{title}</span>}
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
          {/* TODO - todo - probably create custom legend instead of ChartContentLegend,
              becuase there might be case (for example balance of transaction) where
              there will be different colors for positive and negative value */}
          <ChartLegend
            content={(props) => (
              <ChartLegendContent payload={props.payload} className="text-base"/>
            )}
          />
          <CartesianGrid vertical={false} />


          {/* TODO - show absolute value in bar and real value in tooltip */}
          {bars.map(({ dataKey, fillColor }) => (
            <Bar key={dataKey} dataKey={dataKey} fill={fillColor} radius={4} />
          ))}
        </BarChart>
      </ChartContainer>
    </div>
  )
}