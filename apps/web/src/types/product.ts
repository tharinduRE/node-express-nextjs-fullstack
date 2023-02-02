import { IModel } from './IModel';
export interface Product extends IModel {
    // mongo object id
    _id?: string;

    itemId?: string;
    name: string;
    description: string;
    listPrice: number;
    discount: string;
    category: string;
    subcategory: string;
    thumbnailUrl?: string;
    photoUrl?:string
  }
  