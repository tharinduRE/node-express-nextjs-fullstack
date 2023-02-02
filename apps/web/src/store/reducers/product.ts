import { createReducer } from "@reduxjs/toolkit";
import { ProductStore, Order } from "../types";

import { createAction } from "@reduxjs/toolkit";
import { Product } from "../../types/product";

export const PRODUCT_ORDER = createAction<{order:Order,orderBy:keyof Product}>("PRODUCT_ORDER");
export const PRODUCT_SELECTED = createAction<Product>("PRODUCT_SELECTED");
export const PRODUCT_FILTER = createAction<{value:any,field:keyof Product}>("PRODUCT_FILTER");
export const PRODUCT_PAGINATION = createAction<{
  page: number,
  pageSize: number
}>("PRODUCT_PAGINATION");


const initialState : ProductStore = {
  // employeeList: [],
  selectedProduct: undefined,
  order: 'asc',
  orderBy: 'itemId',
  filters: {},
  pagination: {
    pageSize:10,
    page:0 
  },
};

const empReducer = createReducer<ProductStore>(initialState, (builder) => {
  builder
    .addCase(PRODUCT_ORDER,(state,action)=> ({
      ...state,
      ...action.payload,
    }))
    .addCase(PRODUCT_SELECTED, (state, action) => ({
      ...state,
      selectedProduct: action.payload,
    }))
    .addCase(PRODUCT_FILTER,(state,action)=> {
      if (action.payload.value == "") {
        delete state.filters[action.payload.field];
      } else {
        state.filters = {
          ...state.filters,
          ...{ [action.payload.field]: action.payload.value },
        }
      }
      state.pagination = initialState.pagination;
    })
    .addCase(PRODUCT_PAGINATION, (state, action) => {
     state.pagination = {
       page : action.payload.page,
       pageSize: action.payload.pageSize || state.pagination.pageSize,
    };

    })
    .addDefaultCase((state) => state);
});

export default empReducer;
