import { DataTable } from "@components/ui/DataTable";
import { Chip } from "@mui/material";
import { format } from "date-fns";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  FILTER, ORDER, PAGINATION
} from "../../../store/slices/metadata";
import { KeyType } from "../../../types/metadata";
import { HeadCell, TableViewProps } from "../../ui/DataTable/types";

const headCells: HeadCell<KeyType>[] = [
  {
    id: 'name',
  },
  {
    id : 'description'
  },
  {
    id : 'parent'
  },
  {
    id: "createdAt",
    formatter(x) {
      return format(new Date(x), "MM-dd-yyyy");
    },
  },
];

export default function TableView(props: TableViewProps<KeyType>) {
  const { sortOrder: order, sortBy: orderBy, filters } = useAppSelector((state) => state.metadata);
  const dispatch = useAppDispatch();

  const handleRequestSort = (property: any) => {
    const isAsc = orderBy === property && order === "asc";
    dispatch(ORDER({ order: isAsc ? "desc" : "asc", orderBy: property }));
  };

  const handleSearchField = _.debounce((property: keyof KeyType, value: any) => {
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
