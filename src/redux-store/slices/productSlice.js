import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
    productList: [],
};

// creating slice
export const productSlice = createSlice({
    name: "products",
    initialState: initialProductState,
    reducers: {
        setProductList: (state, action) => {
            state.productList = action.payload;
        },
        appendProducts: (state, action) => {
            state.productList = [...state.productList, ...action.payload];
        },
    },
});

// exporting reducers
export const { setProductList, appendProducts } = productSlice.actions;

