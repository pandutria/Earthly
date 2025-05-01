import React, { useEffect, useState } from "react";
import DataStorage from "../../../../helper/DataStorage";
import "./Category.css";
import Search from "../../../../assets/images/serch.png";
import Plus from "../../../../assets/images/plus.png";
import Edit from "../../../../assets/images/edit.png";
import Delete from "../../../../assets/images/delete.png";
import Add from "../../../../assets/images/addnew.png";
import HttpHandler from "../../../../data/HttpHandler";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SideBar from "../../../../components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";

const Category = () => {
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

  const handleDeleteData = async (id) => {
    try {
      Swal.fire({
        title: "Loading",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      const res = await HttpHandler.request(`categories/${id}`, "DELETE", null, null)
      const code = JSON.parse(res).code
  
      Swal.close()
  
      if (code === 200) {
        Swal.fire("Deleted!", "Category has been deleted.", "success");
        fetchCategories()
      } else {
        Swal.fire("Error", "Failed to delete category", "error"); 
      }
    } catch(err) {
      console.log(err)
    }
    
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar/>
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
            <Link to="/manage/category" className="link">
              <i class="bx bx-plus"></i>
              <p>Add New Category</p>
            </Link>
          </div>
        </div>

        <div className="category-table-container">
          <table className="category-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Category Name</th>
                <th>Created Date</th>
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
                      <td>0 Products</td>
                      <td>
                        <div className="btn-container">
                          <button className="edit-btn">
                            <img src={Edit} alt="" />
                            <p>Edit</p>
                          </button>
                          <button className="delete-btn" onClick={() => handleDeleteData(item.id)}>
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

export default Category;
