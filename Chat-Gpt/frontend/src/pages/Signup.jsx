import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log("Signup Data:", data,{withCredentials: true});
    const reqBody={
        email: data.email,
        fullName:{
            firstName: data.firstName,
            lastName: data.lastName
        },
        password: data.password
    };
    axiosInstance.post('/auth/register', reqBody)
      .then(response => {
        console.log("Signup successful:", response.data);
      })
      .catch(error => {
        console.error("Signup error:", error);
      });
      navigate("/login");
  };
  const password = watch("password");

  return (
    <div className="min-h-screen w-full absolute flex items-center justify-center bg-gradient-to-br from-[#02111B] via-[#04283d] to-[#02111B] px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold">Create Account</h2>
          <p className="text-sm text-gray-300 mt-2">
            Join us and start exploring 🚀
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* First & Last Name */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <input
                placeholder="First Name"
                className="input"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "Min 2 characters",
                  },
                })}
              />
              {errors.firstName && (
                <p className="error-text">{errors.firstName.message}</p>
              )}
            </div>

            <div className="w-1/2">
              <input
                placeholder="Last Name"
                className="input"
                {...register("lastName", {
                  required: "Last name is required",
                })}
              />
              {errors.lastName && (
                <p className="error-text">{errors.lastName.message}</p>
              )}
            </div>
          </div>

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

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="error-text">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold py-2.5 rounded-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-60"
          >
            {isSubmitting ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Already have an account?{" "}
          <span
          onClick={()=>navigate("/login")}
            className="text-amber-400 hover:underline"
            >
                Login
            </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
