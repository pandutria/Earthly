import React from "react";
import "./Product.css";
import SideBar from "../../../../components/SideBar/SideBar";
import Search from "../../../../assets/images/serch.png";
import { useState } from "react";
import HttpHandler from "../../../../data/HttpHandler";
import { useEffect } from "react";
import Edit from "../../../../assets/images/edit.png";
import Delete from "../../../../assets/images/delete.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DataStorage from "../../../../helper/DataStorage";

const Product = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fecthProducts();
  }, []);

  const handle = (id) => {
      if (id == null) DataStorage.mode = "add";
      else {
        DataStorage.mode = "update";
        DataStorage.products_id = id;
      }
  
    // console.log("Navigating to manage product");
    navigate("/admin/manage/product");
  };

  const handleEdit = (id) => {
    navigate(`/admin/manage/product/${id}`);
  }

  const handleDelete = async (id) => {
    try {

      Swal.fire({
        title: "Loading",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await HttpHandler.request(`products/${id}`, "DELETE")
      const code = JSON.parse(res).code

      Swal.close()

      if (code === 204) {
        fecthProducts();
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      }
    } catch(err) {
      console.log(err)
    }
  }

  const fecthProducts = async () => {
    try {
    
      const res = await HttpHandler.request("products", "GET");
      // if (search != "") res = await HttpHandler.request(`products?search=${search}`)
      const code = JSON.parse(res).code;
      const body = JSON.parse(res).body;

      if (code === 200) {
        const data = JSON.parse(body);
        setProducts(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar/>
      <div className="container">
        <h1>Manage Product</h1>
        <p>{products.length} products available</p>
        <div className="filter-container">
          <div className="login-input-wrapper">
            <img alt="" src={Search} className="login-input-icon" />
            <input type="text" placeholder="Search Category" value={search} onChange={(x) => setSearch(x.target.value)} />
          </div>
          <div className="plus">
            <p className="link"  onClick={() => handle(null)}>
              <i className="bx bx-plus"></i>
              <p>Add New Products</p>
            </p>
          </div>
        </div>
        <div className="category-table-container">
          <table className="category-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Unit Price</th>
                <th>Total Review</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.filter((x) => x.name.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="container-product">
                      <img src={item.image_url} alt="" />
                      <div>
                        <h1>{item.name}</h1>
                        <p>PRO {item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td>{item.category.name}</td>
                  <td style={{textOverflow: 'ellipsis', maxWidth: '150px', overflow: 'hidden', whiteSpace: 'nowrap'}}>{item.description}</td>
                  <td>Rp {item.price.toLocaleString("id-ID")}</td>
                  <td>{item.total_reviews} Reviews</td>
                  <td>
                    <div className="btn-container">
                      <button className="edit-btn" onClick={() => handle(item.id)}>
                        <img src={Edit} alt="" />
                        <p>Edit</p>
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(item.id)}>
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

export default Product;
