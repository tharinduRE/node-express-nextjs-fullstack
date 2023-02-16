import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

export default function StatCard(props: {
  number?: number;
  title: string | ReactNode;
}) {
  return (
    <Card
      sx={{ border: 1, borderColor: "lightgrey", padding: 2 }}
      elevation={0}
    >
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.title}
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: 600 }} color="primary.dark">
        {props?.number}
      </Typography>
    </Card>
  );
}
