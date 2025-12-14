import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import { toast } from "react-toastify";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    reset();
    console.log("Login Data:", data);
    axiosInstance.post('/auth/login', data)
      .then(response => {
        toast.success("Login successful!");
        console.log(response);
        
        navigate("/");
      })
      .catch(error => {
        toast.error(error.message || "Login failed. Please try again.");
      });
      
  };

  return (
    <div className="min-h-screen w-full flex items-center absolute justify-center bg-gradient-to-br from-[#02111B] via-[#04283d] to-[#02111B] px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold">Welcome Back</h2>
          <p className="text-sm text-gray-300 mt-2">
            Login to continue 🚀
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="input"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "At least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          

          {/* Button */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold py-2.5 rounded-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={()=>navigate("/signup")}
            className="text-amber-400 hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
