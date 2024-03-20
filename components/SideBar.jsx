"use client";
import React, { useState } from "react";
import "../app/Styles/SideBar.scss";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <div className="sidebar-container">
      <div className="sidebar-elem">
        <div className="sidebar-header">
          <FontAwesomeIcon
            className="sidebar-icon"
            icon={faCar}
          ></FontAwesomeIcon>
          <h2>Cars</h2>
        </div>
        <a>Sports</a>
        <a>SUV's</a>
        <a>StationWagon</a>
        <a>Off-Road</a>
      </div>
      <div className="sidebar-elem">
        <div className="sidebar-header">
          <FontAwesomeIcon
            className="sidebar-icon"
            icon={faLaptop}
          ></FontAwesomeIcon>
          <h2>Electronics</h2>
        </div>
        <a
          onClick={() => {
            setMenu((prevMenu) => !prevMenu);
          }}
        >
          Phones ᐯ
        </a>

        {menu && (
          <div className="secret-menu">
            <a href="">Iphone</a>
            <a href="">Samsung</a>
            <a href="">Google Pixel</a>
            <a href="">OnePlus</a>
          </div>
        )}
        <a>Computers</a>
        <a>Tv's</a>
        <a>House Electronics</a>
      </div>
    </div>
  );
};

export default SideBar;
