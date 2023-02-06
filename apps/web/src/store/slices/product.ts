import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../../types/apifilter";
import { Product } from "../../types/product";

export interface ProductState {
  selectedProduct: Product | undefined;
  orderBy: keyof Product;
  order: Order;
  filters: any;
  pagination: {
    page: number;
    pageSize: number;
  };
}

const initialState: ProductState = {
  selectedProduct: undefined,
  order: "asc",
  orderBy: "itemId",
  filters: {},
  pagination: {
    pageSize: 10,
    page: 0,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    ORDER: (
      state,
      action: PayloadAction<{
        order: Order;
        orderBy: keyof Product;
      }>
    ) => {
      (state.order = action.payload.order),
        (state.orderBy = action.payload.orderBy);
    },
    FILTER: (
      state,
      action: PayloadAction<{
        value: any;
        field: keyof Product;
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
    SELECTED: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
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

export const { ORDER, FILTER, SELECTED, PAGINATION } = productSlice.actions;

export default productSlice.reducer;
