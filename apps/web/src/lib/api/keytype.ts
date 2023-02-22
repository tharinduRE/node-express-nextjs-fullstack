import { KeyType } from "../../types/metadata";
import { FilterAPI } from "../../types/IFilterApi";
import { PaginatedResults } from "../../types/IPagination";
import Client from "..";

const route = `/metadata/keytypes`;

export const getKeyTypeList = (apiFilter?: FilterAPI<KeyType>) =>
  Client.get<PaginatedResults<KeyType>>(route, {
    params: {
      order: apiFilter?.sortOrder,
      orderBy: apiFilter?.sortBy,
      ...apiFilter?.pagination,
    },
  });

export const getOneById = (_id?: string) =>
  Client.get<KeyType>(`${route}/${_id}`);


export const addOne = (_id: Omit<KeyType, "_id">) =>
  Client.post<KeyType>(route, _id);

export const updateOne = (_id: KeyType) =>
  Client.put<KeyType>(`${route}/${_id._id}`, _id);

export const deleteOne = (_id?: string) => Client.delete(`${route}/${_id}`);
