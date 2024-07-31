import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import AllPosts from "./pages/AllPosts";
import Contact from "./pages/Contact";
import ViewPost from "./pages/ViewPost";
import About from "./pages/About";
import UpdateProfile from "./pages/UpdateProfile";
import Settings from "./pages/Settings";

import StoreWrap from "./components/redux/hooks/StoreWrap";
import ProtectedRoute from "./components/Auth/ProtectedRoute.js";

import "./App.css";
import CreatePost2 from "./pages/CreatePost2";
import EditPost from "./pages/EditPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/register",
    element: <StoreWrap element={<Register />} />,
  },
  {
    path: "/login",
    element: <StoreWrap element={<Login />} />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<StoreWrap element={<Dashboard />} />} />,
  },
  {
    path: "/api/createpost",
    element: <ProtectedRoute element={<StoreWrap element={<CreatePost2 />} />} />,
  },
  {
    path: "/api/updateprofile",
    element: <ProtectedRoute element={<StoreWrap element={<UpdateProfile />} />} />,
  },
  {
    path: "/api/allposts",
    element: <ProtectedRoute element={<StoreWrap element={<AllPosts />} />} />,
  },
  {
    path: "/api/viewpost/:postId",
    element: <ProtectedRoute element={<StoreWrap element={<ViewPost />} />} />,
  },
  {
    path: "/api/editpost/:postId",
    element: <ProtectedRoute element={<StoreWrap element={<EditPost />} />} />,
  },
  {
    path: "/api/settings",
    element: <ProtectedRoute element={<StoreWrap element={<Settings />} />} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

