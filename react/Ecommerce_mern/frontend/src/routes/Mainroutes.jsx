import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Unauth from "./Unauth";
import Auth from "./Auth";

const Products = lazy(() => import("../pages/Products"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const ProfileUser = lazy(() => import("../pages/ProfileUser"));
const Login = lazy(() => import("../components/Login"));
const Signup = lazy(() => import("../components/Signup"));
const CreateProduct = lazy(() => import("../pages/CreateProduct"));
const Mainroutes= () =>{
    return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<Unauth>
        <Login />
      </Unauth>} />
      <Route path="/register" element={
        <Unauth><Signup /></Unauth>
      } />

      <Route path="/product/details/:id" element={<Auth><ProductDetails /></Auth>} />
      <Route path="/cart" element={<Auth><Cart /></Auth>} />
      <Route path="/profile" element={<Auth><ProfileUser /></Auth>} />
      
      <Route path="/create-product" element={<Auth><CreateProduct /></Auth>} />

      
    </Routes>
  );
}

export default Mainroutes;