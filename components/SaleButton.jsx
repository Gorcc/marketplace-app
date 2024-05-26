"use client";
import React from "react";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";

const SaleButton = () => {

  return (
    <div className="saleButton-container">
      <a href="/create-sale"><FontAwesomeIcon className="mx-2" icon={faStore}></FontAwesomeIcon>Start Selling</a>
    </div>
  );
};

export default SaleButton;
