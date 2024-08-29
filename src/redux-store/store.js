import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from './slices/productSlice';

// introducing all reducers in store
export const store = configureStore({
    reducer: {
        products: productSlice.reducer
    },
});
