import React from "react";
import Navbar from "../../../components/NavBar/Navbar";
import "./Main.css";
// import home from "../../../assets/images/home.png"
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

      <div className="after-home-section">
        <div className="after-home-text">
          <h1>Lorem Ipsum</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
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
              <p>Collected from household waste and crafted into durable bags and accessories.</p>
            </div>
          </div>
          <div className="wonder-item">
            <img src={wonder2} alt="" style={{top: '-90px'}}/>
            <div className="wonder-item-text">
              <h1>Reclaimed Wood</h1>
              <p>Salvaged from old buildings to create rustic, sustainable furniture.</p>
            </div>
          </div>
          <div className="wonder-item">
            <img src={wonder5} alt="" style={{top: '-50px'}} />
            <div className="wonder-item-text">
              <h1>Recycled Fabric</h1>
              <p>Leftover fabrics from the fashion industry transformed into stylish totes and pouches.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Main;
