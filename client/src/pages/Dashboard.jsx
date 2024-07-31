// import { useEffect } from "react";
// import axios from "axios";

import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";
// import { useSelector } from "react-redux";

const Dashboard = () => {

  return (
    <div>
      <Sidebar />
      <div className="lg:w-3/4 lg:mt-16 lg:ml-80"  >
        <Profile />
      </div>
    </div>
  );
};

export default Dashboard;
