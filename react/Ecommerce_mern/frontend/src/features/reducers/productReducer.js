import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products:[]
}

const productSlice= createSlice({
    name:"products",
    initialState,
    reducers:{
        loadProducts: (state,action) =>{
            state.products = action.payload;
        }
    }
})

export default productSlice.reducer;
export const {loadProducts } = productSlice.actions