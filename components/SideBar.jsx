import React from "react";
import "../app/Styles/SideBar.scss";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SideBar = ({ onTagClick }) => {
  const tags = ["Vehicle", "Electronics", "Outdoor", "Fashion", "Home Decor", "Other"];

  return (
    <div className="sidebar-container">
      <div className="sidebar-elem">
        <div className="sidebar-header">
         
            <a href="/search">
              Search <FontAwesomeIcon icon={faMagnifyingGlass} />
            </a>
      
        </div>
        {tags.map((tag) => (
          <div key={tag} className="sidebar-header">
            <Link legacyBehavior href={`/filter/${tag}`} passHref>
              {tag}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
