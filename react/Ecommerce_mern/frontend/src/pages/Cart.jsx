import { useDispatch, useSelector } from "react-redux";
import { asyncupdateuser } from "../features/actions/userAction";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const product = useSelector((state) => state.productReducer.products);

  const getProductById = (id) => product?.find((p) => p.id === id);

  const handleQuantityChange = (id, delta) => {
    const cart = user.cart;
    const index = cart.findIndex((item) => item.id === id);
    let newQty = cart[index].quantity + delta;

    let newUser;
    if (newQty === 0) {
      const newCart = cart.filter((c) => c.id !== id);
      newUser = { ...user, cart: newCart };
    } else {
      const newCart = [...cart];
      newCart[index] = {
        ...newCart[index],
        quantity: newCart[index].quantity + delta,
      };
      newUser = { ...user, cart: newCart };
    }
    dispatch(asyncupdateuser(user.id, newUser));
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      bg-[#262626]/75 text-white backdrop-blur-sm shadow-2xl rounded-2xl 
      flex flex-col gap-2 z-50 overflow-hidden w-[90%] max-w-5xl max-h-[90%]"
    >
      {/* Scrollable cart list */}
      <div className="flex flex-col overflow-y-auto p-4 gap-3">
        {user?.cart?.map((item) => {
          const pro = getProductById(item.id);

          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
              p-3 bg-gray-800 rounded-lg gap-3"
            >
              {/* Product info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                <img
                  src={pro?.image}
                  className="w-20 h-20 object-contain mx-auto sm:mx-0"
                  alt=""
                />
                <div className="flex flex-col gap-1 text-center sm:text-left">
                  <span className="text-lg sm:text-2xl">{pro?.title.slice(0,50)+"..." || "Unknown Product"}</span>
                  <span className="text-sm sm:text-lg font-thin">
                    {pro?.price} × {item.quantity} = {pro?.price * item?.quantity}
                  </span>
                </div>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center justify-center sm:justify-end gap-2">
                <button
                  onClick={() => handleQuantityChange(pro?.id, -1)}
                  className="px-3 py-1 bg-red-500 rounded text-lg"
                >
                  -
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(pro?.id, 1)}
                  className="px-3 py-1 bg-green-500 rounded text-lg"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
