import {
  ACCOUNTS,
  CATEGORIES,
  CURRENCIES,
  PAYMENT_METHODS,
  TRANSACTION_TYPES,
} from "@/lib/consts";
import { z } from "zod";

const TransactionCreateCommonSchema = z.object({
  date: z.string().min(1, "Date is required"),
})

export const TransactionCreateSchema = TransactionCreateCommonSchema.extend({
  description: z.string().min(1, "descriptionRequired"),
  amount: z.number().positive("Amount must be positive"),
  currency: z.enum([...CURRENCIES]),
  category: z.enum([...CATEGORIES]),
  paymentMethod: z.enum([...PAYMENT_METHODS]),
  account: z.enum([...ACCOUNTS]),
  transactionType: z.enum([...TRANSACTION_TYPES]),
})

export const TransactionCreateExchangeSchema = z.object({
  additionalDescription: z.string().min(1, "Additional description cannot be empty").optional(),
  amountExpense: z.number().positive("Amount of expense in exchange must be positive"),
  amountIncome: z.number().positive("Amount of income in exchange must be positive"),
  currencyExpense: z.enum([...CURRENCIES]),
  currencyIncome: z.enum([...CURRENCIES]),
  account: z.enum([...ACCOUNTS]),
  paymentMethod: z.enum(["bankTransfer", "cash"]),
})

export const TransactionCreateFormSchema = z.object({
  date: z.string().min(1, "dateRequired"),
  description: z.string().min(1, "descriptionRequired"),
  amount: z.string()
    .refine(v => v !== "", "amountRequired")
    .refine(v => !Number.isNaN(v), "amountValidNumber")
    .refine(v => Number(v) >= 0, "amountBiggerEqualZero"),
  currency: z.string()
    .refine(v => v !== "", "currencyRequired")
    .refine(v => [...CURRENCIES].includes(v), "currencyOneOfEmums"),
  category: z.string()
    .refine(v => v !== "", "categoryRequired")
    .refine(v => [...CATEGORIES].includes(v), "categoryOneOfEmums"),
  paymentMethod: z.string()
    .refine(v => v !== "", "paymentMethodRequired")
    .refine(v => [...PAYMENT_METHODS].includes(v), "paymentMethodOneOfEmums"),
  account: z.string()
    .refine(v => v !== "", "accountRequired")
    .refine(v => [...ACCOUNTS].includes(v), "accountOneOfEmums"),
  transactionType: z.string()
    .refine(v => v !== "", "transactionTypeRequired")
    .refine(v => [...TRANSACTION_TYPES].includes(v), "transactionTypeOneOfEmums"),
})

export const TransactionUpdateSchema = TransactionCreateSchema;

export const TransactionUpdateFormSchema = TransactionCreateFormSchema;

export const TransactionSchema = TransactionCreateSchema.extend({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sourceIndex: z.number().optional(),
  sourceRefIndex: z.number().optional(),
})

export type TransactionCreateDTO = z.infer<typeof TransactionCreateSchema>;
export type TransactionCreateExchageDTO = z.infer<typeof TransactionCreateExchangeSchema>;
export type TransactionUpdateDTO = z.infer<typeof TransactionUpdateSchema>;
export type TransactionDTO = z.infer<typeof TransactionSchema>;

export type TransactionCreateFormType = z.infer<typeof TransactionCreateFormSchema>;
export type TransactionUpdateFormType = z.infer<typeof TransactionUpdateFormSchema>;