import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/reducers/userReducer"
import productReducer from "../features/reducers/productReducer"
export const store= configureStore({
    reducer:{
        userReducer:userReducer,
        productReducer : productReducer
    }
})

