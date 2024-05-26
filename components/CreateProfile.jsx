"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import { createClient } from "@/utils/supabase/client";

const CreateProfile = ({ user }) => {
  const supabase = createClient();
  const [showAlert, setShowAlert] = useState(false);
  const [showBadAlert,setShowBadAlert] = useState(false);
  const [username, setUsername] = useState(user[0].user_name);
  const [name, setName] = useState(user[0].name);
  const [surname, setSurname] = useState(user[0].surname);
  const [adress,setAdress] = useState(user[0].adress);
  const [phone,setPhone] = useState(user[0].user_phone)

  const handleUpdateProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({
          user_name: username,
          name: name,
          surname: surname,
          user_phone:phone,
          adress:adress
        })
        .eq("id", user[0].id);
      if (error) {
        throw error;
      }
      setShowAlert(true);
      setShowBadAlert(false);
    } catch (error) {
      setShowBadAlert(true);
      setShowAlert(false);
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <div className="info-img flex w-screen items-center justify-around ml-24">
      <img style={{width:600,objectFit:"cover",height:600}} src="https://cdn.jsdelivr.net/gh/Gorcc/cdn@main/marketplaceapp/Home%20(1).png" alt="" />
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-3xl font-bold mb-8">Account Information</h1>
      {showAlert && (
        <Alert className="m-4" variant="filled" severity="success">
          Profile updated successfully.
        </Alert>
      )}
      {showBadAlert && (
        <Alert className="m-4" variant="filled" severity="error">
          There was a problem updating your profile.
        </Alert>
      )}
      <Box
        component="form"
        className="w-full max-w-md"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="username"
          label="Username"
          defaultValue={username}
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          id="name"
          label="Name"
          defaultValue={name}
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="surname"
          label="Surname"
          defaultValue={surname}
          variant="outlined"
          onChange={(e) => setSurname(e.target.value)}
        />
        <TextField
          id="email"
          defaultValue={user[0].user_mail}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
        label="Phone Number"
          id="phone"
          defaultValue={user[0].user_phone}
          onChange={(e) => setPhone(e.target.value)}
        
          variant="outlined"
        />
         <TextField
        label="Full Adress"
          id="adress"
          defaultValue={user[0].adress}
          onChange={(e) => setAdress(e.target.value)}
        
          variant="outlined"
        />
        <Fab
          color="black"
          aria-label="edit"
          onClick={handleUpdateProfile}
          sx={{
            mt: 2,
          }}
        >
          <EditIcon />
        </Fab>
      </Box>
    </div>
    
    </div>
  );
};

export default CreateProfile;
