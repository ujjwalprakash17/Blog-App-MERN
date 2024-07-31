import { useNavigate } from "react-router-dom";
import axios from "axios";
import deleteIcon from "../assets/delete-icon-1.png";
import editIcon from "../assets/edit-icon-1.png";
import "./componentStyling.css";

const PostCard = ({ id, title, content, author }) => {
  const navigate = useNavigate();

  const handleViewPost = () => {
    navigate(`/api/viewpost/${id}`);
  };

  const handleEditPost = () => {
    navigate(`/api/editpost/${id}`);
  };

  //handling post deletion
  const handleDeletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      const response = await axios.delete(
        `https://vercel.com/ujjwal-prakashs-projects/blog-app-api/api/post/delete/${id}`
      );
      (response.data);
      // navigate(`/api/allposts`);
      window.location.reload();

    }
  };

  return (
    <div className="block rounded-lg shadow-secondary-1 overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 w-full sm:w-80 h-auto">
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat h-36"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
          alt="Nature"
        />
        <a href="#!">
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </a>
      </div>
      {/* content */}
      <div className="p-4 text-surface dark:text-white card-color h-60 flex flex-col justify-between">
        {/* title */}
        <h5 className="mb-2 text-xl font-semibold leading-tight truncate">
          {title}
        </h5>
        <p className="mb-4 text-base text-left line-clamp-3">{content}</p>
        {/* button */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleViewPost}
            className="inline-block w-1/2 rounded bg-blue-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out transform hover:bg-blue-500 hover:rotate-3 focus:outline-none focus:ring-0 active:bg-blue-800"
            data-twe-ripple-init
            data-twe-ripple-color="light"
          >
            View Post
          </button>

          {/* buttons to handle edit and delete operations */}
          <div className="relative inline-block w-1/4">
            <button
              type="button"
              onClick={handleDeletePost}
              className="relative inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out transform hover:bg-red-500 hover:rotate-3 focus:outline-none focus:ring-0 active:bg-blue-800"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              <img src={deleteIcon} alt="Delete" />
            </button>
            <div className="absolute bottom-full mb-2 hidden w-max px-2 py-1 text-xs text-white bg-black rounded opacity-75 group-hover:block">
              Delete
            </div>
          </div>

          <div className="relative inline-block w-1/4">
            <button
              type="button"
              onClick={handleEditPost}
              className="relative inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out transform hover:bg-gray-500 hover:rotate-3 focus:outline-none focus:ring-0 active:bg-blue-800"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              <img src={editIcon} alt="Edit" />
            </button>
            <div className="absolute bottom-full mb-2 hidden w-max px-2 py-1 text-xs text-white bg-black rounded opacity-75 group-hover:block">
              Edit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
