import React from "react";
import "./DetailProduct.css";
import image1 from "../../../assets/images/1.png";
import star1 from "../../../assets/images/star1.png";
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
    </div>
  );
};

export default DetailProduct;
