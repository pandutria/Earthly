import React from "react";
import "./DetailProduct.css";
import image1 from "../../../assets/images/1.png";
import e from "../../../assets/images/e.png";
import star1 from "../../../assets/images/star1.png";
import checklist from "../../../assets/images/checklist.png";
import spec from "../../../assets/images/spec.png";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import HttpHandler from "../../../data/HttpHandler";

const DetailProduct = () => {
  const params = useParams();
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")

  useEffect(() => {
    fecthProduct()
  }, [])

  const fecthProduct = async () => {
    try {
      const url = await HttpHandler.request(`products/${params.id}`, "GET")
      const code = JSON.parse(url).code
      const body = JSON.parse(url).body

      if (code === 200) {
          const data = JSON.parse(body)
          setName(data.name)
          setPrice(data.price)
          setDesc(data.description)
          setImage(data.image_url)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="detail-section">
      <div className="detail-container">
        <img src={image} alt="" />
        <div className="detail-text">
          <h1>{name}</h1>
          <div className="detail-rating">
            <img src={star1} alt="" />
            <p>4.6 (200 sold)</p>
          </div>
          <h2>Rp. {price.toLocaleString("id-ID")},00</h2>
          <p>
            {desc}
          </p>
          <hr />
          <div className="detail-button">
            <button>Buy Now</button>
            <button className="btn-add">Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="detail-image-container">
        <img src={image} alt="" />
        <img src={image} alt="" />
        <img src={image} alt="" />
      </div>
      <hr />
      <h4>Merchant Information</h4>
      <div className="merchant-container">
        <div className="horizontal">
          <img src={e} alt="" />
          <div className="vertical">
            <h1>Earthly</h1>
            <h2>Jakarta Timur</h2>
            <div className="horizontal-text">
              <p>Top Rated Merchant</p>
              <p>Best Merchant</p>
            </div>
          </div> 
        </div>
        <button>Chat Admin</button>
      </div>
      <hr />
      <div className="spec-container">
        <div className="spec-vertical">
          <h1>Specification</h1>
          <img src={spec} alt="" />
        </div>
        <div className="spec-vertical" style={{gap: '15px'}}>
          <h1>In The Box</h1>
          <div className="spec-horizontal">
            <img src={checklist} alt="" />
            <p>GreenCharge Solar Panel</p>
          </div>
          <div className="spec-horizontal">
            <img src={checklist} alt="" />
            <p>Adjustable Stand Frame</p>
          </div>
          <div className="spec-horizontal">
            <img src={checklist} alt="" />
            <p>USB-C Charging Cable</p>
          </div>
          <div className="spec-horizontal">
            <img src={checklist} alt="" />
            <p>Instruction Manual</p>
          </div>
          <div className="spec-horizontal">
            <img src={checklist} alt="" />
            <p>Carrying Case</p>
          </div>
        </div>
        <div className="spec-vertical">
          <h1>System Required</h1>
          <div style={{marginTop: '-10px'}}>
            <p>-Direct sunlight exposure</p>
            <p>-Direct sunlight exposure</p>
            <p>-Compatible with 5V–20V devices</p>
            <p>-Optional power storage bank</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
