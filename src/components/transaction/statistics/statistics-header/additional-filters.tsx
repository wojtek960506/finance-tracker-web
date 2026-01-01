import {
  ACCOUNT_OPTIONS,
  CATEGORY_OPTIONS,
  PAYMENT_METHOD_OPTIONS
} from "@/lib/consts";
import {
  ControlledSelectField,
  ControlledExcludeSelectField,
} from "@/components/controlled-form";

type AdditionalFiltersProps = {
  category: string | undefined;
  excludeCategories: string[] | undefined;
}

export const AdditionalFilters = ({
  category,
  excludeCategories,
}: AdditionalFiltersProps) => (
  <>
    <ControlledSelectField
      name="category"
      placeholderKey="category"
      options={CATEGORY_OPTIONS}
      isClearable={true}
      isHorizontal={false}
      showLabel={false}
      isDisabled={excludeCategories ? excludeCategories.length > 0 : false}
    />
    <ControlledExcludeSelectField
      name="excludeCategories"
      options={Object.entries(CATEGORY_OPTIONS).map(([key, value]) => ({
        label: value,
        value: key,
      }))}
      allInvolvedLabelKey='noCategoriesExcluded'
      excludedLabelKey='categoriesExcluded'
      isDisabled={!!category}
      showLabel={false}
    />
    <ControlledSelectField
      name="paymentMethod"
      placeholderKey="paymentMethod"
      options={PAYMENT_METHOD_OPTIONS}
      isClearable={true}
      isHorizontal={false}
      showLabel={false}
    />
    <ControlledSelectField
      name="account"
      placeholderKey="account"
      options={ACCOUNT_OPTIONS}
      isClearable={true}
      isHorizontal={false}
      showLabel={false}
    />
  </>
)
