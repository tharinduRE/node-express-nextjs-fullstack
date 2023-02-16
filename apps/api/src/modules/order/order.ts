import { Product } from "./../product";
export interface Order {
  orderNo: string;
  items?: {
    product: Product;
    quantity: number;
  }[];
  amount: number;
  userId: string;
  status: string;
}
