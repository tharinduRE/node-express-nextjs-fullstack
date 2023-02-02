import { IModel } from "./IModel";

export interface Employee extends IModel{
    // mongo object id
    _id?: string;

    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    number: string;
    gender: string;
    photo?: string;
  }
  