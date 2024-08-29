import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    compareProductList: [],
};

// creating slice
export const compareProductSlice = createSlice({
    name: "compareProducts",
    initialState: initialState,
    reducers: {
        setCompareList: (state, action) => {
            state.compareProductList = action.payload;
        }
    },
});

// exporting reducers
export const { setCompareList } = compareProductSlice.actions;

