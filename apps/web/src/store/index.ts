import { configureStore } from '@reduxjs/toolkit'
import empReducer from './reducers/product'

const store = configureStore({
  reducer : {
    product : empReducer
  }
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch