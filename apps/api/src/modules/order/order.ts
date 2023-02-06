import { Product } from './../product';
export interface Order {
    // mongo object id
    _id?: string;

    items?: Product[];
    quantity: number
  }
  