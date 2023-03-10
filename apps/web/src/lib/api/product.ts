import { FilterAPI } from "../../types/IFilterApi";
import { Product } from "../../types/product";
import { PaginatedResults } from "../../types/IPagination";
import Client from "..";

const employeeRoute = `/products`;
export const getProductList = (apiFilter?: FilterAPI<Product>) =>
  Client.get<PaginatedResults<Product>>(employeeRoute, {
    params: {
      order: apiFilter?.sortOrder,
      orderBy: apiFilter?.sortBy,
      ...apiFilter?.pagination,
      filters: JSON.stringify(apiFilter?.filters),
    },
  });

export const search = (apiFilter?: FilterAPI<Product>, q?: string) =>
  Client.get<PaginatedResults<Product>>(employeeRoute + "/search", {
    params: {
      q,
      order: apiFilter?.sortOrder,
      orderBy: apiFilter?.sortBy,
      ...apiFilter?.pagination,
      filters: JSON.stringify(apiFilter?.filters),
    },
  });

export const addOne = (emp: Product) =>
  Client.post<Product>(employeeRoute, emp);

export const updateOne = (emp: Product) =>
  Client.put<Product>(`${employeeRoute}/${emp._id}`, emp);

export const getProductById = (_id?: string) =>
  Client.get<Product>(`${employeeRoute}/${_id}`);

  export const getProductBySlug = (slug?: string) =>
  Client.get<Product>(`${employeeRoute}/getbyslug/${slug}`);


export const deleteOne = (_id?: string) =>
  Client.delete(`${employeeRoute}/${_id}`);
