import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import "../components/componentStyling.css";

const AllPosts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const userDetail = useSelector((state) => state.userDetail);

  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const result = await axios.get(
          `https://vercel.com/ujjwal-prakashs-projects/blog-app-api/api/post/allposts/${userDetail.username}` // Corrected URL format
        );
        setAllPosts(result.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchAllPosts();
  }, [userDetail.username]);

  useEffect(() => {
    console.log();
  }, [allPosts]);

  return (
    <div className="flex h-screen website-bg-color">
      <Sidebar />
      <div className="flex-grow flex justify-center items-start p-10 ml-64 xs:px-2 xs:ml-0">
        <div className="flex flex-col w-full max-w-5xl">
          <div className="title">
            <h1 className="text-4xl font-bold text-center my-8">All Posts</h1>
          </div>
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md w-full max-w-lg"
            />
          </div>
          {allPosts.length == 0 && (
            <div className="text-center p-10">
              {" "}
              <h1 className="text-3xl" >No posts created</h1>
              <p className="p-5" >Visit create post section</p>
            </div>
          )}

          {allPosts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 sm:px-8 lg:px-0">
              {allPosts.map((post) => (
                <PostCard
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  content={post.content}
                  author={post.author}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
