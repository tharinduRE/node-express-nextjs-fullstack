import { ApiFilter } from "../../types/apifilter";
import { Product } from "../../types/product";
import { PaginatedResults } from "../../types/pagination";
import Client from "..";

const employeeRoute = `/products`;
export const getProductList = (apiFilter: ApiFilter<Product>) => Client.get<PaginatedResults<Product>>(employeeRoute, { params: { order: apiFilter.order, orderBy: apiFilter.orderBy, ...apiFilter.pagination, filters: JSON.stringify(apiFilter.filters) } });

export const addOne = (emp: Product) => Client.post<Product>(employeeRoute, emp);

export const updateOne = (emp: Product) => Client.put<Product>(`${employeeRoute}/${emp._id}`, emp);
export const getProductById = (empId?: string) => Client.get<Product>(`${employeeRoute}/${empId}`);
export const deleteOne = (empId?: string) => Client.delete(`${employeeRoute}/${empId}`);
