import React from "react";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Dashboard from "../../assets/images/dashboard.png";
import Category from "../../assets/images/category.png";
import Product from "../../assets/images/product.png";
import Logout from "../../assets/images/logout.png";
import DataStorage from "../../helper/DataStorage";
import { useLocation } from "react-router-dom";

const SidebarItem = ({ icon, text, active, onClick }) => {
  return (
    <div className={`sidebar-item-container ${active ? "active" : ""}`} onClick={onClick}>
      <img src={icon} alt={text} />
      <p>{text}</p>
    </div>
  );
};


const SideBar = () => {
  
  const navigate = useNavigate()
  const location = useLocation();

  const handleLogout = () => {
    DataStorage.deleteToken()
    navigate("/login")
  }

  return (
    <div className="sidebar-container">
      <div className="logo-container">
        <img src={Logo} alt="logo" />
        <h1>Earthly</h1>
      </div>

      <div className="sidebar-menu">
        <SidebarItem onClick={() => navigate("/main/admin")}  icon={Dashboard} text="Dashboard" active={location.pathname === "/main/admin"} />
        <SidebarItem onClick={() => navigate("/main/admin/category")}  icon={Category} text="Category" active={location.pathname === "/main/admin/category"} />
        <SidebarItem onClick={() => navigate("/main/admin/product")} icon={Product} text="Product" active={location.pathname === "/main/admin/product"}/>
      </div>

        <a href="" onClick={handleLogout}>
            <img src={Logout} alt="" />
            <p>Logout</p>
        </a>
    
    </div>
  );
};

export default SideBar;
