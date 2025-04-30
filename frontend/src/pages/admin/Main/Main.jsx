import React, { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar/SideBar";
import DataStorage from "../../../helper/DataStorage";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import Search from "../../../assets/images/serch.png";
import Plus from "../../../assets/images/plus.png";
import Edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import Add from "../../../assets/images/addnew.png";
import HttpHandler from "../../../data/HttpHandler";

const Main = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); 
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      var res = await HttpHandler.request("categories");

      if (search != "") {
        res = await HttpHandler.request(`categories?search=${search}`);
      }

      const code = JSON.parse(res).code;
      const body = JSON.parse(res).body;

      if (code === 200) {
        const data = JSON.parse(body);
        setCategories(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar />
      <div className="section">
        <h1>Manage Category</h1>
        <p>{categories.length} category available</p>
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
            <a href="">
              <i class="bx bx-plus"></i>
              <p>Add New Category</p>
            </a>
          </div>
        </div>

        <div className="category-table-container">
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
              {Array.isArray(categories) &&
                categories
                  .filter((item) =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{"CTG " + item.id}</td>
                      <td>{item.name}</td>
                      <td>{formatDate(item.created_at)}</td>
                      <td>0</td>
                      <td>
                        <div className="btn-container">
                          <button className="edit-btn">
                            <img src={Edit} alt="" />
                            <p>Edit</p>
                          </button>
                          <button className="delete-btn">
                            <img src={Delete} alt="" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Main;
