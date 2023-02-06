import { Product } from './../product';
export interface Order {
    items?: {
      product : Product,
      quantity: number
    }[];
    amount: number
    userId: string
    status: string
  }
  