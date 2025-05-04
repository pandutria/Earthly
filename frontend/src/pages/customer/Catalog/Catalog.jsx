import React from "react";
import Navbar from "../../../components/NavBar/Navbar";
import "./Catalog.css";

const Catalog = () => {
  return (
    <div className="section-catalog">
      <h1>Catalog Products</h1>
      <div className="filter-container">
        <div className="login-input-wrapper">
          <img src="" alt="user" className="login-input-icon" />
          <input type="text" placeholder="Write your username" />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
