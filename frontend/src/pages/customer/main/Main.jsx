import React from "react";
import Navbar from "../../../components/NavBar/Navbar";
import "./Main.css";
import homeImage from "../../../assets/images/hone.png";
import home1 from "../../../assets/images/home1.png";
import home2 from "../../../assets/images/home2.png";
import home3 from "../../../assets/images/home3.png";
import garis from "../../../assets/images/garis.png";
import afterHome from "../../../assets/images/afterhome.png";
import wonder1 from "../../../assets/images/wonder1.png";
import wonder2 from "../../../assets/images/wonder2.png";
import wonder3 from "../../../assets/images/wonder3.png";
import wonder4 from "../../../assets/images/wonder4.png";
import wonder5 from "../../../assets/images/wonder5.png";
import after1 from "../../../assets/images/after1.png";
import after2 from "../../../assets/images/after2.png";
import star from "../../../assets/images/star.png";
import test from "../../../assets/images/test.png";
import { useNavigate } from "react-router-dom";
import DataStorage from "../../../helper/DataStorage";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import HttpHandler from "../../../data/HttpHandler";
import { useEffect } from "react";

const Main = () => {
  const navigate = useNavigate();
  const [products, useProducts] = useState([]);

  // if (DataStorage.getToken() === "") {
  //   return <Navigate to="/logi n" replace />;
  // }

  const navigateToCatalog = () => {
    navigate("/main/customer/catalog");
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
    <div className="">
      <Navbar />
      <div className="home-section">
        <div className="home-top">
          <img src={homeImage} alt="" />
          <div className="home-right">
            <h1>Earthly</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.{" "}
            </p>
            <a href="">Explore product</a>
          </div>
        </div>
        <div className="home-bottom">
          <div className="home-bottom-container">
            <img src={home1} alt="" />
            <p>Lorem Ipsum dolor sit amet</p>
          </div>
          <img src={garis} alt="" />
          <div className="home-bottom-container">
            <img src={home2} alt="" />
            <p>Lorem Ipsum dolor sit amet</p>
          </div>
          <img src={garis} alt="" />
          <div className="home-bottom-container">
            <img src={home3} alt="" />
            <p>Lorem Ipsum dolor sit amet</p>
          </div>
        </div>
      </div>

      <div className="after-home-section">
        <div className="after-home-text">
          <h1>Lorem Ipsum</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.{" "}
          </p>
        </div>
        <img src={afterHome} alt="" />
      </div>

      <div className="wonder-section">
        <h1>From Waste to Wonder</h1>
        <div className="wonder-item-container">
          <div className="wonder-item">
            <img src={wonder1} alt="" />
            <div className="wonder-item-text">
              <h1>Recycled Plastic</h1>
              <p>
                Collected from household waste and crafted into durable bags and
                accessories.
              </p>
            </div>
          </div>
          <div className="wonder-item">
            <img src={wonder2} alt="" style={{ top: "-90px" }} />
            <div className="wonder-item-text">
              <h1>Reclaimed Wood</h1>
              <p>
                Salvaged from old buildings to create rustic, sustainable
                furniture.
              </p>
            </div>
          </div>
          <div className="wonder-item">
            <img src={wonder5} alt="" style={{ top: "-50px" }} />
            <div className="wonder-item-text">
              <h1>Recycled Fabric</h1>
              <p>
                Leftover fabrics from the fashion industry transformed into
                stylish totes and pouches.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="product-section">
        <h1>Featured Product</h1>
        <div className="product-container">
          {products.slice(0, 8).map((product, index) => (
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
        <button onClick={navigateToCatalog}>View All</button>
      </div>

          <div className="after-product-section">
            <img src={after1} alt="" />
            <img src={after2} alt="" />
          </div>

    </div>
  );
};

export default Main;
