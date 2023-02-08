export type SortOrder = 'asc' | 'desc';

export interface FilterAPI<T> {
  sortOrder?:  SortOrder;
  sortBy?: keyof T;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  filters?: {
    [s: string]: any;
  };
};
