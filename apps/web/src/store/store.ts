import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import product from "./slices/product";
import cart from "./slices/cart";
import order from "./slices/order";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cart);

const rootReducer = combineReducers({
  cart: persistedReducer,
  product,
  order,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    
});



export default store
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
