import { DataTable } from "@components/ui/DataTable";
import { GitHub } from "@mui/icons-material";
import { format } from "date-fns";
import _ from "lodash";
import { OAuthProviderType } from "next-auth/providers";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { FILTER, ORDER, PAGINATION } from "../../../store/slices/user";
import { User } from "../../../types/user";
import { HeadCell, TableViewProps } from "../../ui/DataTable/types";

const formatProviderIcons = (x: OAuthProviderType) => {
  switch (x) {
    case 'github': return <GitHub/>
    default:
      break;
  }};

const headCells: HeadCell<User>[] = [
  {
    id: "_id",
  },
  {
    id: "name",
  },
  {
    id: "email",
  },
  {
    id: "provider",
    label: "OAuth Provider",
    formatter : formatProviderIcons
  },
  {
    id: "createdAt",
    formatter(x) {
      return format(new Date(x), "MM-dd-yyyy hh:mma");
    },
  },
];

export default function TableView(props: TableViewProps<User>) {
  const {
    sortOrder: user,
    sortBy: userBy,
    filters,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleRequestSort = (property: any) => {
    const isAsc = userBy === property && user === "asc";
    dispatch(ORDER({ user: isAsc ? "desc" : "asc", userBy: property }));
  };

  const handleSearchField = _.debounce((property: keyof User, value: any) => {
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
      sortBy={userBy}
      sortOrder={user}
      filters={filters}
      headCells={headCells}
      onSortCol={handleRequestSort}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleRowsPerPageChange}
      onSearchCol={handleSearchField}
    />
  );
}
