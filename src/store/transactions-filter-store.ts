import { TransactionQuery } from "@/schemas/transaction-query"
import { create } from "zustand";
import { persist } from "zustand/middleware";


type TransactionsFilterState = {
  filters: TransactionQuery,
  isShown: boolean,
  _hasHydrated: boolean,

  setFilters: (filters: TransactionQuery) => void;
  setIsShown: (isShown: boolean) => void;
  setHasHydrated: (_hasHydrated: boolean) => void;
}

export const defaultTransactionFilters = {
  page: 1,
  limit: 50,
  sortBy: "date",
  sortOrder: "desc",
  startDate: undefined,
  endDate: undefined,
  minAmount: undefined,
  maxAmount: undefined,
  transactionType: undefined,
  currency: undefined,
  category: undefined,
  paymentMethod: undefined,
  account: undefined,
} as TransactionQuery;

const initialTransactionsFilterState: Omit<
  TransactionsFilterState,
  "_hasHydrated" |
  "setFilters" |
  "setIsShown" |
  "setHasHydrated"
> = {
  filters: defaultTransactionFilters,
  isShown: false,
}

export const useTransactionsFilterStore = create<TransactionsFilterState>()(
  persist(
    set => ({
      ...initialTransactionsFilterState,
      _hasHydrated: false,

      setFilters: (filters: TransactionQuery) => set({ filters }),
      setIsShown: (isShown: boolean) => set({ isShown }),
      setHasHydrated: (_hasHydrated: boolean) => set({ _hasHydrated }),
    }),
    {
      name: "transactions-filter-store",
      partialize: state => ({
        filters: state.filters,
        isShown: state.isShown,
      }),
      onRehydrateStorage: () => (persistedState) => {
        persistedState?.setHasHydrated(true);
      }
    }
  )
)

export const resetTransactionsFilterStore = () => useTransactionsFilterStore.setState(
  initialTransactionsFilterState
);
