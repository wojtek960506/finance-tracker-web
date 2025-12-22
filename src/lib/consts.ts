


export const PAYMENT_METHODS = new Set([
  "atm",
  "card",
  "cash",
  "blik",
  "credit",
  "payment",
  "bankTransfer",
  "cashDepositMachine",
])

export const CURRENCIES = new Set([
  "PLN",
  "EUR",
  "CZK",
  "GBP",
  "USD",
  "HUF",
  "RON",
])

export const ACCOUNTS = new Set([
  "cash",
  "pekao",
  "mBank",
  "revolut",
  "veloBank",
  "nestBank",
  "aliorBank",
  "cardByCliq",
  "creditAgricole",
])

export const CATEGORIES = new Set([
  "atm",
  "food",
  "work",
  "sport",
  "other",
  "refund",
  "health",
  "allegro",
  "exchange",
  "donation",
  "clothing",
  "myAccount",
  "education",
  "transport",
  "furniture",
  "utilities",
  "investments",
  "electronics",
  "entertainment",
  "accommodation",  
  "cashDepositMachine",
])

export const TRANSACTION_TYPES = new Set([
  "income",
  "expense",
])

export const PAYMENT_METHOD_OPTIONS = Object.fromEntries(
  [...PAYMENT_METHODS].map(v => [v, `paymentMethod_options.${v}`])
);

export const CURRENCY_CODE_OPTIONS = Object.fromEntries(
  [...CURRENCIES].map(v => [v, v])
);

export const CURRENCY_FULL_OPTIONS = Object.fromEntries(
  [...CURRENCIES].map(v => [v, `currency_options.${v}`])
);

export const ACCOUNT_OPTIONS = Object.fromEntries(
  [...ACCOUNTS].map(v => [v, `account_options.${v}`])
);

export const CATEGORY_OPTIONS = Object.fromEntries(
  [...CATEGORIES].map(v => [v, `category_options.${v}`])
);

export const TRANSACTION_TYPE_OPTIONS = Object.fromEntries(
  [...TRANSACTION_TYPES].map(v => [v, `transactionType_options.${v}`])
);

export const filterConstOptions = (
  options: Record<string, string>,
  filteredValues: string[]
) => {
  return Object.fromEntries(
    Object.entries(options)
      .filter(o => filteredValues.includes(o[0]))
  )
}