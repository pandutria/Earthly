import React from "react";
import Navbar from "../../../components/NavBar/Navbar";
import "./Main.css";
// import home from "../../../assets/images/home.png"
import homeImage from "../../../assets/images/hone.png";
import home1 from "../../../assets/images/home1.png";
import home2 from "../../../assets/images/home2.png";
import home3 from "../../../assets/images/home3.png";
import garis from "../../../assets/images/garis.png"

const Main = () => {
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
    </div>
  );
};

export default Main;
