import {
  ACCOUNTS,
  CATEGORIES,
  CURRENCIES,
  PAYMENT_METHODS,
  TRANSACTION_TYPES
} from "@/lib/consts";
import { z } from "zod";

export const TransactionsAnalysisQuerySchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  transactionType: z.enum([...TRANSACTION_TYPES]),
  currency: z.enum([...CURRENCIES]),

  category: z.enum([...CATEGORIES]).optional(),
  paymentMethod: z.enum([...PAYMENT_METHODS]).optional(),
  account: z.enum([...ACCOUNTS]).optional(),
});

export type TransactionsAnalysisQuery = z.infer<typeof TransactionsAnalysisQuerySchema>;

export const transactionStatisticsFilterSchema = z.object({
  year: z.string()
    .refine(v => v === "" || !Number.isNaN(v), "Must be valid number").optional(),
  month: z.string()
    .refine(v => v === "" || !Number.isNaN(v), "Must be valid number")
    .refine(v => Number(v) >= 0, "Must be number between 1 and 12").optional(),
  currency: z.enum([...CURRENCIES]),
  category: z.enum([...CATEGORIES, ""]).optional(),
  excludeCategories: z
    .array(z.enum([...CATEGORIES]))
    .optional(),
  paymentMethod: z.enum([...PAYMENT_METHODS, ""]).optional(),
  account: z.enum([...ACCOUNTS, ""]).optional(),
})

export const transactionStatisticsQuerySchema = transactionStatisticsFilterSchema.extend({
  transactionType: z.enum([...TRANSACTION_TYPES]),
})

export type TransactionStatisticsFilter = z.infer<typeof transactionStatisticsFilterSchema>;
export type TransactionStatisticsQuery = z.infer<typeof transactionStatisticsQuerySchema>;
