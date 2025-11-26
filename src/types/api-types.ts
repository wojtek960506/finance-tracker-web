export interface CommonError {
  message: string;
  status?: number;
  details?: unknown;
}

export type FilteredResponse<T> = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: T
}