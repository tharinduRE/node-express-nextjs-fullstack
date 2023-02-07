import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SortOrder , FilterAPI } from "../../types/IFilterApi";
import { Product } from "../../types/product";

export interface ProductState extends FilterAPI<Product>{
  selectedProduct?: Product | null;
}

const initialState: ProductState = {
  selectedProduct: undefined,
  sortOrder: "asc",
  sortBy: "itemId",
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
        order: SortOrder;
        orderBy: keyof Product;
      }>
    ) => {
      (state.sortOrder = action.payload.order),
        (state.sortBy = action.payload.orderBy);
    },
    FILTER: (
      state,
      action: PayloadAction<{
        value: any;
        field: keyof Product;
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
    SELECTED: (state, action: PayloadAction<ProductState['selectedProduct']>) => {
      state.selectedProduct = action.payload;
    },
    PAGINATION: (
      state,
      action: PayloadAction<ProductState['pagination']>
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
