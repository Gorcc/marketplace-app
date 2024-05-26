"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import { createClient } from "@/utils/supabase/client";
import MenuItem from "@mui/material/MenuItem";

const CreateSale = ({ user }) => {
  const supabase = createClient();

  const [showAlert, setShowAlert] = useState(false);
  const [showBadAlert, setShowBadAlert] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [condition, setCondition] = useState();
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState(null);
  const handleCreateSale = async () => {
    try {
      const avatarFile = image;
      const filePath = `images/${avatarFile.name}`;
      const fileURL =
        "https://fdermimfvizrllvawuib.supabase.co/storage/v1/object/public/post_images/images/";
      const { imageData, imgError } = await supabase.storage
        .from("post_images")
        .upload(filePath, avatarFile, {
          cacheControl: "3600",
          upsert: false,
        });
      console.log(imageData);
      const { data, error } = await supabase.from("posts").insert([
        {
          post_username: user[0].user_name,
          post_descb: postDescription,
          post_title: postTitle,
          user_id: user[0].id,
          tags: tags,
          price: price,
          location: location,
          img_url: `${fileURL}${image.name}`,
          poster_phone: user[0].user_phone,
          condition: condition,
        },
      ]);

      if (error) {
        throw error;
      }

      setShowAlert(true);
      setShowBadAlert(false);
    } catch (error) {
      setShowBadAlert(true);
      setShowAlert(false);
      console.error("Error creating sale:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-8">Create your product</h1>
        {showAlert && (
          <Alert className="m-4" variant="filled" severity="success">
            Sale created successfully.
          </Alert>
        )}
        {showBadAlert && (
          <Alert className="m-4" variant="filled" severity="error">
            There was a problem creating your sale.
          </Alert>
        )}
        <Box
          component="form"
          className="w-full"
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
          noValidate
          autoComplete="off"
        >
          {/* Image Upload Component */}
          <div className="flex flex-col items-center">
            <label htmlFor="image-upload" className="mb-2 cursor-pointer">
              Upload Image
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />

            {!image && (
              <div className="relative">
                <label htmlFor="image-upload" className="mb-2 cursor-pointer">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKO12GQy2FqY0-MIdjwZJeuAODa7zmPhK0SBmWWic18Q&s"
                    alt="Uploaded"
                    className="w-48 h-auto mb-4 border p-4 mt-8 cursor-pointer"
                  />
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
              </div>
            )}
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="w-48 h-auto mb-4"
              />
            )}
          </div>
          <div>
            <TextField
              required
              id="post-title"
              label="Product Name"
              variant="outlined"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              fullWidth
              className="mb-4"
            />
            <TextField
              required
              id="post-description"
              label="Product Description"
              variant="outlined"
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              multiline
              rows={4}
              fullWidth
              className="mb-4"
            />
            <TextField
              required
              id="post-price"
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              multiline
              rows={1}
              fullWidth
              className="mb-4"
            />
            <TextField
              select
              id="tags"
              label="Tags"
              variant="outlined"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              fullWidth
              className="mb-4"
            >
              <MenuItem value="Vehicle">Vehicle</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Fashion">Fashion</MenuItem>
              <MenuItem value="Outdoor">Outdoor</MenuItem>
              <MenuItem value="Home Decor">Home Decor</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <TextField
              required
              id="location"
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              rows={1}
              className="mb-4"
            />
            <TextField
              select
              id="condition"
              label="Condition"
              variant="outlined"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              fullWidth
              className="mb-4"
            >
              <MenuItem value="Brand New">Brand New</MenuItem>
              <MenuItem value="Second Hand">Second Hand</MenuItem>
              
            </TextField>

            <div className="tag-container flex flex-wrap mb-4">
             
            </div>

            <Fab
              color="black"
              aria-label="create-sale"
              onClick={handleCreateSale}
            >
              <EditIcon />
            </Fab>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default CreateSale;
