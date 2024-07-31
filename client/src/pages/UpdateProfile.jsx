import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useForm } from "react-hook-form";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { toast, ToastContainer, Flip } from "react-toastify";
//redux state fetching data
import { useSelector, useDispatch } from "react-redux";
import { setUserDetail } from "../components/redux/slices/userDetail";

const UpdateProfile = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  //setting default value of fields on rendering
  const [preUserData, setPreUserData] = useState({
    bio: "",
    company: "",
    phone: "",
    profileImg: "",
    website: "",
  });

  //fetching user data from redux state
  const userDetail = useSelector((state) => state.userDetail);

  const userImg = userDetail.profileImg;
  const username = userDetail.username;

  const url = "https://blog-app-api-liart.vercel.app/api/user/details";
  //update user profile image
  const [profileImage, setProfileImage] = useState(userImg);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const options = {
        maxSizeMB: 0.2, // Maximum size in MB (200KB)
        useWebWorker: true, // Use web worker for faster compression
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();

        reader.onloadend = () => {
          setProfileImage(reader.result);
        };

        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const onSubmit = async (data) => {
    data.username = username;
    data.profileImg = profileImage;
    // console.log(data);

    try {
      const sendResult = await axios.post(url, data);
      dispatch(
        setUserDetail({
          username: userDetail.username,
          email: userDetail.email,
          fullname: userDetail.fullname,
          profileImg: profileImage,
        })
      );
      localStorage.setItem("profileImg", profileImage);
      toast.success(sendResult.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    } catch (err) {
      console.log("Error Submitting data", err);
    }
  };

  useEffect(() => {
    const username = userDetail.username; // Replace with the actual username
    // Fetch user data from the server whenever there is a change in userDetail
    async function getUser() {
      try {
        const response = await axios.get(url, {
          params: {
            username: username,
          },
        });
        setPreUserData((prev) => {
          return {
            ...prev,
            bio: response.data.bio,
            company: response.data.company,
            phone: response.data.phone,
            profileImg: response.data.profileImg,
            website: response.data.website,
          };
        });
      } catch (error) {
        console.error(error.message);
      }
    }

    getUser();
  }, [userDetail.username]);

  return (
    <div>
      <ToastContainer />
      <Sidebar />
      <div
        className="min-h-screen 
       lg:pl-52 xs:px-7 flex flex-col items-center"
      >
        <h1 className="text-3xl text-center py-4 font-semibold">
          General Information
        </h1>
        <div className="w-full max-w-4xl px-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-3 mb-6 md:grid-cols-2">
              <div className="flex flex-col">
                <div className="flex flex-col md:flex-row gap-6 mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={userDetail.fullname}
                      id="first_name"
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      defaultValue={userDetail.username}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="john_doe"
                      required
                      readOnly
                    />
                  </div>
                </div>
                <div className="mt-14">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={userDetail.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john.doe@company.com"
                    required
                    readOnly
                  />
                </div>
              </div>
              <div className="flex justify-center mb-6">
                <img
                  className="rounded-full w-52 h-52 object-cover"
                  src={profileImage}
                  loading="lazy"
                  alt="Profile"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  type="number"
                  name="phone"
                  {...register("phone")}
                  id="phone"
                  defaultValue={preUserData.phone}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123-45-678"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Update Profile Picture
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  onChange={handleImageChange}
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  {...register("company")}
                  defaultValue={preUserData.company}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Flowbite"
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Website URL
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  {...register("website")}
                  defaultValue={preUserData.website}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="flowbite.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Bio
              </label>
              <textarea
                name="bio"
                id="message"
                {...register("bio")}
                defaultValue={preUserData.bio}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your bio here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
