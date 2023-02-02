import { TableCellProps } from "@mui/material/TableCell";

export interface HeadCell<T> {
  id: keyof T;
  label?: string;
  numeric?: boolean;
  nonSortable?: boolean;
  searchable?: boolean;
  align?: TableCellProps["align"];
  formatter?: (x: any) => string;
}
