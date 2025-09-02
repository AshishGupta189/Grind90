import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useState } from "react";
import { asyncsignupuser } from "../features/actions/userAction";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const RegisterHandler = async (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    user.cart = [];
    user.wishlist = [];

    if (user.image && user.image.length > 0) {
      user.image = await toBase64(user.image[0]);
    } else {
      user.image = "https://www.freepik.com/free-photos-vectors/default-user";
    }

    reset();
    dispatch(asyncsignupuser(user));
    navigate("/login");
  };

  return (
    <div className="w-full absolute z-2 min-h-screen flex items-center justify-center text-white p-4">
      <div className="w-full max-w-lg bg-black/20 backdrop-blur-sm rounded-lg shadow-2xl p-6">
        <p className="text-center text-3xl mb-6">SIGN UP</p>
        <form
          onSubmit={handleSubmit(RegisterHandler)}
          className="flex flex-col w-full"
        >
          <input
            type="text"
            placeholder="Enter your Full Name"
            className="outline-0 border-b text-lg p-2 bg-transparent"
            {...register("username", { required: "Username is required" })}
          />
          <small className="text-red-400 mb-3">
            {errors?.username?.message}
          </small>

          <input
            type="file"
            accept="image/*"
            className="outline-0 border-b text-lg p-2 bg-transparent"
            {...register("image")}
            onChange={(e) => {
              if (e.target.files.length > 0) {
                const file = e.target.files[0];
                toBase64(file).then((base64) => setPreview(base64));
              }
            }}
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-20 h-20 rounded-full mt-3 object-cover mx-auto"
            />
          )}

          <input
            type="email"
            placeholder="Enter Your Email Address"
            className="outline-0 border-b text-lg p-2 bg-transparent"
            {...register("email", { required: "Email can't be empty" })}
          />
          <small className="text-red-400 mb-3">
            {errors?.email?.message}
          </small>

          <input
            type="password"
            placeholder="Enter Your Password"
            className="outline-0 border-b text-lg p-2 bg-transparent"
            {...register("password", { required: "Password can't be empty" })}
          />
          <small className="text-red-400 mb-4">
            {errors?.password?.message}
          </small>

          <button className="px-6 py-2 bg-red-100 text-black rounded hover:bg-red-200 transition w-fit mx-auto mb-4">
            Register User
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-red-200 hover:underline">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
