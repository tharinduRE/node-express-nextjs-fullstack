export interface PaginatedResults<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    count: number;
  };
}