import { SpinnerUI } from "@components/ui/SpinnerUI";
import { Edit, FilterList, FilterListOff } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Box,
  IconButton,
  Popover,
  TableFooter,
  TablePagination,
  TableSortLabel,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { visuallyHidden } from "@mui/utils";
import _ from "lodash";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  PRODUCT_FILTER,
  PRODUCT_ORDER,
  PRODUCT_PAGINATION,
} from "../../../store/reducers/product";
import { PaginatedResults } from "../../../types/pagination";
import { Product } from "../../../types/product";
import { HeadCell } from "./HeadCell";

const HeadTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export interface TableViewProps<T> {
  headCells: HeadCell<T>[];
  data?: PaginatedResults<T>;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}

export function TableView({
  data,
  headCells,
  onDelete,
  onEdit,
}: TableViewProps<Product>) {
  const { order, orderBy, filters } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const handleRequestSort = (property: keyof Product) => {
    const isAsc = orderBy === property && order === "asc";
    dispatch({
      type: PRODUCT_ORDER,
      payload: { order: isAsc ? "desc" : "asc", orderBy: property },
    });
  };

  const handleSearchField = _.debounce(
    (property: keyof Product, value: any) => {
      {
        dispatch({
          type: PRODUCT_FILTER,
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
      type: PRODUCT_PAGINATION,
      payload: { page: newPage },
    });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch({
      type: PRODUCT_PAGINATION,
      payload: { pageSize: event?.target.value },
    });
  };

  const [anchorEls, setAnchorEl] = useState<{
    [s: string]: HTMLButtonElement | null;
  }>({});

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) =>
              headCell.nonSortable ? (
                <HeadTableCell key={headCell.id} className="capitalize">
                  {headCell.label || headCell.id}
                </HeadTableCell>
              ) : (
                <HeadTableCell
                  key={headCell.id}
                  align={
                    headCell.align || (headCell.numeric ? "right" : "left")
                  }
                  sortDirection={orderBy === headCell.id ? order : false}
                  className="capitalize"
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label || headCell.id}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                  {headCell.searchable && (
                    <>
                      <IconButton
                        onClick={(e) =>
                          setAnchorEl((prev) => ({
                            ...prev,
                            [headCell.id]: e.currentTarget,
                          }))
                        }
                      >
                        {Boolean(anchorEls[headCell.id]) ||
                        (filters[headCell.id] && filters[headCell.id] != "") ? (
                          <FilterListOff />
                        ) : (
                          <FilterList />
                        )}
                      </IconButton>
                      <Popover
                        id={headCell.id}
                        open={Boolean(anchorEls[headCell.id])}
                        anchorEl={anchorEls[headCell.id]}
                        onClose={() =>
                          setAnchorEl((prev) => ({
                            ...prev,
                            [headCell.id]: null,
                          }))
                        }
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <Box sx={{ padding: 1 }}>
                          <TextField
                            id={headCell.id}
                            size="small"
                            variant="outlined"
                            type="search"
                            placeholder={`Search by ${headCell.label}`}
                            defaultValue={filters[headCell.id]}
                            onChange={(e) => {
                              e.preventDefault();
                              handleSearchField(headCell.id, e.target.value);
                            }}
                          />
                        </Box>
                      </Popover>
                    </>
                  )}
                </HeadTableCell>
              )
            )}
            <HeadTableCell key="actions" className="capitalize">
              Actions
            </HeadTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!data ? (
            <TableRow>
              <TableCell colSpan={7}>
                <SpinnerUI />
              </TableCell>
            </TableRow>
          ) : data && data?.data?.length == 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <Alert severity="info">No Results Found</Alert>
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map((row, i) => (
              <StyledTableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {headCells.map((k, i) => (
                  <TableCell key={i}>
                    {k.formatter
                      ? k.formatter(row[k.id as keyof Product])
                      : row[k.id as keyof Product]}
                  </TableCell>
                ))}
                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                  <IconButton onClick={() => onEdit(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => onDelete(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            {data && (
              <TablePagination
                colSpan={4}
                count={data?.pagination?.count}
                rowsPerPage={data?.pagination?.pageSize}
                page={data?.pagination?.page}
                showFirstButton={true}
                showLastButton={true}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
