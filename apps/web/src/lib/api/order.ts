import { ApiFilter } from "../../types/apifilter";
import { Order } from "../../types/order";
import { PaginatedResults } from "../../types/pagination";
import Client from "..";

const route = `/orders`;
export const getOrderList = (apiFilter: ApiFilter<Order>) =>
  Client.get<PaginatedResults<Order>>(route, {
    params: {
      order: apiFilter.order,
      orderBy: apiFilter.orderBy,
      ...apiFilter.pagination,
      filters: JSON.stringify(apiFilter.filters),
    },
  });

export const addOne = (emp: Order) => Client.post<Order>(route, emp);

export const updateOne = (emp: Order) =>
  Client.put<Order>(`${route}/${emp._id}`, emp);
export const getOrderById = (empId?: string) =>
  Client.get<Order>(`${route}/${empId}`);
export const deleteOne = (empId?: string) => Client.delete(`${route}/${empId}`);
