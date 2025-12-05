import {
  ACCOUNTS,
  CATEGORIES,
  CURRENCIES,
  PAYMENT_METHODS,
  TRANSACTION_TYPES
} from "@/lib/consts";
import { z } from "zod";

const TransactionFilterCommon = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1).max(100),

  sortBy: z.enum(["date", "amount"]),
  sortOrder: z.enum(["asc", "desc"]),

  // fitlering options
  startDate: z.string().optional(),
  endDate: z.string().optional(),

  transactionType: z.enum([...TRANSACTION_TYPES]).optional(),
  currency: z.enum([...CURRENCIES]).optional(),
  category: z.enum([...CATEGORIES]).optional(),
  paymentMethod: z.enum([...PAYMENT_METHODS]).optional(),
  account: z.enum([...ACCOUNTS]).optional(),
})

export const TransactionQuerySchema = TransactionFilterCommon.extend({
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),
});

export const TransactionFilterSchema = TransactionFilterCommon.extend({
  minAmount: z.string()
    .refine(v => v === "" || !Number.isNaN(v), "Must be valid number")
    .refine(v => Number(v) >= 0, "Must be bigger or equal 0").optional(),
  maxAmount: z.string()
    .refine(v => v === undefined || !Number.isNaN(v), "Must be valid number")
    .refine(v => Number(v) >= 0, "Must be bigger or equal 0").optional(),
})

export type TransactionQuery = z.infer<typeof TransactionQuerySchema>;
export type TransactionFilter = z.infer<typeof TransactionFilterSchema>;

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

export const transactionStatisticsQuerySchema = z.object({
  year: z.string()
    .refine(v => v === "" || !Number.isNaN(v), "Must be valid number").optional(),
  month: z.string()
    .refine(v => v === "" || !Number.isNaN(v), "Must be valid number")
    .refine(v => Number(v) >= 0, "Must be number between 1 and 12").optional(),
  transactionType: z.enum([...TRANSACTION_TYPES]),
  currency: z.enum([...CURRENCIES]),
  category: z.enum([...CATEGORIES]).optional(),
  omitCategory: z
    .union([z.enum([...CATEGORIES]), z.array(z.enum([...CATEGORIES]))])
    .transform(value => (Array.isArray(value) ? value : [value]))
    .optional(),
  paymentMethod: z.enum([...PAYMENT_METHODS]).optional(),
  account: z.enum([...ACCOUNTS]).optional(),

})

export type TransactionStatisticsQuery = z.infer<typeof transactionStatisticsQuerySchema>;