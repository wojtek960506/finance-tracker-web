import { useTranslation } from "react-i18next";
import { AddTransactionModal } from "../modals";
import { TransactionsFilterHeader } from "./filter-header";
import { TransactionsFilterSwitch } from "./filter-switch";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateTransaction } from "@/hooks/use-create-transaction";
import { ExportTransactionsButton } from "./export-transactions-button";
import { TransactionCreateDTO, TransactionCreateExchageDTO } from "@/schemas/transaction";


export const TransactionsHeader = ({ total }: { total?: number}) => {
  const { t } = useTranslation("common");
  const { createStandardMutation, createExchangeMutation } = useCreateTransaction();

  return (
    <CardHeader >
      <div className="flex justify-between">
        <div className="flex gap-6 items-center">
          <CardTitle className="text-2xl">
            {t('allTransactions')}
          </CardTitle>
          {total && <span>{total} item(s)</span>}
        </div>
        <div className="flex gap-6">
          <ExportTransactionsButton />
          <AddTransactionModal
            onStandardCreated={async (created: TransactionCreateDTO) => {
              await createStandardMutation.mutateAsync(created);
            }}
            onExchangeCreated={async (created: TransactionCreateExchageDTO) => {
              await createExchangeMutation.mutateAsync(created)
            }}
          />
          <TransactionsFilterSwitch />
        </div>        
      </div>
      <TransactionsFilterHeader />
    </CardHeader>
  )
}
