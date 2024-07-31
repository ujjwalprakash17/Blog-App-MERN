import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import "../components/componentStyling.css";
import axios from "axios";

const EditPost = () => {
  const { postId } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const userDetail = useSelector((state) => state.userDetail);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5500/api/post/viewpost/${postId}`
        );
        const { title, content } = result.data;
        setValue("title", title);  // Set form value for title
        setValue("content", content);  // Set form value for content
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId, setValue]);

  useEffect(() => {
    const adjustHeight = (element) => {
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    };

    const handleInput = (event) => {
      adjustHeight(event.target);
    };

    if (titleRef.current) {
      titleRef.current.addEventListener("input", handleInput);
      adjustHeight(titleRef.current); // Adjust height on initial load
    }

    if (contentRef.current) {
      contentRef.current.addEventListener("input", handleInput);
      adjustHeight(contentRef.current); // Adjust height on initial load
    }

    return () => {
      if (titleRef.current) {
        titleRef.current.removeEventListener("input", handleInput);
      }
      if (contentRef.current) {
        contentRef.current.removeEventListener("input", handleInput);
      }
    };
  }, []);

  const onSubmit = async (data) => {
    data.username = userDetail.username;
    try {
      const result = await axios.post(
        `http://localhost:5500/api/post/edit/${postId}`,
        data
      );
      toast.success(result.data, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
        onClose : () => {
            navigate('/api/allposts');
        }
      });
    } catch (error) {
      toast.error(error.response.data, {
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
      console.log("Error sending post data", error);
    }
  };

  return (
    <div>
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
      <Sidebar />
      <div className="ml-[30rem] xs:ml-0 px-3 mt-14 min-h-[92vh] pt-5 w-1/2 xs:w-full xs:min-h-[84vh]">
        <div className="min-h-[80vh]">
          <textarea
            {...register("title")}
            ref={(e) => {
              titleRef.current = e;
              register("title").ref(e); // Ensure ref is registered
            }}
            className="w-full card-color rounded-md p-4 block text-ellipsis overflow-hidden resize-none text-4xl ff-choice2 font-bold focus:outline-none focus:ring-0"
            placeholder="Your title goes here"
          />
          <textarea
            {...register("content")}
            ref={(e) => {
              contentRef.current = e;
              register("content").ref(e); // Ensure ref is registered
            }}
            className="my-4 w-full card-color rounded-md p-4 ff-choice3 text-lg resize-none overflow-hidden focus:outline-none focus:ring-0"
            placeholder="Type your content here"
          />
        </div>
        <div className="xs:w-full text-center">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
