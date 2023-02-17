import { IModel } from './IModel';
export interface Product extends IModel {
    itemId?: string;
    name: string;
    description: string;
    listPrice: number;
    discount?: string;
    category: string;
    subcategory: string;
    thumbnailUrl?: string;
    photoUrl?:string,
    slug?:string
    active?:boolean
  }
  