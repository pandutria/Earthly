import React from "react";
import "./DetailProduct.css";
import image1 from "../../../assets/images/1.png";
import e from "../../../assets/images/e.png";
import star1 from "../../../assets/images/star1.png";
import circle from "../../../assets/images/circle.png";
import checklist from "../../../assets/images/checklist.png";
import spec from "../../../assets/images/spec.png";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import HttpHandler from "../../../data/HttpHandler";
import CartManager from "../../../data/CartManager";
import star from "../../../assets/images/star.png";
import Swal from "sweetalert2";

const DetailProduct = () => {
  const params = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [products, useProducts] = useState([]);
  const navigate = useNavigate()
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fecthProduct();
    fecthProducts();
    fetchReviews()
  }, [params.id]);

  const fecthProduct = async () => {

    Swal.fire({
              title: 'Loading',
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              }
            });

    try {
      const url = await HttpHandler.request(`products/${params.id}`, "GET");
      const code = JSON.parse(url).code;
      const body = JSON.parse(url).body;

      if (code === 200) {
        const data = JSON.parse(body);
        setName(data.name);
        setPrice(data.price);
        setDesc(data.description);
        setImage(data.image_url);
        setCategory(data.category.name);
        Swal.close()
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReviews = async () => {
  try {
    const url = await HttpHandler.request("publicReview", "GET");
    const code = JSON.parse(url).code;
    const body = JSON.parse(url).body;

    if (code === 200) {
      const data = JSON.parse(body);
      setReviews(data);
    }
  } catch (err) {
    console.log(err);
  }
};

  // const handleHeader = async () => {
  //   try {
  //     const url = await HttpHandler.request('')
  //   }
  // }

  const handleToCart = () => {
    Swal.fire({
              title: 'Loading',
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              }
            });
    CartManager.addToCart({
      product_id: params.id,
      name: name,
      category: category,
      price: parseInt(price),
      image: image,
      qty: 1,
    });
    Swal.close()

    console.log(CartManager.getCart());
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

   const navigateToDetail = (id) => {
      navigate(`/main/customer/product/${id}`)
      fecthProduct()
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
          <p>{desc}</p>
          <hr />
          <div className="detail-button">
            <button>Buy Now</button>
            <button className="btn-add" onClick={handleToCart}>
              Add to Cart
            </button>
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
            <h5>Earthly</h5>
            <h6>Jakarta Timur</h6>
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
        <div className="spec-vertical" style={{ gap: "15px" }}>
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
          <div style={{ marginTop: "-10px" }}>
            <p>-Direct sunlight exposure</p>
            <p>-Direct sunlight exposure</p>
            <p>-Compatible with 5V–20V devices</p>
            <p>-Optional power storage bank</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="review-product-section">
  <h3>Review List</h3>
  <div className="review-product-container">
    {reviews.map((review, index) => (
      <div className="review-product-item" key={index}>
        <img src={star} alt="" />
        <h2>{review.review}</h2>
        <h3>{new Date(review.date).toLocaleString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}</h3>
        <div className="review-product-image">
          <img src={circle} alt="" />
          <p>{review.user.fullname}</p>
        </div>
        <hr />
      </div>
    ))}
  </div>
</div>


      <div className="product-section">
        <h3 style={{marginLeft: '7px'}}>Related Product</h3>
        <div className="product-container">
          {products.map((product, index) => (
            <div
              className="product-item"
              key={index}
              onClick={() => navigateToDetail(product.id)}
            >
              <img src={product.image_url} alt="" />
              <div className="product-item-text">
                <p>{product.category.name}</p>
                <h1>{product.name}</h1>
                <div className="product-item-text-rating">
                  <img src={star} alt="" />
                  <h2>(10 Review)</h2>
                </div>
                <h3>Rp. {product.price.toLocaleString("id-ID")},00</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
