import { KeyValue } from '../../types/metadata';
import { FilterAPI } from "../../types/IFilterApi";
import { PaginatedResults } from "../../types/IPagination";
import Client from "..";

const route = `/metadata/keyvalues`;

export const getKeyValueList = (apiFilter?: FilterAPI<KeyValue<any>>) =>
  Client.get<PaginatedResults<KeyValue<any>>>(route, {
    params: {
      order: apiFilter?.sortOrder,
      orderBy: apiFilter?.sortBy,
      ...apiFilter?.pagination,
    },
  });

export const getKeyValuesByKey = (key:string) =>
  Client.get<PaginatedResults<KeyValue<any>>>(route + '/' +  key, {
    params: {
      pageSize: 0,
    },
  });

export const addOne = (_id: Omit<KeyValue<any>, "_id">) => Client.post<KeyValue<any>>(route, _id);

export const updateOne = (_id: KeyValue<any>) =>
  Client.put<KeyValue<any>>(`${route}/${_id._id}`, _id);

export const deleteOne = (_id?: string) => Client.delete(`${route}/${_id}`);
