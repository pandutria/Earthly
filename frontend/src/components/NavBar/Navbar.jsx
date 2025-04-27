import React from "react";
import "./Navbar.css"
import Logo from "../../assets/images/logo.png";

function Navbar ({children}) {
    return (
        <div className="navbar-container">
            <div className="navbar">
                <div className="logo-container">
                     <img src={Logo} alt="logo" />
                     <h1>Earthly</h1>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Navbar