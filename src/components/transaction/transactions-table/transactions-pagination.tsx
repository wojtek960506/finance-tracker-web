type TransactionsPaginationProps = {
  page: number,
  total: number,
  totalPages: number,
}

export const TransactionsPagination = ({
  page,
  total,
  totalPages
}: TransactionsPaginationProps) => {
  return (
    <div className="flex justify-between">
      <div className="pl-2">Page {page}</div>
      <div>Total {total}</div>
      <div className="pr-2">Total pages {totalPages}</div>
    </div>
  )
}