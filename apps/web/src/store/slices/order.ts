import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SortOrder } from "../../types/apifilter";
import { Order } from "../../types/order";

export interface OrderState {
  selectedOrder: Order | undefined;
  orderBy: keyof Order;
  order: SortOrder;
  filters: any;
  pagination: {
    page: number;
    pageSize: number;
  };
}

const initialState: OrderState = {
  selectedOrder: undefined,
  order: "asc",
  orderBy: 'createdAt',
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
      (state.order = action.payload.order),
        (state.orderBy = action.payload.orderBy);
    },
    FILTER: (
      state,
      action: PayloadAction<{
        value: any;
        field: keyof Order;
      }>
    ) => {
      if (action.payload.value == "") {
        delete state.filters[action.payload.field];
      } else {
        state.filters = {
          ...state.filters,
          ...{ [action.payload.field]: action.payload.value },
        };
      }
      state.pagination = initialState.pagination;
    },
    SELECTED: (state, action: PayloadAction<Order>) => {
      state.selectedOrder = action.payload;
    },
    PAGINATION: (
      state,
      action: PayloadAction<{
        page: number;
        pageSize: number;
      }>
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
