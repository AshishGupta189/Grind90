import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { asyncupdateuser } from "../features/actions/userAction";
import { asyncdeleteproduct, asyncupdateproduct } from "../features/actions/productAction";
const ProductDetails = () => {
  const navigate=useNavigate()
  const products = useSelector((state) => state.productReducer.products);
  const user = useSelector((state) => state.userReducer.user);
  const param = useParams();
  const dispatch = useDispatch();
  const product = products?.find((p) => p.id == param.id);
  const addToCartHandler = (id) => {
    const cart = user.cart;
    const index = cart.findIndex((item) => item.id === id);

    let newCart;
    if (index >= 0) {
      newCart = cart.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { id, quantity: 1 }];
    }

    const newUser = {
      ...user,
      cart: newCart,
    };
    toast.success("Product Added to cart");
    dispatch(asyncupdateuser(user.id, newUser));
  };
  const wishlistHandler = (id) => {
    const newUser = {
      ...user,
      wishlist: [...user.wishlist, id],
    };
    toast.success("Product is wishlisted !! ");
    dispatch(asyncupdateuser(user.id, newUser));
  };
  const removeFromWishlist = (id) => {
    let newWishlist = user.wishlist.filter((item) => item !== id);
    const newUser = {
      ...user,
      wishlist: newWishlist,
    };
    toast.info("Product removed from wishlist!!");
    dispatch(asyncupdateuser(user.id, newUser));
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: product?.title,
      price: product?.price,
      category: product?.category,
      desc: product?.description,
    },
  });


  const updateProductHandler =(pro)=>{
    if(pro.image.length ===0) pro.image=product.image;
    dispatch(asyncupdateproduct(product.id,pro));
  }

  const removeProductHandler =(id)=>{
    dispatch(asyncdeleteproduct(id))
    navigate("/")
    
  }
  return (
    <div className="w-screen h-[80%] mt-18 absolute z-2 overflow-x-hidden">
      <div className="w-screen h-[100%] flex justify-around">
        <div
          className="w-[35%] rounded-2xl  h-[100%] bg-[#262626]/75 flex justify-center items-center backdrop-blur-sm 
        shadow-2xl"
        >
          <img
            src={product?.image}
            className="w-[90%] h-[90%] object-cover "
            alt="prodimg"
          />
        </div>
        <div className="w-[55%] h-[100%]  px-10 py-5 flex flex-col gap-5">
          <h2 className="text-5xl text-red-100">{product?.title}</h2>
          <h2 className="text-4xl text-red-100">
            Price : <span className="text-green-200">₹{product?.price}</span>
          </h2>
          <h2 className="text-3xl text-red-100">
            Despriction :{" "}
            <span className="text-xl text-slate-300">
              {product?.description}
            </span>
          </h2>

          <h2 className="text-2xl text-white">
            Category :{" "}
            <span className="text-xl text-slate-400">{product?.category}</span>
          </h2>

          <div className="flex justify-between">
            <button
              onClick={() => {
                addToCartHandler(product.id);
              }}
              className="w-[45%] py-2 rounded text-black bg-red-100"
            >
              Add to cart
            </button>

            {user?.wishlist?.findIndex((item) => item === product?.id) != -1 ? (
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="w-[45%] py-2 bg-red-100 text-black rounded"
              >
                Remove from wishlist
              </button>
            ) : (
              <button
                onClick={() => wishlistHandler(product.id)}
                className="w-[45%] py-2 bg-red-100 text-black rounded"
              >
                Add to wishlist
              </button>
            )}
          </div>
        </div>
      </div>

      {user?.isAdmin &&
        (() => {
          return (
            <div
              className="w-[80%] flex  h-[80%]  bg-[#262626]/75 text-white backdrop-blur-sm 
              shadow-2xl justify-between rounded-2xl mt-15 m-auto  overflow-hidden"
            >
              <div className="relative w-[40%] h-full ">
                <img
                  src="https://images.unsplash.com/photo-1527992105446-9db744bac8d4?q=80&w=2010&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-full objext-contain rounded-2xl "
                  alt=""
                />
                <div className="absolute top-[50%] flex flex-col gap-4 left-[45%] -translate-[50%]">
                  <p className="text-gray-700 text-md">
                    Create. Publish. Inspire.
                  </p>
                  <p className="text-black text-4xl">Create New Product</p>
                  <p className="text-red-100">
                    Let’s Add Something Amazing to the Store.
                  </p>
                </div>
              </div>
              <div className="w-[58%] h-full ">
                <form
                  onSubmit={handleSubmit(updateProductHandler)}
                  className="p-10 rounded shadow-2xl   flex flex-col w-full"
                >
                  <input
                    type="text"
                    placeholder="Product title"
                    className="outline-0 border-b text-xl p-2 "
                    {...register("title", {
                      required: "Product title is required",
                    })}
                  />
                  <small className="text-thin text-red-400 mb-3">
                    {errors?.title?.message}
                  </small>
                  <input
                    type="file"
                    accept="image/*"
                    className="outline-0 border-b text-l p-2 "
                    {...register("image")}
                  />
                  <input
                    type="text"
                    placeholder="Product description"
                    className="outline-0 border-b text-xl p-2 "
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
                    className="outline-0 border-b text-xl p-2 "
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
                    className="outline-0 border-b text-xl text-white p-2 w-full border-white"
                    {...register("price", { required: "Price can't be empty" })}
                  />
                  <small className="text-thin text-red-400 mb-4">
                    {errors?.price?.message}
                  </small>

                  <div className="flex justify-between">
                    <button
                      className="w-[45%] py-2 rounded text-white bg-blue-500"
                    >
                      Update Product
                    </button>

                    <button
                      type="button"
                      onClick={() => removeProductHandler(product.id)}
                      className="w-[45%] py-2 bg-red-600 text-white rounded"
                    >
                      Remove Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
        })()}
    </div>
  );
};

export default ProductDetails;
