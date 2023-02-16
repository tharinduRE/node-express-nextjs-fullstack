import { OrderStatus } from "../../types/order";
import { ChipProps } from "@mui/material";

export const orderStatusColors: { [key in OrderStatus]: ChipProps["color"] } = {
  NEW: "info",
  PROCESSING: 'secondary',
  CANCELLED: "error",
  SHIPPED: "success",
  COMPLETED: "success",
  PENDING: "warning",
};
