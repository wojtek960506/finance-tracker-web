import { useTranslation } from "react-i18next";
import { AddTransactionModal } from "../modals";
import { TransactionsFilterHeader } from "./filter-header";
import { TransactionsFilterSwitch } from "./filter-switch";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateTransaction } from "@/hooks/use-create-transaction";
import { ExportTransactionsModal } from "./export-transactions-modal";
import {
  TransactionCreateDTO,
  TransactionCreateExchangeDTO,
  TransactionCreateTransferDTO
} from "@/schemas/transaction";


export const TransactionsHeader = ({ total }: { total?: number}) => {
  const { t } = useTranslation("common");
  const {
    createStandardMutation,
    createExchangeMutation,
    createTransferMutation,
  } = useCreateTransaction();

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
          <ExportTransactionsModal />
          <AddTransactionModal
            onStandardCreated={async (created: TransactionCreateDTO) => {
              await createStandardMutation.mutateAsync(created);
            }}
            onExchangeCreated={async (created: TransactionCreateExchangeDTO) => {
              await createExchangeMutation.mutateAsync(created)
            }}
            onTransferCreated={async (created: TransactionCreateTransferDTO) => {
              await createTransferMutation.mutateAsync(created)
            }}
          />
          <TransactionsFilterSwitch />
        </div>        
      </div>
      <TransactionsFilterHeader />
    </CardHeader>
  )
}
