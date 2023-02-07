import { DataTable } from "@components/ui/DataTable";
import { Button } from "@mui/material";
import { format } from "date-fns";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { FILTER, ORDER, PAGINATION } from "../../../store/slices/order";
import { Order } from "../../../types/order";
import { HeadCell, TableViewProps } from "../../ui/DataTable/types";

const headCells: HeadCell<Order>[] = [
  {
    id: "status",
  },
  {
    id: "items",
    // searchable: true,
    formatter(x) {
      return (
        <Button variant="outlined" size="small">
          {x?.length}
        </Button>
      );
    },
  },
  {
    id: "amount",
    // searchable: true,
    formatter(x) {
      return x.toFixed(2);
    },
  },
  {
    id: "createdAt",
    formatter(x) {
      return format(new Date(x), "MM-dd-yyyy hh:mma");
    },
  },
];

export default function TableView(props: TableViewProps<Order>) {
  const { order, orderBy, filters } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  const handleRequestSort = (property: any) => {
    const isAsc = orderBy === property && order === "asc";
    dispatch(ORDER({ order: isAsc ? "desc" : "asc", orderBy: property }));
  };

  const handleSearchField = _.debounce((property: keyof Order, value: any) => {
    {
      dispatch(FILTER({ field: property, value }));
    }
  }, 500);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(PAGINATION({ page: newPage }));
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(PAGINATION({ pageSize: Number(event?.target.value) }));
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
