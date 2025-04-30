import React from "react";
import Navbar from "../../../components/NavBar/Navbar";
import "./ManageCategory.css";
import SideBar from "../../../components/SideBar/SideBar";
import { useState, useEffect } from "react";
import HttpHandler from "../../../data/HttpHandler";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ManageCategory = () => {
  const [category, setCategory] = useState("")
  const navigate = useNavigate()

  const handleSendData = async () => {
  if (!category) {
    alert("Field must be filled")
    return
  }

   Swal.fire({
        title: "Loading",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

    try {

      const rBody = {
        name: category
      }

      const res = await HttpHandler.request("categories", "POST", null, rBody)
      const code = JSON.parse(res).code

       Swal.close();

      if (code === 201) {
        Swal.fire("Success", "Add data Successful", "success");
        navigate("/main/admin");
      } else {
        Swal.fire("Error", `${json.error}`, "error");
        category = ""
      }


    } catch(err) {
      Swal.fire("Error", `${err}`, "error");
      console.log(err)
    }
  }


  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar />
      <div className="section">
        <div className="add-container">
          <div className="add-text">
            <h1>Add Category</h1>
            <p>Add the category to support the product</p>
          </div>
          <div className="add-btn">
            <button className="btn-discard">Discard Changes</button>
            <button className="btn-add" onClick={handleSendData}>Add Category</button>
          </div>
        </div>

        <div className="data-container">
          <h1>General Information</h1>
          <p>Product Name</p>
          <input type="text" 
          placeholder="Enter your category"
          onChange={(x) => setCategory(x.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
