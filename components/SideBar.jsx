import React from "react";
import "../app/Styles/SideBar.scss"
const SideBar = () => {


    return (
        <div>

            <aside>
                <p> Menu </p>
                <a href="javascript:void(0)">
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    My drive
                </a>
                <a href="javascript:void(0)">
                    <i className="fa fa-laptop" aria-hidden="true"></i>
                    Computers
                </a>
                <a href="javascript:void(0)">
                    <i className="fa fa-clone" aria-hidden="true"></i>
                    Shared with me
                </a>
                <a href="javascript:void(0)">
                    <i className="fa fa-star-o" aria-hidden="true"></i>
                    Starred
                </a>
                <a href="javascript:void(0)">
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                    Trash
                </a>
            </aside>

            <div class="social">
                <a href="https://www.linkedin.com/in/florin-cornea-b5118057/" target="_blank">
                    <i class="fa fa-linkedin"></i>
                </a>
            </div>

        </div>
    )
}

export default SideBar