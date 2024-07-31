import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import { setUserDetail } from "../components/redux/slices/userDetail";
import { useState } from "react";
// import { set } from "lodash";

const Login = () => {
  //state for toggling the password text
  const [showPassword, setShowPassword] = useState(false);
  //state for disable or enable the login button
  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  //sending data to server
  const onSubmit = async (data) => {
    setIsClicked(true);
    try {
      const url = "https://vercel.com/ujjwal-prakashs-projects/blog-app-api/api/auth/login";
      const result = await axios.post(url, data);
      const obj = result.data.user;
      //set redux state here
      dispatch(setUserDetail(obj));
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("username", obj.username);
      localStorage.setItem("profileImg", obj.profileImg);
      localStorage.setItem("email", obj.email);
      localStorage.setItem("fullname", obj.fullname);
      // Show success toast notification
      toast.success(result.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
        onClose: () => {
          // Redirect to the dashboard after the toast closes
          if (result.statusText === "OK") {
            navigate("/dashboard");
          }
        },
      });
    } catch (error) {
      toast.error(error.response, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
      console.error("Error logging in:", error);
    } finally {
      setIsClicked(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
      <div className="w-full max-w-md">
        <h1 className="text-center text-2xl font-extrabold text-gray-800 dark:text-white">
          Welcome back to your account! 🌐
        </h1>
        <div className="mt-8 bg-white dark:bg-gray-700 px-4 pb-4 pt-8 sm:rounded-lg sm:px-10 sm:shadow">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Email or Username
              </label>
              <div className="mt-1">
                <input
                  id="identifier"
                  type="text"
                  data-testid="identifier"
                  placeholder="Email or Username"
                  {...register("identifier", { required: true })}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                />
                {errors.identifier && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Password
              </label>
              <div className="mt-1">
                {/* the below div is for password with eye button */}
                <div className="relative flex items-center mt-2">
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                    >
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    data-testid="password"
                    autoComplete="current-password"
                    required
                    placeholder="*******"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                        message:
                          "Password must include letters, numbers, and special characters",
                      },
                      validate: {
                        recommendedLength: (value) =>
                          value.length >= 8 ||
                          "Enter at least 8 characters for higher security",
                        noRepetition: (value) =>
                          !/(.)\1{2,}/.test(value) ||
                          "Avoid repetition of characters",
                      },
                    })}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                  />
                </div>
              </div>
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-400"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900 dark:text-white"
                >
                  Remember me
                </label>
              </div>
            </div>
            <div>
              <button
                data-testid="register"
                disabled={isClicked}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-700 dark:border-transparent dark:hover:bg-indigo-600 dark:focus:ring-indigo-400 dark:focus:ring-offset-2"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?
              <a
                className="font-semibold text-indigo-600 dark:text-indigo-100"
                href="/register"
              >
                &nbsp;Create account
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
