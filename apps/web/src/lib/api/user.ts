import { FilterAPI } from "../../types/IFilterApi";
import { User } from "../../types/user";
import { PaginatedResults } from "../../types/IPagination";
import Client from "..";

const route = `/users`;
export const getUserList = (apiFilter?: FilterAPI<User>) =>
  Client.get<PaginatedResults<User>>(route, {
    params: {
      order: apiFilter?.sortOrder,
      orderBy: apiFilter?.sortBy,
      ...apiFilter?.pagination,
      filters: JSON.stringify(apiFilter?.filters),
    },
  });

export const addOne = (emp: Omit<User,'_id'>) => Client.post<User>(route, emp);

export const updateOne = (emp: User) =>
  Client.put<User>(`${route}/${emp._id}`, emp);
export const getUserById = (_id?: string) =>
  Client.get<User>(`${route}/${_id}`);
export const deleteOne = (_id?: string) => Client.delete(`${route}/${_id}`);
