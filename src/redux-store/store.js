import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from './slices/productSlice';
import { compareProductSlice } from "./slices/compareProductSlice";

// introducing all reducers in store
export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        compareProducts: compareProductSlice.reducer
    },
});
