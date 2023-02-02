import { Product } from './../types/product';
import { Employee } from "../types/employee";

export type Order = 'asc' | 'desc';
export interface EmployeeStore {
  // employeeList: Employee[];
  selectedProduct: Employee | undefined;
  orderBy: keyof Employee
  order: Order
  filters: any,
  pagination:{
    page: number,
    pageSize: number
  }
}

export interface ProductStore {
  // employeeList: Employee[];
  selectedProduct: Product | undefined;
  orderBy: keyof Product
  order: Order
  filters: any,
  pagination:{
    page: number,
    pageSize: number
  }
}
