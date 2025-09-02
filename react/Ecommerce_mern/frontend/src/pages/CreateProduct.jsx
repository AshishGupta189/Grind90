import { nanoid } from "nanoid";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { asynccreateproduct } from "../features/actions/productAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createHandler = (product) => {
    reset();
    product.id = nanoid();
    dispatch(asynccreateproduct(product));
  };

  return (
    <div
      className="w-[95%] md:w-[80%] flex flex-col md:flex-row z-2 h-auto md:h-[80%] absolute bg-[#262626]/75 text-white backdrop-blur-sm 
      shadow-2xl justify-between rounded-2xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] overflow-hidden"
    >
      {/* Left Image Section */}
      <div className="relative w-full md:w-[40%] h-60 md:h-full">
        <img
          src="https://images.unsplash.com/photo-1527992105446-9db744bac8d4?q=80&w=2010&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          alt=""
        />
        <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center text-center p-4">
          <p className="text-gray-300 text-sm md:text-md">
            Create. Publish. Inspire.
          </p>
          <p className="text-black text-xl md:text-4xl font-bold">
            Create New Product
          </p>
          <p className="text-red-100 text-sm md:text-base">
            Let’s Add Something Amazing to the Store.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-[58%] h-full">
        <form
          onSubmit={handleSubmit(createHandler)}
          className="p-6 md:p-10 rounded shadow-2xl flex flex-col w-full"
        >
          <input
            type="text"
            placeholder="Product title"
            className="outline-0 border-b text-lg md:text-xl p-2 bg-transparent"
            {...register("title", { required: "Product title is required" })}
          />
          <small className="text-thin text-red-400 mb-3">
            {errors?.title?.message}
          </small>

          <input
            type="file"
            accept="image/*"
            className="outline-0 border-b text-sm md:text-lg p-2 bg-transparent"
            {...register("image")}
          />

          <input
            type="text"
            placeholder="Product description"
            className="outline-0 border-b text-lg md:text-xl p-2 bg-transparent"
            {...register("desc", {
              required: "Product description can't be empty",
            })}
          />
          <small className="text-thin text-red-400 mb-3">
            {errors?.desc?.message}
          </small>

          <input
            type="text"
            placeholder="Product Category"
            className="outline-0 border-b text-lg md:text-xl p-2 bg-transparent"
            {...register("category", {
              required: "Product Category can't be empty",
            })}
          />
          <small className="text-thin text-red-400 mb-4">
            {errors?.category?.message}
          </small>

          <input
            type="number"
            placeholder="Product price"
            className="outline-0 border-b text-lg md:text-xl text-white p-2 w-full bg-transparent border-white"
            {...register("price", { required: "Price can't be empty" })}
          />
          <small className="text-thin text-red-400 mb-4">
            {errors?.price?.message}
          </small>

          <button className="px-6 md:px-10 py-2 w-fit text-black mb-4 rounded bg-red-100">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
