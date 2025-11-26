import {
  ACCOUNTS,
  CATEGORIES,
  CURRENCIES,
  PAYMENT_METHODS,
  TRANSACTION_TYPES
} from "@/lib/consts";
import { z } from "zod";

export const TransactionQuerySchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1).max(100),

  sortBy: z.enum(["date", "amount"]),
  sortOrder: z.enum(["asc", "desc"]),

  // fitlering options
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),
  transactionType: z.enum([...TRANSACTION_TYPES]).optional(),
  currency: z.enum([...CURRENCIES]).optional(),
  category: z.enum([...CATEGORIES]).optional(),
  paymentMethod: z.enum([...PAYMENT_METHODS]).optional(),
  account: z.enum([...ACCOUNTS]).optional(),
});

export type TransactionQuery = z.infer<typeof TransactionQuerySchema>;