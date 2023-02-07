import { Product } from "./../../types/product";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  items: { product: Product; quantity: number }[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.items.find(
        (item) => item.product._id === action.payload._id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    INCREMENT: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.product._id === action.payload
      );
      if (item) item.quantity++;
    },
    DECREMENT: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.product._id === action.payload
      );
      if (item) {
        item.quantity === 1 ? (item.quantity = 1) : item.quantity--;
      }
    },
    REMOVE: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload
      );
    },
    CLEAR: () => (initialState),
  },
});

export const {
  ADD,
  INCREMENT,
  DECREMENT,
  REMOVE,
  CLEAR,
} = cartSlice.actions;

export default cartSlice.reducer;
