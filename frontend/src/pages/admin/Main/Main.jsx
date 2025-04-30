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
              type="text"
              placeholder="Search Category"
              value={search}
              onChange={(x) => setSearch(x.target.value)}
            />
          </div>
          <div className="plus">
            <img src={Plus} alt="" />
          </div>
          {/* <div className="filter-date-container">
              <input type="date" />
            </div>
          <div className="date-filter">
            
          </div> */}
        </div>

        <table className="category-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Category Name</th>
              <th>Created date</th>
              <th>Total Product</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "CTG 1",
                name: "Home & Kitchen",
                date: "10 Jan 2025",
                total: 5,
              },
              { id: "CTG 2", name: "Fashion", date: "12 Jan 2025", total: 8 },
              { id: "CTG 3", name: "Outdoor", date: "15 Jan 2025", total: 3 },
              {
                id: "CTG 4",
                name: "Personal Care",
                date: "10 Feb 2025",
                total: 7,
              },
              {
                id: "CTG 5",
                name: "Electronics",
                date: "17 Dec 2025",
                total: 4,
              },
              {
                id: "CTG 6",
                name: "Eco Packaging",
                date: "9 Sep 2024",
                total: 2,
              },
              {
                id: "CTG 7",
                name: "Renewable Energy",
                date: "8 Feb 2024",
                total: 3,
              },
            ].map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.total}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
