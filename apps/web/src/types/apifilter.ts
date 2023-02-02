import { Employee } from "./employee";

export interface ApiFilter<T> {
  order?:  'asc' | 'desc';
  orderBy?: keyof T;
  pagination: {
    page: number;
    pageSize: number;
  };
  filters?: {
    [s: string]: any;
  };
};
