import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../components/componentStyling.css";
const Settings = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow website-bg-color flex justify-center items-center  h-screen ml-64 xs:ml-0 xs:px-7">
        <h1 className="text-4xl">Wait and get ready to be amazed! 😮</h1>
        <div>
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Click here to add suggestions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
