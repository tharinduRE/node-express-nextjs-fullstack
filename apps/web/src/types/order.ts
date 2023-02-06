import { IModel } from './IModel';
import { Product } from './product';
export interface Order extends IModel {
    items?: {
      product : Product,
      quantity: number
    }[];
    amount: number
    userId?: string
    status?: string
  }
  