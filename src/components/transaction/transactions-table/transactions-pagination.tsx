import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTransactionsFilterStore } from "@/store/transactions-filter-store";

type TransactionsPaginationProps = {
  page: number,
  total: number,
  totalPages: number,
}

const createKeys = (page: number, totalPages: number): number[] => {
  const pagesNumbers = new Set<number>();

  // TODO make this logic more resusable and not so hardcoded

  if (totalPages === 1) return [1];
  if (totalPages === 2) return [1,2];
  if (totalPages === 3) return [1,2,3];
  if (totalPages === 4) return [1,2,3,4];
  if (totalPages === 5) return [1,2,3,4,5];
  if (totalPages === 6) return [1,2,3,4,5,6];
  if (totalPages === 7) return [1,2,3,4,5,6,7];

  if (
    page === totalPages - 3 ||
    page === totalPages - 2 ||
    page === totalPages - 1 ||
    page === totalPages
  ) return [
    1,
    totalPages - 5,
    totalPages - 4,
    totalPages - 3,
    totalPages - 2,
    totalPages - 1,
    totalPages
  ];

  if (
    page === 1 ||
    page === 2 ||
    page === 3 ||
    page === 4
  ) return [1,2,3,4,5,6, totalPages];

  pagesNumbers.add(1);
  for (let i = 0; i< 5; i++) pagesNumbers.add(page - 2 + i);
  pagesNumbers.add(totalPages);
 
  return [...pagesNumbers].sort((a, b) => a - b);
}



const FastPagination = ({ 
  page, totalPages, onClick
}: { page: number, totalPages: number, onClick: (key: number) => void }) => {
  
  const cnHighlight = "text-red-500 hover:text-red-800";

  const keys = createKeys(page, totalPages);
  
  const getElems = () => {
    const elems = []
    let prev = keys[0] - 1
    for (const key of keys) {
      if (key - prev !== 1) {
        elems.push(
          <li className="list-none" key={`${key}_separator`}>
            ...
          </li>
        )
      }

      elems.push(
        <li className="list-none text-center" key={key}>
          <Button
            variant="link"
            className={`p-0 ${page === key ? cnHighlight : ""}`}
            onClick={() => onClick(key)}
          >
            {key}
          </Button>
        </li>
      )
        
      prev = key;
    }
    return elems;
  }

  return (
    <div className="flex gap-3">
      {...getElems()}
    </div>
  )
}

export const TransactionsPagination = ({
  page,
  totalPages
}: TransactionsPaginationProps) => {
  const setFilters = useTransactionsFilterStore(s => s.setFilters);
  const filters = useTransactionsFilterStore(s => s.filters); 

  const handleFastPagination = (key: number) => setFilters({ ...filters, page: key })

  const borderTop = "border-t border-t-gray-500 border-t-2";

  return (
    <div className={cn("flex justify-between bg-gray-200", borderTop)}>
      <Button
        variant="link"
        className="pl-2"
        disabled={page <= 1}
        onClick={() => setFilters({ ...filters, page: filters.page - 1})}
      >Previous</Button>
      <FastPagination totalPages={totalPages} page={page} onClick={handleFastPagination}/>
      <Button 
        variant="link"
        className="pr-2"
        disabled={page >= totalPages}
        onClick={() => setFilters({ ...filters, page: filters.page + 1})}
      >Next</Button>
    </div>
  )
}