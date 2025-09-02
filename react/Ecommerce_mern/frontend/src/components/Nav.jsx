import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const { user } = useSelector((state) => state.userReducer);

  return (
    <div
      className="fixed w-full top-0 left-0 z-50 bg-[#262626]/60 backdrop-blur-md text-white 
      flex items-center px-4 sm:px-6 h-14 shadow-lg justify-between"
    >
      {/* Logo */}
      <div className="logo w-[30%] sm:w-[15%] md:w-[10%]">
        <img
          className="w-[90%] rounded"
          src="../public/images/Screenshot 2025-08-13 153928.png"
          alt="Logo"
        />
      </div>

      {/* Nav Links */}
      <div className="flex gap-4 sm:gap-6 text-sm sm:text-base">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-red-200" : "hover:text-red-200 transition-colors"
          }
        >
          Home
        </NavLink>

        {user ? (
          <>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "text-red-200" : "hover:text-red-200 transition-colors"
              }
            >
              Cart
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-red-200" : "hover:text-red-200 transition-colors"
              }
            >
              Settings
            </NavLink>

            {user?.isAdmin && (
              <NavLink
                to="/create-product"
                className={({ isActive }) =>
                  isActive ? "text-red-200" : "hover:text-red-200 transition-colors"
                }
              >
                Create-Product
              </NavLink>
            )}
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-red-200" : "hover:text-red-200 transition-colors"
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Nav;
