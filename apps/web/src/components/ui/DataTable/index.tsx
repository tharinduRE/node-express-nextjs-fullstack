import { SpinnerUI } from "@components/ui/SpinnerUI";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import FilterList from "@mui/icons-material/FilterList";
import FilterListOff from "@mui/icons-material/FilterListOff";
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
import { useState } from "react";
import { DataTableProps } from "./types";

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

export function DataTable<T>({
  data,
  headCells,
  sortBy,
  sortOrder,
  filters,
  hideActions = false,
  isLoading,
  onDeleteRow,
  onEditRow,
  onSortCol,
  onSearchCol,
  onPageChange,
  onRowsPerPageChange,
}: DataTableProps<T>) {
  const [anchorEls, setAnchorEl] = useState<{
    [s: string]: HTMLButtonElement | null;
  }>({});

  return (
    <TableContainer component={Paper} >
      <Table aria-label="simple table" size="small">
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
                  sortDirection={sortBy === headCell.id ? sortOrder : false}
                  className="capitalize"
                >
                  <TableSortLabel
                    active={sortBy === headCell.id}
                    direction={sortBy === headCell.id ? sortOrder : "asc"}
                    onClick={() => onSortCol && onSortCol(headCell.id)}
                  >
                    {headCell.label || headCell.id}
                    {sortBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {sortOrder === "desc"
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
                        (filters?.[headCell.id] && filters?.[headCell.id] != "") ? (
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
                            defaultValue={filters?.[headCell.id]}
                            onChange={(e) => {
                              e.preventDefault();
                              onSearchCol &&
                                onSearchCol(headCell.id, e.target.value);
                            }}
                          />
                        </Box>
                      </Popover>
                    </>
                  )}
                </HeadTableCell>
              )
            )}
            {!hideActions && <HeadTableCell key="actions" className="capitalize">
              Actions
            </HeadTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {!data? (
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
                      ? k.formatter(row[k.id] as React.ReactNode)
                      : (row[k.id] as React.ReactNode)}
                  </TableCell>
                ))}
               {!hideActions && <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                  {onEditRow && (
                    <IconButton onClick={() => onEditRow(row)}>
                      <Edit />
                    </IconButton>
                  )}
                  {onDeleteRow && (
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => onDeleteRow(row)}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </TableCell> }
              </StyledTableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            {data && onPageChange && (
              <TablePagination
                colSpan={4}
                count={data?.pagination?.count || 0}
                rowsPerPage={data?.pagination?.pageSize || 0}
                page={data?.pagination?.page || 0}
                showFirstButton={true}
                showLastButton={true}
                onPageChange={onPageChange as ( event: React.MouseEvent<HTMLButtonElement> | null,newPage: number) => void}
                onRowsPerPageChange={onRowsPerPageChange}
              />
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
