import { CommonInfo } from "@/components/common";
import { useFormContext, useWatch } from "react-hook-form";
import { useFormatNumber } from "@/hooks/use-format-number";

export const ExchageRatesInfo = () => {
  const { control } = useFormContext();
  const formatNumber = useFormatNumber();

  const amountExpense = useWatch({
    control: control,
    name: "amountExpense"
  });
  const amountIncome = useWatch({
    control: control,
    name: "amountIncome"
  });
  const currencyExpense = useWatch({
    control: control,
    name: "currencyExpense"
  });
  const currencyIncome = useWatch({
    control: control,
    name: "currencyIncome"
  });

  if (!(
    amountExpense && amountExpense !== "" && amountExpense !== "0" &&
    amountIncome && amountIncome !== "" && amountIncome !== "0" &&
    currencyExpense && currencyExpense != "" &&
    currencyIncome && currencyIncome !== ""
  )) return null;

  return (
    <>
      <CommonInfo
        label=""
        value={
          `1 ${currencyExpense} = ` +
          `${formatNumber(Number(amountIncome) / Number(amountExpense), 4, true)} ` +
          `${currencyIncome}`}
      />
      <CommonInfo
        label=""
        value={
          `1 ${currencyIncome} = ` +
          `${formatNumber(Number(amountExpense) / Number(amountIncome), 4, true)} ` + 
          `${currencyExpense}`}
      />
    </>
  )
}