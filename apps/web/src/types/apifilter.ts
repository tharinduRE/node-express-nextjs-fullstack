export type Order = 'asc' | 'desc';
export interface ApiFilter<T> {
  order?:  Order;
  orderBy?: keyof T;
  pagination: {
    page: number;
    pageSize: number;
  };
  filters?: {
    [s: string]: any;
  };
};
