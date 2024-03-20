"use client";
import React, { useEffect, useState } from "react";
import SaleCard from "@/components/SaleCard";
import { createClient } from "@/utils/supabase/client";
import Stack from "@mui/material/Stack";
import CircularProgress from '@mui/material/CircularProgress';
import "@/app/Styles/salecards.scss";



const SaleComponent = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClient();

      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) {
          throw new Error("Error fetching user data");
        }
        setUser(userData);
        const { data: postsData, error: postsError } = await supabase
          .from("posts")
          .select("*");
        if (postsError) {
          throw new Error("Error fetching posts data");
        }
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="sale-cards">
      {posts.length === 0 && (
        <div className="flex flex-col mt-36 items-center w-full h-screen">
      
          <CircularProgress className="mt-8" />
        </div>
      )}
      {posts.map((post) => (
        <SaleCard key={post.id} user={user} post={post} />
      ))}
    </div>
  );
};

export default SaleComponent;
