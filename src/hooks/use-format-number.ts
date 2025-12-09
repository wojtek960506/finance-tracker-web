import { useTranslation } from "react-i18next"

export const useFormatNumber = () => {
  const { i18n } = useTranslation("common");

  const formatNumber = (
    num: number | string,
    precision: number = 0,
    shouldAddPrecision: boolean = false,
  ): string => {
    if (typeof num !== "number") {
      num = Number(num);
    }
    if (!Number.isFinite(num))
      throw new TypeError(`'formatNumber' expedted a finite number - got: '${num}'`);
    if (Number.isInteger(num) && !shouldAddPrecision)
      return num.toLocaleString(i18n.language);

    return num.toLocaleString(i18n.language, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  }

  return formatNumber;
}