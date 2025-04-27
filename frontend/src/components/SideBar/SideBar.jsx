import React from "react";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png"

function SideBar({children}) {
    return (
        <div className="sidebar-container">
            <div className="logo-container">
                 <img src={Logo} alt="" />
                 <h1>Earthly</h1>
            </div>
            <div>   

            </div>
        </div>
    );
}

export default SideBar