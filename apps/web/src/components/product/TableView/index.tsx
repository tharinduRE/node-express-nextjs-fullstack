import { DataTable } from "@components/ui/DataTable";
import { format } from "date-fns";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  FILTER, ORDER, PAGINATION
} from "../../../store/slices/product";
import { Product } from "../../../types/product";
import { HeadCell, TableViewProps } from "../../ui/DataTable/types";

const headCells: HeadCell<Product>[] = [
  {
    id: "itemId",
  },
  {
    id: "name",
    nonSortable: true,
  },
  {
    id: "description",
    searchable: true,
  },
  {
    id: "listPrice",
    // searchable: true,
  },
  {
    id: "category",
    // searchable: true,
  },
  {
    id: "subcategory",
    // searchable: true,
  },
  {
    id: "createdAt",
    formatter(x) {
      return format(new Date(x), "MM-dd-yyyy");
    },
  },
];

export default function TableView(props: TableViewProps<Product>) {
  const { order, orderBy, filters } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const handleRequestSort = (property: any) => {
    const isAsc = orderBy === property && order === "asc";
    dispatch({
      type: ORDER,
      payload: { order: isAsc ? "desc" : "asc", orderBy: property },
    });
  };

  const handleSearchField = _.debounce(
    (property: keyof Product, value: any) => {
      {
        dispatch({
          type: FILTER,
          payload: { field: property, value },
        });
      }
    },
    500
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch({
      type: PAGINATION,
      payload: { page: newPage },
    });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch({
      type: PAGINATION,
      payload: { pageSize: event?.target.value },
    });
  };

  return (
    <DataTable
      {...props}
      sortBy={orderBy}
      sortOrder={order}
      filters={filters}
      headCells={headCells}
      onSortCol={handleRequestSort}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleRowsPerPageChange}
      onSearchCol={handleSearchField}
    />
  );
}
