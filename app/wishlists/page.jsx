"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/client";
import "../Styles/wishlists.scss";
import CircularProgress from "@mui/material/CircularProgress";
const Page = () => {
  const [wishlistedPosts, setWishlistedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlistedPosts = async () => {
      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        setError("Error retrieving user data");
        return;
      }

      try {
        // Fetch wishlisted post IDs for the current user
        const {
          data: { wishlists },
          error: fetchError,
        } = await supabase
          .from("users")
          .select("wishlists")
          .eq("id", user.id)
          .single();

        if (fetchError) {
          setError("Error fetching wishlisted posts");
          return;
        }

        // Fetch details of each wishlisted post
        const wishlistedPostsData = [];
        for (const postId of wishlists) {
          const { data: post, error: postError } = await supabase
            .from("posts")
            .select()
            .eq("post_id", postId)
            .single();

          if (postError) {
            setError(`Error fetching details of post with ID ${postId}`);
            return;
          }

          wishlistedPostsData.push(post);
        }

        setWishlistedPosts(wishlistedPostsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWishlistedPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Header></Header>
        {" "}
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center">
        <h1 className="text-center mt-12 font-bold w-header">
          Wishlisted Products
        </h1>
        {wishlistedPosts.map((post) => (
          <div className="wishlists-container">
            <a
              className="flex m-8 items-center"
              href={`/product/${post.post_id}`}
            >
              <img src={post.img_url} alt="Image" />
              <div className="mx-4">
                <h1 className="font-bold">{post.post_title}</h1>
                <h2>{post.price}₺</h2>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
