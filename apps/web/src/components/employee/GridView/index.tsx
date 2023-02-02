import { SpinnerUI } from "@components/ui/SpinnerUI";
import {
  Alert,
  Grid
} from "@mui/material";
import { Employee } from "../../../types/employee";
import { EmployeeCard } from "../EmployeeCard";

type GridViewProps = {
  data?: Employee[];
  onEdit: (row: Employee) => void;
  onDelete: (row: Employee) => void;
};

export function GridView({ data, onEdit, onDelete }: GridViewProps) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {
      !data ? (
        <SpinnerUI />
      ) : data && data?.length == 0 ? (
        <Alert severity="info">No Results Found</Alert>
      ) : (
        data?.map((row, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <EmployeeCard row={row} onEdit={onEdit} onDelete={onDelete} />
          </Grid>
        ))
      )}
    </Grid>
  );
}

