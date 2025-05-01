import React from "react";
import Navbar from "../../../components/NavBar/Navbar";
import "./ManageCategory.css";
import SideBar from "../../../components/SideBar/SideBar";
import { useState, useEffect } from "react";
import HttpHandler from "../../../data/HttpHandler";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DataStorage from "../../../helper/DataStorage";

const ManageCategory = () => {
  const [category, setCategory] = useState("")
  const navigate = useNavigate()

  const navToMain = () => {
    navigate("/main/admin/category")
  }

  const handleData = () => {
    if (DataStorage.mode === "add") handleSendData()
    else handleUpdateData(DataStorage.categories_id)
  }

  useEffect(() => {
    if (DataStorage.mode === "update") {
      fetchCategories()
    }
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await HttpHandler.request(`categories/${DataStorage.categories_id}`, "GET")
      const code = JSON.parse(res).code
      const body = JSON.parse(res).body

      if (code === 200) {
        const json = JSON.parse(body)
        console.log(code)
        console.log(json.name)
        setCategory(json.name)
      }
    } catch(err) {
      Swal.fire("Error", `${err}`, "error");
      console.log(err)
    }
  }

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
        navigate("/main/admin/category");
      } else {
        Swal.fire("Error", `${json.error}`, "error");
      }


    } catch(err) {
      Swal.fire("Error", `${err}`, "error");
      console.log(err)
    }
  }

  const handleUpdateData = async (id) => {
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

      const res = await HttpHandler.request(`categories/${id}`, "PUT", null, rBody)
      const code = JSON.parse(res).code

      if (code === 200) {
        Swal.fire("Success", "Update data Successful", "success");
        navigate("/main/admin/category");
      }
    } catch (err) {
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
            <button className="btn-discard" onClick={navToMain}>Discard Changes</button>
            <button className="btn-add" onClick={handleData}>Add Category</button>
          </div>
        </div>

        <div className="data-container">
          <h1>General Information</h1>
          <p>Category Name</p>
          <input type="text" 
          placeholder="Enter your category"
          value={category}
          onChange={(x) => setCategory(x.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
