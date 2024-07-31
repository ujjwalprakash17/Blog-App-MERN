import Navbar2 from "../components/Navbar2";
import Suggestions from "../components/Suggestions";
import { useNavigate } from "react-router-dom";


const About = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar2 />
      <div className="flex flex-col justify-center align-middle h-[90vh]">
        <h1 className="text-center text-5xl mb-[2rem]">
          Will get this done soon...
        </h1>
        <div className="text-center">
          <Suggestions />
        <button type="button"
        onClick={() => navigate("/contact")}
         className="text-white m-10 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Click here to message</button>
        </div>
      </div>
    </div>
  );
};

export default About;
