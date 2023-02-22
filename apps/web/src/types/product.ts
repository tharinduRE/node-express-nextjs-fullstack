import { IModel } from './IModel';
import { Metadata } from './metadata';
export interface Product extends IModel {
    itemId?: string;
    name: string;
    description: string;
    listPrice: number;
    discount?: string;
    category: string;
    subcategory: string;
    thumbnailUrl?: string;
    photoUrls?:string[]
    slug?:string
    active?:boolean
    attributes: Metadata<any>[]
  }
  