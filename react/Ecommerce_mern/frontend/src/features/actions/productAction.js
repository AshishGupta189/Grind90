import { toast } from "react-toastify"
import axios from "../../config/axiosConfig"
import { loadProducts } from "../reducers/productReducer";

export const asyncloadproducts = () => async (dispatch, getState) => {
    try {
        const {data   } = await axios.get("/products");
        dispatch(loadProducts(data));
    } catch (error) {
        toast.error(error.message||"Something went wrong !!");
    }
};

export const asynccreateproduct = (product) => async (dispatch, getState) => {
    try {
        await axios.post("/products", product);
        dispatch(asyncloadproducts());
        toast.success("Product Created!");
    } catch (error) {
        toast.error(error.message||"Something went wrong !!");
    }
};

export const asyncupdateproduct =
    (id, product) => async (dispatch, getState) => {
        try {
            await axios.patch(`/products/${id}`, product);
            dispatch(asyncloadproducts());
            toast.success("Product Updated!");
        } catch (error) {
            toast.error(error.message||"Something went wrong !!");
        }
    };

export const asyncdeleteproduct = (id) => async (dispatch, getState) => {
    try {
        await axios.delete("/products/" + id);
        dispatch(asyncloadproducts());
        toast.error("Product Deleted!");
    } catch (error) {
        toast.error(error.message||"Something went wrong !!");
    }
};