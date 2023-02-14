import { IModel } from './IModel';
import { Product } from './product';
export interface Order extends IModel {
    items?: {
      product : Product,
      quantity: number
    }[];
    amount: number
    userId?: any
    status?: string
  }
  

  export interface DailyOrders {
    orders : Order[],
    count: number,
    date: string,
    _id: string
  }