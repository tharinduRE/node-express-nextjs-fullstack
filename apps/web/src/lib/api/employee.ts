import Client from "..";
import { ApiFilter } from "../../types/apifilter";
import { Employee } from "../../types/employee";
import { PaginatedResults } from "../../types/pagination";

const employeeRoute = `/employees`;
export const getEmployeeList = (apiFilter: ApiFilter) => Client.get<PaginatedResults<Employee>>(employeeRoute, { params: { order: apiFilter.order, orderBy: apiFilter.orderBy, ...apiFilter.pagination, filters: JSON.stringify(apiFilter.filters) } });

export const addOne = (emp: Employee) => Client.post<Employee>(employeeRoute, emp);

export const updateOne = (emp: Employee) => Client.put<Employee>(`${employeeRoute}/${emp._id}`, emp);
export const getEmployeeById = (empId?: string) => Client.get<Employee>(`${employeeRoute}/${empId}`);
export const deleteOne = (empId?: string) => Client.delete(`${employeeRoute}/${empId}`);
