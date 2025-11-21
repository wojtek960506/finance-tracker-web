import {
  ACCOUNTS,
  CATEGORIES,
  CURRENCIES,
  PAYMENT_METHODS,
  TRANSACTION_TYPES
} from "@/lib/consts";
import { z } from "zod";

export const TransactionCreateSchema = z.object({
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "descriptionRequired"),
  amount: z.number().positive("Amount must be positive"),
  currency: z.enum([...CURRENCIES]),
  category: z.enum([...CATEGORIES]),
  paymentMethod: z.enum([...PAYMENT_METHODS]),
  account: z.enum([...ACCOUNTS]),
  transactionType: z.enum([...TRANSACTION_TYPES]),
})

export const TransactionUpdateSchema = TransactionCreateSchema;

export const TransactionSchema = TransactionCreateSchema.extend({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TransactionCreateDTO = z.infer<typeof TransactionCreateSchema>;
export type TransactionUpdateDTO = z.infer<typeof TransactionUpdateSchema>;
export type TransactionDTO = z.infer<typeof TransactionSchema>;