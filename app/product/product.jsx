"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import "../Styles/product.scss";
import SaleButton from "@/components/SaleButton";
import Header from "@/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar, Alert } from "@mui/material";
import {
  faArrowLeft,
  faBackward,
  faHeart,
  faHeartCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";

const Product = () => {
  const [pid, setPid] = useState("");
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  // Slice the url because useParams doesn't work for some
  useEffect(() => {
    const currentUrl = window.location.href;
    const urlSegments = currentUrl.split("/");
    const lastSegment = urlSegments[urlSegments.length - 1];
    setPid(lastSegment);

    const fetchPost = async () => {
      const supabase = createClient();

      try {
        const { data, error: postError } = await supabase
          .from("posts")
          .select()
          .eq("post_id", lastSegment);
        if (postError) {
          throw new Error("Error fetching post data");
        }

        setPost(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      }
    };

    fetchPost();
  }, []);

  const handleFavorite = async () => {
    const supabase = createClient();
  
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
  
      if (userError) {
        throw new Error("Error retrieving user data");
      }
  
      // Fetch the current wishlists array
      const { data: userData, error: fetchError } = await supabase
        .from("users")
        .select("wishlists")
        .eq("id", user.id)
        .single();
  
      if (fetchError) {
        throw new Error("Error fetching user wishlists");
      }
  
      // Check if the product ID is already in the wishlists array
      const isAlreadyInWishlist = userData.wishlists
        ? userData.wishlists.includes(pid)
        : false;
  
      if (isAlreadyInWishlist) {
        // Show alert that the item is already in the wishlist
        setAlertMessage("This item is already in your wishlist");
        setAlertSeverity("info");
        setAlertOpen(true);
        return;
      }
  
      // Append the new post ID to the wishlists array
      const updatedWishlists = userData.wishlists
        ? [...userData.wishlists, pid]
        : [pid];
  
      // Update the user's wishlists
      const { error: updateError } = await supabase
        .from("users")
        .update({ wishlists: updatedWishlists })
        .eq("id", user.id);
  
      if (updateError) {
        throw new Error("Error adding to wishlist");
      }
  
      // Show success alert
      setAlertMessage("Added to wishlist");
      setAlertSeverity("success");
      setAlertOpen(true);
    } catch (error) {
      console.error("Error adding to wishlist:", error.message);
      setError(error.message);
  
      // Show error alert
      setAlertMessage("Error adding to wishlist");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      <Header />

      {post ? (
        <>
          <div className="backbutton">
            <a href="/" className="back-btn">
              <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> Back
            </a>
          </div>

          <div className="product-container flex">
            <div className="product-left">
              <h1 className="prod_title">{post.post_title}</h1>
              <span className="post_tags">{post.tags}</span>
              <div className="flex items-center">
                <h2>{post.price}₺</h2>
                <span className="post_tags mx-8 border p-2">
                  {post.condition}
                </span>
                <button onClick={handleFavorite}>
                  <FontAwesomeIcon
                    className="favorite-ico"
                    icon={faHeart}
                  ></FontAwesomeIcon>
                </button>
              </div>
              <p>{post.post_descb}</p>
              <div className="seller-info">
                <hr />

                <h1>
                  <span>Seller🧑: </span>
                  <a href={`/business/${post.post_username}`}>
                    {post.post_username}
                  </a>
                </h1>
                <h1>
                  <span>Location📌: </span> {post.location}
                </h1>
                <h1>
                  <span>Phone📞: </span> {post.poster_phone}
                </h1>
                <h1>
                  <span>Posted at📅: </span> {post.created_at}
                </h1>
              </div>
              <a onClick={handleFavorite} href="/checkout" className="back-btn">
                Add to Cart
              </a>
            </div>
            <div className="product-right">
              <div className="image-container">
                <Image
                  src={post.img_url}
                  alt={post.post_title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <CircularProgress />
        </div>
      )}
      {error && <p>Error: {error}</p>}

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Product;
