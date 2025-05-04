import React from "react";
import Navbar from "../../../components/NavBar/Navbar";
import "./Catalog.css";
import Search from "../../../assets/images/serch.png";
import { useEffect, useState } from "react";
import HttpHandler from "../../../data/HttpHandler";
import star from "../../../assets/images/star.png";

const Catalog = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [products, useProducts] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      const res = await HttpHandler.request("categories", "GET");
      const code = JSON.parse(res).code;
      const body = JSON.parse(res).body;

      if (code === 200) {
        const data = JSON.parse(body);
        setCategories(data);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fecthProducts = async () => {
    try {
      const url = await HttpHandler.request("products", "GET");
      const code = JSON.parse(url).code;
      const body = JSON.parse(url).body;

      if (code === 200) {
        const data = JSON.parse(body);
        useProducts(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fecthProducts();
  }, []);

  return (
    <div className="section-catalog">
      <h1>Catalog Products</h1>
      <div className="filter-container">
        <div className="login-input-wrapper">
          <img src={Search} alt="user" className="login-input-icon" />
          <input type="text" placeholder="Search Product..." 
          value={search}
          onChange={(x) => setSearch(x.target.value)}/>
        </div>
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="product-container">
        {products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()) && (selectedCategoryId === "" || product.category.id === Number(selectedCategoryId)))
        .map((product, index) => (
          <div className="product-item" key={index}>
            <img src={product.image_url} alt="" />
            <div className="product-item-text">
              <p>{product.category.name}</p>
              <h1>{product.name}</h1>
              <div className="product-item-text-rating">
                <img src={star} alt="" />
                <h2>(10 Review)</h2>
              </div>
              <h3>Rp. {product.price.toLocaleString("id-ID")}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
