import React from "react";
import Header from "../../components/Header";
import { Alert } from "@mui/material";

const page = () => {
  return (
    <>
      <Header></Header>
      <div className="mt-24">
        <Alert className="mb-24" variant="filled" severity="warning">
          Payment proceed failed
        </Alert>
        <a  className="font-bold text-center m-24 border p-4"href="/checkout">Go Back</a>
      </div>
    </>
  );
};

export default page;
