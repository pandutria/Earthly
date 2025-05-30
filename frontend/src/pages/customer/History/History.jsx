import React from "react";
import "./History.css";
import { useState, useEffect } from "react";
import HttpHandler from "../../../data/HttpHandler";
import DataStorage from "../../../helper/DataStorage";
import wonder1 from "../../../assets/images/wonder1.png";
import Eye from "../../../assets/images/eye.png";
import Qty from "../../../assets/images/cartQty.png";
import Pay from "../../../assets/images/pay.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ReviewPopup from "../../../components/Review/ReviewPopup.jsx";

const History = () => {
  const [header, setHeader] = useState([]);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigateToDetailProduct = (id) => {
    navigate(`/main/customer/product/${id}`);
  };

  const handleHeader = async () => {
    try {
      const url = await HttpHandler.request(
        "th",
        "GET",
        `${DataStorage.getToken()}`
      );
      const code = JSON.parse(url).code;
      const body = JSON.parse(url).body;

      if (code === 200) {
        const data = JSON.parse(body);
        setHeader(data);
        data.forEach((item, index) => {
          handleDetail(item.id, index);
        });
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleHeader();
  }, []);

  const handleDetail = async (headerId, index) => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const url = await HttpHandler.request(
        `td?transactionHeader=${headerId}`,
        "GET"
      );

      const code = JSON.parse(url).code;
      const body = JSON.parse(url).body;

      Swal.close();

      if (code === 200) {
        const detailData = JSON.parse(body);

        setHeader((prevHeader) => {
          const newHeader = [...prevHeader];
          newHeader[index].details = detailData;
          return newHeader;
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Helper untuk format harga
  const formatPrice = (number) => {
    return "Rp. " + number.toLocaleString("id-ID") + ",00";
  };

  const handleSubmitReview = async (reviewText) => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const json = {
        review: reviewText,
        product_id: selectedProduct.id,
        date: "2023-05-15",
      };
      const url = await HttpHandler.request(
        "review",
        "POST",
        `${DataStorage.getToken()}`,
        json
      );
      const code = JSON.parse(url).code;

      Swal.close();

      // console.log(code)

      if (code === 201) {
        // alert("berhasil")
        Swal.fire("Success", "Create review", "success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="section-history">
      <h1 className="h1">Your Orders</h1>
      {header.map((item, index) => (
        <div className="item-history" key={index}>
          <div className="item-history-header">
            <div className="item-history-header-text">
              <h2 style={{ color: "#828282" }}>Order Date:</h2>
              <p>{formatDate(item.date)}</p>
            </div>
            <div className="item-history-header-text">
              <h2 style={{ color: "#828282" }}>Total Amount:</h2>
              <p>{formatPrice(item.total_price)}</p>
            </div>
            <div className="item-history-header-text">
              <h2 style={{ color: "#828282" }}>Ship To:</h2>
              <p
                style={{
                  maxWidth: "200px",
                  width: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={item.address}
              >
                {item.address}
              </p>
            </div>
            <div className="item-history-header-text">
              <h2 style={{ color: "#828282" }}>Order:</h2>
              <p>#{item.id}00000</p>
            </div>
          </div>
          <hr />

          {item.details &&
            item.details.map(
              (detail, i) =>
                detail.product ? (
                  <div className="item-history-detail" key={i}>
                    <img
                      src={detail.product.image_url}
                      alt={detail.product.name}
                    />
                    <div className="item-history-detail-text-container">
                      <div className="item-history-detail-text">
                        <h2>{detail.product.name}</h2>
                        <p>{detail.product.description}</p>
                        <div className="vertical">
                          <div
                            className="view"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigateToDetailProduct(detail.product.id)
                            }
                          >
                            <img src={Eye} alt="" />
                            <p style={{ color: "#67AE6E" }}>View Product</p>
                          </div>
                          <div className="view">
                            <img src={Qty} alt="" />
                            <p style={{ color: "#67AE6E" }}>
                              {detail.qty} Unit
                            </p>
                          </div>
                          <div className="view">
                            <img src={Pay} alt="" />
                            <p style={{ color: "#67AE6E" }}>
                              {formatPrice(detail.price)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedProduct(detail.product);
                          setShowPopup(true);
                        }}
                      >
                        Add Review
                      </button>
                    </div>
                  </div>
                ) : null // tidak render jika product null
            )}
        </div>
      ))}
      {showPopup && selectedProduct && (
        <ReviewPopup
          product={selectedProduct}
          onClose={() => setShowPopup(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
};

export default History;
