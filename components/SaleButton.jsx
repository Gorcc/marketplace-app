"use client";
import React from "react";
import { redirect } from "next/navigation";
const SaleButton = () => {

  return (
    <div className="saleButton-container">
      <a href="/create-sale">Start a sale!</a>
    </div>
  );
};

export default SaleButton;
