"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/client";
import "../Styles/cart.scss";
import CircularProgress from "@mui/material/CircularProgress";
import CreditcardComponent from "../../components/CreditCardComponent";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
const Checkout = () => {
  const [wishlistedPosts, setWishlistedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardValid, setCardValid] = useState("");
  const [cardExpity, setCardExpiry] = useState("");
  const [cvv, setCVV] = useState("");

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
        let total = 0;
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
          total += post.price;
        }

        setWishlistedPosts(wishlistedPostsData);
        setTotalPrice(total);
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
        <Header />
        <h1 className="mt-24 mb-12 font-bold text-xl">Trying to fetch cart items if this takes more than 10 seconds your wishlists might be empty.</h1>

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
      <div className="flex w-screen items-center justify-around">
        <div className="flex flex-col justify-center">
          <h1 className="text-center mt-12 font-bold w-header">Cart</h1>
          {wishlistedPosts.map((post) => (
            <div className="cart-container" key={post.post_id}>
              <a
                className="flex m-2 items-center"
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
          <div className="total-price">
            <h2 className="font-bold text-center">Total: {totalPrice}₺</h2>
          </div>
        </div>
        <div className="card-info flex flex-col">
          <h1 className="my-4 font-bold">Card Info</h1>
        <TextField
              required
              id="name"
              label="Name"
              variant="outlined"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              fullWidth
              className="mb-4"
            />
             <TextField
              required
              id="cardnum"
              label="Card Number"
              variant="outlined"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              fullWidth
              className="mb-4"
            />
            
            
             <TextField
              required
              id="exp"
              label="Expiry"
              variant="outlined"
              value={cardExpity}
              onChange={(e) => setCardExpiry(e.target.value)}
              fullWidth
              className="mb-4"
            />
             <TextField
              required
              id="cvv"
              label="CVV"
              variant="outlined"
              value={cvv}
              onChange={(e) => setCVV(e.target.value)}
              fullWidth
              className="mb-4"
            />
            <Button variant="outlined">Proceed</Button>
            
        </div>
        <CreditcardComponent name={cardName} card={cardNumber} valid={cardValid} exp={cardExpity} cvv={cvv}/>
      </div>
    </>
  );
};

export default Checkout;
