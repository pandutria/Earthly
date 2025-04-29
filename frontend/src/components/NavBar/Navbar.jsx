    import React from "react";
    import "./Navbar.css"
    import Logo from "../../assets/images/logo.png";

    function Navbar() {
        return (
            <div className="navbar">
                <div className="logo-container">
                    <img src={Logo} alt="logo" />
                    <h1>Earthly</h1>
                </div>
                <div className="nav-text">
                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="" >About Us</a></li>
                        <li><a href="">E-Commerce</a></li>
                    </ul>
                </div>
            </div>
        )
    }
    
    export default Navbar
