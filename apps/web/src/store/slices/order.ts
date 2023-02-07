import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../../types/order";
import { FilterAPI,SortOrder } from '../../types/IFilterApi';

export interface OrderState extends FilterAPI<Order> {
  selectedOrder?: Order | null;
}

const initialState: OrderState = {
  selectedOrder: undefined,
  sortOrder: "desc",
  sortBy: 'createdAt',
  filters: {},
  pagination: {
    pageSize: 10,
    page: 0,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    ORDER: (
      state,
      action: PayloadAction<{
        order: SortOrder;
        orderBy: keyof Order;
      }>
    ) => {
      (state.sortOrder = action.payload.order),
        (state.sortBy = action.payload.orderBy);
    },
    FILTER: (
      state,
      action: PayloadAction<{
        value: any;
        field: keyof Order;
      }>
    ) => {
      if (action.payload.value == "") {
        delete state.filters?.[action.payload.field];
      } else {
        state.filters = {
          ...state.filters,
          ...{ [action.payload.field]: action.payload.value },
        };
      }
      state.pagination = initialState.pagination;
    },
    SELECTED: (state, action: PayloadAction<OrderState['selectedOrder']>) => {
      state.selectedOrder = action.payload;
    },
    PAGINATION: (
      state,
      action: PayloadAction<OrderState['pagination']>
    ) => {
      state.pagination = {
        page: action.payload.page,
        pageSize: action.payload.pageSize || state.pagination.pageSize,
      };
    },
  },
});

export const { ORDER, FILTER, SELECTED, PAGINATION } = orderSlice.actions;

export default orderSlice.reducer;
