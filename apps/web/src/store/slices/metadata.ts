import { KeyType , KeyValue } from './../../types/metadata';
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SortOrder , FilterAPI } from "../../types/IFilterApi";

export interface MetadataState extends FilterAPI<KeyType | KeyValue<any>>{
  selectedKType?: KeyType | null;
  selectedKValue?: KeyValue<any> | null;
}

const initialState: MetadataState = {
  selectedKType: undefined,
  selectedKValue: undefined,
  sortOrder: "asc",
  sortBy: 'createdAt',
  filters: {},
  pagination: {
    pageSize: 10,
    page: 0,
  },
};

const metadataSlice = createSlice({
  name: "metadata",
  initialState,
  reducers: {
    ORDER: (
      state,
      action: PayloadAction<{
        order: SortOrder;
        orderBy: any;
      }>
    ) => {
      (state.sortOrder = action.payload.order),
        (state.sortBy = action.payload.orderBy);
    },
    FILTER: (
      state,
      action: PayloadAction<{
        value: any;
        field: keyof any;
      }>
    ) => {
      if (action.payload.value == "") {
        delete state.filters?.[action.payload.field as any];
      } else {
        state.filters = {
          ...state.filters,
          ...{ [action.payload.field]: action.payload.value },
        };
      }
      state.pagination = initialState.pagination;
    },
    SelectKType: (state, action: PayloadAction<MetadataState['selectedKType']>) => {
      state.selectedKType = action.payload;
    },
    SelectKValue: (state, action: PayloadAction<MetadataState['selectedKValue']>) => {
      state.selectedKValue = action.payload;
    },
    
    PAGINATION: (
      state,
      action: PayloadAction<MetadataState['pagination']>
    ) => {
      state.pagination = {
        page: action.payload?.page,
        pageSize: action.payload?.pageSize || state.pagination?.pageSize,
      };
    },
  },
});

export const { ORDER, FILTER,SelectKType,SelectKValue, PAGINATION } = metadataSlice.actions;

export default metadataSlice.reducer;
