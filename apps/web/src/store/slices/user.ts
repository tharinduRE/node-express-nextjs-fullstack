import { SortOrder } from './../../types/IFilterApi';
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { FilterAPI } from '../../types/IFilterApi';

export interface UserState extends FilterAPI<User> {
  selectedUser?: User | null;
}

const initialState: UserState = {
  selectedUser: undefined,
  sortOrder: "desc",
  sortBy: 'createdAt',
  filters: {},
  pagination: {
    pageSize: 10,
    page: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    ORDER: (
      state,
      action: PayloadAction<{
        user: SortOrder;
        userBy: keyof User;
      }>
    ) => {
      (state.sortOrder = action.payload.user),
        (state.sortBy = action.payload.userBy);
    },
    FILTER: (
      state,
      action: PayloadAction<{
        value: any;
        field: keyof User;
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
    SELECTED: (state, action: PayloadAction<UserState['selectedUser']>) => {
      state.selectedUser = action.payload;
    },
    PAGINATION: (
      state,
      action: PayloadAction<UserState['pagination']>
    ) => {
      state.pagination = {
        page: action.payload?.page,
        pageSize: action.payload?.pageSize || state.pagination?.pageSize,
      };
    },
  },
});

export const { ORDER, FILTER, SELECTED, PAGINATION } = userSlice.actions;

export default userSlice.reducer;
