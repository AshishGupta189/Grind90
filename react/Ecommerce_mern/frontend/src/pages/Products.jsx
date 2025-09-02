import { useDispatch, useSelector } from "react-redux";
import { asyncupdateuser } from "../features/actions/userAction";
import { toast } from "react-toastify";
import TrueFocus from "../reactBits/TrueFocus"
import { useNavigate } from "react-router-dom";
const Products = () => {
  const products = useSelector((state) => state.productReducer.products);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    toast.info("Product removed from wishlist!!")
    dispatch(asyncupdateuser(user.id, newUser));
  };
  const cardClickHandler=(id)=>{
    navigate(`/product/details/${id}`);
  }
  
  const addToCartHandler = (id) => {
    const cart = user.cart;
    const index = cart.findIndex((item) => item.id === id);

    let newCart;
    if (index >= 0) {
      newCart = cart.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Product doesn't exist → add new
      newCart = [...cart, { id, quantity: 1 }];
    }

    const newUser = {
      ...user,
      cart: newCart,
    };
    toast.success("Product Added to cart");
    dispatch(asyncupdateuser(user.id, newUser));
  };
  const mapped =
    products.length == 0
      ? (<div className="w-[100%] flex justify-center">
        <TrueFocus 
      sentence="No products right now..."
      manualMode={false}
      blurAmount={2}
      borderColor="red"
      animationDuration={1}
      pauseBetweenAnimations={1}
      />
      </div>)
      : products.map((p) => {
          return (
            <div
              key={p.id}
              onClick={()=>cardClickHandler(p.id)}
              className="w-[22%] h-[80%] flex flex-col gap-1 h-[70%] p-2 rounded bg-[#262626]/75 text-white backdrop-blur-sm 
              shadow-2xl"
            >
              <div className="w-[100%]  bg-red-100 h-[50%] rounded">
                <img
                  src={p.image}
                  className="w-[100%] object-cover h-full rounded"
                  alt=""
                />
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl">{p.title}</h2>
                {user?.wishlist?.findIndex((item) => item === p.id) != -1 ? (
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(p.id)}}
                    class="ri-heart-3-fill text-2xl text-red-600"
                  ></i>
                ) : (
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      wishlistHandler(p.id)}}
                    class="ri-heart-3-line text-2xl "
                  ></i>
                )}
              </div>
              <p className="text-xl text-green-200 font-thin"> ₹{p.price}</p>
              <p className="text-xs">{p?.description.slice(0, 100) + "..."}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  addToCartHandler(p.id)}}
                className="m-auto  py-1 px-6 rounded text-black bg-red-100"
              >
                Add to cart
              </button>
            </div>
          );
        });

  return (
    <div className="w-screen h-[90%] mt-15 absolute z-2 flex text-white px-10 overflow-x-hidden gap-10 flex-wrap">
      {mapped}
    </div>
  );
};

export default Products;
