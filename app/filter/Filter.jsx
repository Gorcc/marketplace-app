"use client"
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";
import { CircularProgress } from "@mui/material";

const Page = () => {
  // Extracting tag from the URL
  const tag = window.location.pathname.split("/").pop();

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");

      try {
        const supabase = createClient();
        const { data: posts, error: fetchError } = await supabase
          .from("posts")
          .select("*")
          .eq("tags", tag); // Use eq filter to match exactly

        if (fetchError) {
          setError("Error fetching posts");
          return;
        }

        setFilteredPosts(posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [tag]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center w-full h-full">
        {loading ? (
          <div className="mt-4">
            <div className="flex flex-col items-center justify-center">
              <CircularProgress />
            </div>
          </div>
        ) : error ? (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="w-1/2 mt-8">
            <h1 className="text-center font-bold">Filtered Products</h1>
            <h2 className="text-center font-bold m-4">{tag}</h2>
            {filteredPosts.map((post) => (
              <div
                key={post.post_id}
                className="p-4 m-4 border-b border-gray-200 flex items-center justify-around"
              >
                <div className="flex flex-1 justify-center items-center mr-4">
                  <img
                    src={post.img_url}
                    alt={post.post_title}
                    className="h-24 w-24 object-cover rounded"
                  />
                </div>
                <div className="flex flex-1 justify-center items-center">
                  <div>
                    <a href={`/product/${post.post_id}`}>
                      <h2 className="text-xl font-bold">{post.post_title}</h2>
                    </a>
                    <p>{post.price}₺</p>
                  </div>
                </div>
              </div>
            ))}
            <Footer />
          </div>
        ) : (
          <div className="mt-4">
            <p>No results found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
