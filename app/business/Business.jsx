"use client";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import "../Styles/buisness.scss";
import "../Styles/product.scss";
const Business = () => {
  const [pid, setPid] = useState("");
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUrl = window.location.href;
    const urlSegments = currentUrl.split("/");
    const lastSegment = urlSegments[urlSegments.length - 1];
    setPid(lastSegment);

    const fetchPost = async () => {
      const supabase = createClient();

      try {
        const { data, error: postError } = await supabase
          .from("users")
          .select()
          .eq("user_name", lastSegment);

        if (postError) {
          throw new Error("Error fetching post data");
        }

        setPost(data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>No post found.</div>;
  }

  const postName = post.user_name.charAt(0).toUpperCase();

  return (
    <>
      <Header />
      <a href="/" className="back-btn mt-4">Back</a>
      <div className="buisness-info flex flex-col justify-center items-center my-4">
        <div className="flex flex-col m-4 justify-center items-center">
          <Avatar
            className=""
            style={{ width: 100, height: 100 }}
            sx={{ bgcolor: blue[500] }}
            aria-label="recipe"
          >
            {postName}
          </Avatar>
          <h1 className="m-4 font-bold">{post.user_name}</h1>
        </div>
        <hr className="my-4 w-full" />
        <h2>Business Phone: {post.user_phone}</h2>
        <h2>Business Mail: {post.user_mail}</h2>
        <h2>Owner Name: {post.name}</h2>
        <h2>Owner Surname: {post.surname}</h2>
        <h2>Member Since: {new Date(post.created_at).toLocaleDateString()}</h2>
        <h2>Adress: {post.adress}</h2>
      </div>
    </>
  );
};

export default Business;
