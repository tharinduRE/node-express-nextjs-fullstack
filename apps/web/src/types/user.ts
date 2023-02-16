import { IModel } from "./IModel";

export interface User extends IModel {
    id: string;
    email: string,
    name : string,
    provider: string
    role: 'ADMIN' | 'USER'
  }
  