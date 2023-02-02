import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Typography,
} from "@mui/material";
import { Employee } from "../../../types/employee";
import { getPhotoIfNotAvailable } from "../helpers";

export function EmployeeCard({
  row,
  onEdit,
  onDelete,
}: {
  row: Employee;
  onEdit: (row: Employee) => void;
  onDelete: (row: Employee) => void;
}) {
  return (
    <Card sx={{ maxWidth: 345, position: "relative" }}>
      <CardMedia
        component="img"
        height="192"
        image={row?.photo || getPhotoIfNotAvailable(row)}
        alt="photo"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" data-testid='name'>
          {row?.first_name} {row?.last_name}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          <b>{row?.email}</b>
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" data-testid="number">
          {row?.number}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {{ M: "Male", F: "Female" }[row?.gender]}
        </Typography>
      </CardContent>
      <CardActions sx={{ position: "absolute", bottom: 0, right: 0 }}>
        <Fab
          size="small"
          color="primary"
          onClick={() => onEdit(row)}
          aria-label="add"
        >
          <Edit />
        </Fab>
        <Fab
          size="small"
          color="error"
          onClick={() => onDelete(row)}
          aria-label="add"
        >
          <DeleteIcon />
        </Fab>
      </CardActions>
    </Card>
  );
}
