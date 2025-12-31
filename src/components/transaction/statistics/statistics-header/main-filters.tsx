import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CURRENCY_CODE_OPTIONS } from "@/lib/consts";
import { ControlledSelectField } from "@/components/controlled-form";
import { StatisticsType, VisualisationType } from "@/types/transaction-types";

// TODO get the available years from API
const FIRST_YEAR = 2015
const LAST_YEAR = 2025

const yearOptions = Object.fromEntries(
  Array
    .from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, i) => i + FIRST_YEAR)
    .map(index => ([index, String(index) ]))
)

const monthOptions = Object.fromEntries(
  Array
    .from({ length: 12 }, (_, i) => i + 1)
    .map(index => ([index, `month${index}` ]))
);

type MainFiltersProps = {
  year: string | undefined;
  month: string | undefined;
  statisticsType: StatisticsType;
  visualisationType: VisualisationType;
}

export const MainFilters = ({
  year,
  month,
  statisticsType,
  visualisationType,
}: MainFiltersProps) => {
  const { t } = useTranslation("common");

  return (
    <>
      <ControlledSelectField
        name="year"
        placeholderKey="year"
        options={yearOptions}
        isClearable={true}
        isHorizontal={false}
        showLabel={false}
        isDisabled={statisticsType === "averageStatistics" || (
          visualisationType === "barChartVisualisation" && !!month
        )}
      />
      <ControlledSelectField
        name="month"
        placeholderKey="month"
        options={monthOptions}
        isClearable={true}
        isHorizontal={false}
        showLabel={false}
        isDisabled={statisticsType === "averageStatistics" || (
          visualisationType === "barChartVisualisation" && !!year
        )}
      />
      <ControlledSelectField
        name="currency"
        placeholderKey="currency"
        options={CURRENCY_CODE_OPTIONS}
        isClearable={false}
        isHorizontal={false}
        showLabel={false}
      />
      <Button type="submit">{t('apply')}</Button>
    </>
  )
}