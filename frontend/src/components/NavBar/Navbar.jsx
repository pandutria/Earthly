    import React from "react";
    import "./Navbar.css"
    import Logo from "../../assets/images/logo.png";
    import Cart from "../../assets/images/cart.png";
    import Logout from "../../assets/images/image.png";
    import History from "../../assets/images/history.png";
    import { useNavigate } from "react-router-dom";

    function Navbar() {
        const navigate = useNavigate()

        const navigateToCart = () => {
            navigate("/main/customer/cart")
        }

        const navigateToLog = () => {
            navigate("/")
        }

        const navigateToHistory = () => {
            navigate("/main/customer/history")
        }

        return (
            <div className="navbar">
                <div className="logo-container">
                    <img src={Logo} alt="logo" />
                    <h1>Earthly</h1>
                </div>
                <div className="nav-text">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about" >About Us</a></li>
                        <li><a href="#e-commerce">E-Commerce</a></li>
                    </ul>
                </div>
                <div className="transaction-container">
                    <img src={Logout} alt="" onClick={navigateToLog} />
                    <img src={Cart} alt="" onClick={navigateToCart} />
                    <img src={History} alt=""  onClick={navigateToHistory}/>
                </div>
            </div>
        )
    }
    
    export default Navbar
