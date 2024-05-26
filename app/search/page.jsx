"use client";
import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";
import { CircularProgress } from "@mui/material";
import SideBar from "@/components/SideBar";

const Page = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    const supabase = createClient();

    try {
      const { data: posts, error: searchError } = await supabase
        .from("posts")
        .select("*")
        .ilike("post_title", `%${searchInput}%`);

      if (searchError) {
        setError("Error fetching search results");
        return;
      }

      setSearchResults(posts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center h-screen">
        <div className="w-full max-w-md mt-12">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Search posts..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="w-full px-4 py-2 mt-4 font-bold text-black bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {loading && (
          <div className="mt-4">
            <div className="flex flex-col items-center justify-center">
              <CircularProgress />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="w-full mt-8">
            {searchResults.map((post) => (
              <div key={post.post_id} className="p-4 border-b border-gray-200">
                <a href={`/product/${post.post_id}`}>
                  <h2 className="text-xl font-bold">{post.post_title}</h2>
                  <p>{post.price}₺</p>
                </a>
              </div>
            ))}
          </div>
        )}

        {searchResults.length === 0 && !loading && !error && (
          <div className="mt-4">
            <p>No results found</p>
          </div>
        )}
      </div>
     
      <Footer />
    </>
  );
};

export default Page;
