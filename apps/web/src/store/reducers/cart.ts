import { createAction, createReducer } from "@reduxjs/toolkit";

export const CART_ADD = createAction('CART_ADD')
export const CART_FETCH = createAction('CART_FETCH')
export const CART_CLEAR = createAction('CART_CLEAR')

const cartReducer = createReducer({},(builder)=>{
    builder.addCase(CART_ADD,(state,action)=>{
        
    })
})