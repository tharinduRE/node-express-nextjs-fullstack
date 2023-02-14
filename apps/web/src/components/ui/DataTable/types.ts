import { FilterAPI } from './../../../types/IFilterApi';
import { TableCellProps } from "@mui/material/TableCell";
import { PaginatedResults } from "../../../types/IPagination";

export type HeadCell<T> = {
  id: Extract<keyof T, string>;
  label?: string;
  numeric?: boolean;
  nonSortable?: boolean;
  searchable?: boolean;
  align?: TableCellProps["align"];
  formatter?: (x: any) => string | React.ReactNode;
};

export type DataTableProps<T> = {
  data?: PaginatedResults<T>;
  headCells: HeadCell<T>[];
  sortOrder: FilterAPI<T>['sortOrder']
  sortBy : FilterAPI<T>['sortBy'],
  filters: FilterAPI<T>['filters'],
  hideActions?: boolean,
  isLoading?:boolean,
  onSortCol?: (property: keyof T) => void;
  onSearchCol?: (property: keyof T, value: any) => void;
  onEditRow?: (row: T) => void;
  onDeleteRow?: (row: T) => void;
  onPageChange: ( event: React.MouseEvent<HTMLButtonElement> | null,newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

export type TableViewProps<T> = Omit<
  DataTableProps<T>,
  | "headCells"
  | "sortBy"
  | "sortOrder"
  | "filters"
  | "onSortCol"
  | "onSearchCol"
  | "onPageChange"
  | "onRowsPerPageChange"
>;