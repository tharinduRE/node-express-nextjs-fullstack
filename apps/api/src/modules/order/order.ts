import { Product } from "./../product";

export const status = [
  "NEW",
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "COMPLETED",
  "CANCELLED",
] as const;

export type OrderStatus = typeof status[number];

export interface Order {
  orderNo: string;
  items?: {
    product: Product;
    quantity: number;
  }[];
  amount: number;
  userId: string;
  status: OrderStatus;
}
