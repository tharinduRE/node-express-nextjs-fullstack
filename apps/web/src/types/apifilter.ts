export type SortOrder = 'asc' | 'desc';
export interface ApiFilter<T> {
  order?:  SortOrder;
  orderBy?: keyof T;
  pagination: {
    page: number;
    pageSize: number;
  };
  filters?: {
    [s: string]: any;
  };
};
