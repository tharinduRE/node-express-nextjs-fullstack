import { FilterAPI } from "../../types/IFilterApi";
import { Order } from "../../types/order";
import { PaginatedResults } from "../../types/IPagination";
import Client from "..";

const route = `/orders`;
export const getOrderList = (apiFilter: FilterAPI<Order>) =>
  Client.get<PaginatedResults<Order>>(route, {
    params: {
      order: apiFilter.order,
      orderBy: apiFilter.orderBy,
      ...apiFilter.pagination,
      filters: JSON.stringify(apiFilter.filters),
    },
  });

export const addOne = (emp: Omit<Order,'_id'>) => Client.post<Order>(route, emp);

export const updateOne = (emp: Order) =>
  Client.put<Order>(`${route}/${emp._id}`, emp);
export const getOrderById = (empId?: string) =>
  Client.get<Order>(`${route}/${empId}`);
export const deleteOne = (empId?: string) => Client.delete(`${route}/${empId}`);
