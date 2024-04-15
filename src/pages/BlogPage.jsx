import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";
import BlogDetails from "../components/BlogDetails";
import Pagination from "../components/Pagination";

const BlogPage = () => {
  const [blog, setBlog] = useState(null);
  const [relatedblog, setRelatedblog] = useState([]);
  const location = useLocation();
  const navigation = useNavigate();
  const { loading, setLoading } = useContext(AppContext);
  const blogId = location.pathname.split("/").at(-1);

  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";

  async function fetchRelatedBlogs() {
    setLoading(true);

    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      setBlog(data.blog);
      setRelatedblog(data.relatedBlogs);
    } catch (error) {
      console.log(error);
      setBlog(null);
      setRelatedblog([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (blogId) {
      fetchRelatedBlogs();
    }
  }, [location.pathname]);
  return (
    <div className="max-w-[600px] w-full py-3 flex flex-col gap-y-7 my-[100px] justify-center items-center">
      <Header />
      <div>
        <button
          className="border-2 border-gray-300 py-1 px-4 rounded-md"
          onClick={() => navigation(-1)}
        >
          Back
        </button>
      </div>

      <div className="flex flex-col gap-y-7 items-center justify-center">
        {loading ? (
          <p className="text-center font-bold text-3xl">Loading...</p>
        ) : blog ? (
          <div className="flex flex-col gap-y-7 items-center justify-center gap-x-1" >
            <BlogDetails post={blog} />
            <h2 className="font-bold">Related blog</h2>
            {relatedblog.map((post) => (
              <div key={post.id}>
                <BlogDetails post={post} />
              </div>
            ))}
          </div>
        ) : (
          <p>No blog found</p>
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default BlogPage;
