import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { Flip, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { debounce, throttle } from "lodash";

import { useDispatch } from "react-redux";
import { setUserDetail } from "../components/redux/slices/userDetail";

import "react-toastify/dist/ReactToastify.css";

// Debounced function to check username after user stops typing
const debouncedCheckUsername = debounce(async (username, setFeedback) => {
  try {
    const response = await axios.get(
      `https://vercel.com/ujjwal-prakashs-projects/blog-app-api/api/auth/check-username`,
      {
        params: { username: username },
      }
    );
    const data = response.data;
    if (data.isUnique) {
      setFeedback("Username is available");
    } else {
      setFeedback("Already taken! Try another");
    }
  } catch (error) {
    console.log("Error: ", error);
    setFeedback("Error checking username availability");
  }
}, 1500); // Adjust the delay as needed

// Throttled function to check username while user is typing
const throttledCheckUsername = throttle(async (username, setFeedback) => {
  try {
    const response = await axios.get(
      `https://vercel.com/ujjwal-prakashs-projects/blog-app-api/api/auth/check-username`,
      {
        params: { username: username },
      }
    );
    const data = response.data;
    if (data.isUnique) {
      setFeedback("Username is available");
    } else {
      setFeedback("Already taken! Try another");
    }
  } catch (error) {
    console.log("Error: ", error);
    setFeedback("Error checking username availability");
  }
}, 1500); // Adjust the interval as needed

const Register = () => {
  //state for toggling the password text
  const [showPassword, setShowPassword] = useState(false);
  //for accessing global state data
  const dispatch = useDispatch();
  //for username availability check
  const [feedback, setFeedback] = useState("");
  //for enable and disable signup button on clicking submit
  const [isClicked, setIsClicked] = useState(false);

  //for react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const usernameValue = watch("username");

  useEffect(() => {
    if (usernameValue !== undefined) {
      if (usernameValue.length > 0) {
        // Send throttled requests while typing
        throttledCheckUsername(usernameValue, setFeedback);
        // Send a final debounced request when user stops typing
        debouncedCheckUsername(usernameValue, setFeedback);
      } else {
        setFeedback("");
      }
    }
  }, [usernameValue]);

  //sending data to server
  const onSubmit = async (data) => {
    // console.log(data);
      setIsClicked(true);
    try {
      const url = "https://vercel.com/ujjwal-prakashs-projects/blog-app-api/api/auth/register";
      const result = await axios.post(url, data);
      const obj = result.data.user;
      obj.profileImg = obj.profileImg.toString("base64");
      // console.log(result);
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
      toast.error(error.response.data, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
      console.error("Error logging in:", error.response.data);
    }finally {
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
        <h1 className="text-center text-2xl w-3/4 mx-auto font-extrabold text-gray-800 dark:text-white">
          Start Your Journey with us! 👋
        </h1>
        <div className="mt-5 bg-white dark:bg-gray-700 px-4 pb-4 pt-8 sm:rounded-lg sm:px-10 sm:shadow">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* username field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  data-testid="username"
                  placeholder="Jhon_doee"
                  {...register("username", {
                    required: "Username is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._]+$/, // Allow letters, numbers, periods, and underscores
                      message:
                        "Username can only contain letters, numbers, periods, and underscores",
                    },
                    minLength: {
                      value: 1,
                      message: "Username must be at least 1 character",
                    },
                    maxLength: {
                      value: 30,
                      message: "Username must be at most 30 characters",
                    },
                  })}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                />
              </div>
              <span
                id="usernameFeedback"
                style={{
                  color: feedback.includes("available") ? "green" : "red",
                }}
              >
                {feedback}
              </span>
              {errors.username && (
                <span style={{ color: "red" }}>{errors.username.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullname"
                  type="text"
                  data-testid="fullname"
                  required
                  placeholder="Jhon Doe"
                  {...register("fullname", {
                    required: "This field can not be empty",
                  })}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                />
              </div>
              {errors.username && (
                <span style={{ color: "red" }}>{errors.fullname.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="text"
                  data-testid="email"
                  required
                  placeholder="jhondoe@gmail.com"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                />
              </div>
              {errors.username && (
                <span style={{ color: "red" }}>{errors.email.message}</span>
              )}
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
                          "We recommend at least 8 characters for higher security",
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
                type="submit"
                disabled = {isClicked}
                // onClick={}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-700 dark:border-transparent dark:hover:bg-indigo-600 dark:focus:ring-indigo-400 dark:focus:ring-offset-2"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <a
                className="font-semibold text-indigo-600 dark:text-indigo-100"
                href="/login"
              >
                &nbsp;Sign in
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
