import React from "react";
import SideBar from "../../../components/SideBar/SideBar";
import DataStorage from "../../../helper/DataStorage";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import { useState } from "react";
import Search from "../../../assets/images/serch.png";
import Plus from "../../../assets/images/plus.png";

const Main = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // if (DataStorage.token == "") {
  //   navigate("/login")
  // }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar />
      <div className="section">
        <h1>Manage Category</h1>
        <p>9 category available</p>
        <div className="filter-container">
          <div className="login-input-wrapper">
            <img src={Search} alt="" className="login-input-icon" />
            <input
              type={search}
              placeholder="Search Category"
              value={search}
              onChange={(x) => x.target.value}
            />
          </div>
          <div className="plus">
            <img src={Plus} alt="" />
          </div>
          <div className="date-filter">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
