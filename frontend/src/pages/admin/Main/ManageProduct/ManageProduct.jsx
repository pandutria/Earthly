import React, { useTransition } from "react";
import SideBar from "../../../../components/SideBar/SideBar";
import { useState, useEffect } from "react";
import "./ManageProduct.css";

const ManageProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, serPrice] = useState(0);
  const [weight, setWeight] = useState("");
  const [tags, setTags] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [materials, setMaterials] = useState("");
  const [image_url, setImage] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar />
      <div className="section">
        <div className="add-container">
          <div className="add-text">
            <h1>Add Product</h1>
            <p>Add the product to support the customer</p>
          </div>
          <div className="add-btn">
            <button className="btn-discard">Discard Changes</button>
            <button className="btn-add">Add Category</button>
          </div>
        </div>

        <div className="input-data-container">
          <div className="input-container">
            <div className="data-container" style={{height: '250px'}}>
              <h1>General Information</h1>
              <p>Product Name</p>
              <input type="text" placeholder="Enter your product" />
              <p style={{ marginTop: "10px"}}> Description</p>
              <input type="text" placeholder="Enter your descirption" />
            </div>
            <div className="data-container" >
              <h1>Category</h1>
              <p>Category Name</p>
              <input type="dropdown" placeholder="Enter your product" />
             
            </div>
          </div>

          <div className="input-container">
            <div className="data-container" style={{height: '250px'}}>
              <h1>Product</h1>
              <p>Photo Product</p>
              <input type="text" placeholder="Enter your descirption" />
            </div>
            <div className="data-container"style={{height: '200px'}} >
              <h1>Price</h1>
              <p>Base Price</p>
              <input type="dropdown" placeholder="Rp" />
              <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
              <input style={{width: '185px'}} type="dropdown" placeholder="Rp" />
              <input style={{width: '185px'}} type="dropdown" placeholder="Rp" />
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
