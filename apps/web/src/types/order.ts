import { IModel } from "./IModel";
import { Product } from "./product";

export const status = [
  "NEW",
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "COMPLETED",
  "CANCELLED",
] as const;

export type OrderStatus = typeof status[number];
export interface Order extends IModel {
  orderNo?: string;
  items?: {
    product: Product;
    quantity: number;
  }[];
  amount: number;
  userId?: any;
  status?: OrderStatus;
}

export interface DailyOrders {
  orders: Order[];
  count: number;
  date: string;
  _id: string;
}

export type OrderCountResponse = {
  _id: OrderStatus;
  count: number;
}[];
