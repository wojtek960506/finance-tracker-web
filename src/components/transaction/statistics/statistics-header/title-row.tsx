import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { CardTitle } from "@/components/ui/card";
import { CommonSelect } from "@/components/common";
import { StatisticsType, VisualisationType } from "@/types/transaction-types";

type TitleRowProps = {
  statisticsType: StatisticsType;
  visualisationType: VisualisationType;
  setVisualisationType: (v: VisualisationType) => void;
  areAdditionalFilters: boolean;
  year: string | undefined;
  month: string | undefined;
  onAdditionalFiltersSwitchChange: () => void;
  onStatisticsTypeChange: (v: string) => void;
}

export const TitleRow = ({
  statisticsType,
  visualisationType,
  setVisualisationType,
  areAdditionalFilters,
  year,
  month,
  onAdditionalFiltersSwitchChange,
  onStatisticsTypeChange,
}: TitleRowProps) => {
  const { t } = useTranslation("common");

  const borderCn = "border-2 border-black rounded-lg"
  return (
    <div className="flex justify-between w-full items-center max-h-200 space-x-2">
      <CardTitle className="text-2xl w-fit justify-self-start">
        {t('transactionStatistics')}
      </CardTitle>

      <CommonSelect
        value={statisticsType}
        setValue={onStatisticsTypeChange}
        placeholderKey="statisticsType"
        options={{
          "sumStatistics": "sumStatistics",
          "averageStatistics": "averageStatistics",
        }}
        className="w-[200px]"
      />

      <CommonSelect 
        value={visualisationType}
        setValue={(v: string) => setVisualisationType(v as VisualisationType)}
        placeholderKey="visualisationType"
        options={{
          "tableVisualisation": "tableVisualisation",
          "barChartVisualisation": "barChartVisualisation",
        }}
        className="w-[200px]"
        isDisabled={visualisationType === "tableVisualisation" && !!year && !!month}
      />

      <div className={`flex gap-2 items-center px-4 ${borderCn}`}>
        <Switch
          id="filter-switch"
          checked={areAdditionalFilters}
          onCheckedChange={onAdditionalFiltersSwitchChange}
        />
        <Label htmlFor="filter-switch" className="text-lg whitespace-nowrap">
          {t('additionalFilters')}
        </Label>
      </div>
    </div>
  )
}