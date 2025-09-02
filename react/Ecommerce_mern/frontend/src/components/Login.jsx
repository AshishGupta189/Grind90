import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { asyncsigninuser } from "../features/actions/userAction";

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const LoginHandler = (user) => {
    reset();
    dispatch(asyncsigninuser(user));
  };

  return (
    <div className="w-full min-h-[92%] flex items-center justify-center text-white absolute z-2 px-4">
      <div className="w-full max-w-[400px]">
        <p className="text-center text-3xl mb-2">SIGN IN</p>
        <form
          onSubmit={handleSubmit(LoginHandler)}
          className="p-10 rounded shadow-2xl flex flex-col w-full"
        >
          <input
            type="email"
            placeholder="Email Address"
            className="outline-0 border-b text-xl p-2 bg-transparent"
            {...register("email", { required: "Email can't be empty" })}
          />
          <small className="text-thin text-red-400 mb-3">
            {errors?.email?.message}
          </small>

          <input
            type="password"
            placeholder="Password"
            className="outline-0 border-b p-2 text-xl bg-transparent"
            {...register("password", { required: "Password can't be empty" })}
          />
          <small className="text-thin text-red-400 mb-4">
            {errors?.password?.message}
          </small>

          <button className="px-10 mb-4 py-2 w-fit text-black rounded bg-red-200 self-center">
            Login User
          </button>

          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="text-xl text-red-200">Register</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
