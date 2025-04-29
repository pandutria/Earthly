import React from "react";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Dashboard from "../../assets/images/dashboard.png";
import Category from "../../assets/images/category.png";
import Product from "../../assets/images/product.png";
import Logout from "../../assets/images/logout.png";

const SidebarItem = ({ icon, text, active }) => {
  return (
    <div className={`sidebar-item-container ${active ? "active" : ""}`}>
      <img src={icon} alt={text} />
      <p>{text}</p>
    </div>
  );
};

const SideBar = () => {
  return (
    <div className="sidebar-container">
      <div className="logo-container">
        <img src={Logo} alt="logo" />
        <h1>Earthly</h1>
      </div>

      <div className="sidebar-menu">
        <SidebarItem icon={Dashboard} text="Dashboard" active={false} />
        <SidebarItem icon={Category} text="Category" active={false} />
        <SidebarItem icon={Product} text="Product" active={false} />
      </div>

        <a href="">
            <img src={Logout} alt="" />
            <p>Logout</p>

        </a>
    
    </div>
  );
};

export default SideBar;
