import { OrderCountResponse, OrderStatus } from './../../types/order';
import { FilterAPI } from "../../types/IFilterApi";
import { DailyOrders, Order } from "../../types/order";
import { PaginatedResults } from "../../types/IPagination";
import Client from "..";

const route = `/orders`;
export const getOrderList = (apiFilter?: FilterAPI<Order>) =>
  Client.get<PaginatedResults<Order>>(route, {
    params: {
      order: apiFilter?.sortOrder,
      orderBy: apiFilter?.sortBy,
      ...apiFilter?.pagination,
      filters: JSON.stringify(apiFilter?.filters),
    },
  });

  
export const getDailyOrders = () => Client.get<DailyOrders[]>(route + '/getdailyorders');

export const getOrderCountByStatus = () => Client.get<OrderCountResponse>(route + '/getordersbystatus');

export const addOne = (emp: Omit<Order,'_id'>) => Client.post<Order>(route, emp);

export const updateOne = (emp: Order) =>
  Client.put<Order>(`${route}/${emp._id}`, emp);
export const getOrderById = (_id?: string) =>
  Client.get<Order>(`${route}/${_id}`);
export const deleteOne = (_id?: string) => Client.delete(`${route}/${_id}`);
