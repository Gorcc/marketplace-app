import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";

const CreateProfile = ( user ) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <Box
        component="form"
        className="w-full max-w-md"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="username"
          label="Username"
          defaultValue=""
          variant="outlined"
        />
        <TextField
          required
          id="name"
          label="Name"
          defaultValue=""
          variant="outlined"
        />
        <TextField
          required
          id="surname"
          label="Surname"
          defaultValue=""
          variant="outlined"
        />
        <TextField
          id="email"
          label=""
          defaultValue={user.user.email}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <Fab
          color="black"
          aria-label="edit"
          sx={{
            mt: 2,
          }}
        >
          <EditIcon />
        </Fab>
      </Box>
    </div>
  );
};

export default CreateProfile;
