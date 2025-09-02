import { toast } from "react-toastify";
import axios from "../../config/axiosConfig"
import {loginuser,logoutuser} from "../reducers/userReducer"

export const asynccurrentuser = ()=> (dispatch,getState)=>{
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch(loginuser(user));}
    } catch (error) {
        toast.error(error.message||"Soemthing went wrong !!");
    }
}

export const asyncsignupuser = (user) => async (dispatch, getState) => {
    try {
        await axios.post("/users", user);
    } catch (error) {
        toast.error(error.message || "Something went wrong");
    }
};

export const asyncsigninuser = (user) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(
            `/users?email=${user.email}&password=${user.password}`
        );
        if (data[0]) {
            toast.success("User logged in!");
            localStorage.setItem("user", JSON.stringify(data[0]));
            dispatch(asynccurrentuser());
        } else {
            toast.error("Wrong Credientials!");
        }
    } catch (error) {
        toast.error(error.message || "Something went wrong !! ");
    }
};

export const asynclogoutuser = () => async (dispatch, getState) => {
    try {
        localStorage.removeItem("user");
        dispatch(logoutuser());
        toast.success("User logged out!");
    } catch (error) {
        toast.error(error.message || "Something went wrong !! ");
    }
};

export const asyncupdateuser = (id, user) => async (dispatch, getState) => {
    try {
        const { data } = await axios.patch(`/users/${id}`, user);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(asynccurrentuser());
    } catch (error) {
        toast.error(error.message || "Something went wrong !! ");
    }
};

export const asyncdeleteuser = (id) => async (dispatch, getState) => {
    try {
        await axios.delete(`/users/${id}`);
        localStorage.removeItem("user");
        dispatch(logoutuser());
        toast.error("User Deleted!");
    } catch (error) {
        toast.error(error.message || "Something went wrong !! ");
    }
};