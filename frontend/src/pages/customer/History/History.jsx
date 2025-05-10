import React from "react";
import "./History.css";
import { useState, useEffect } from "react";
import HttpHandler from "../../../data/HttpHandler";
import DataStorage from "../../../helper/DataStorage";
import wonder1 from "../../../assets/images/wonder1.png";
import Eye from "../../../assets/images/eye.png";
import Qty from "../../../assets/images/cartQty.png";
import Pay from "../../../assets/images/pay.png";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [header, setHeader] = useState([]);
  const navigate = useNavigate()

  const navigateToDetailProduct = (id) => {
    navigate(`/main/customer/product/${id}`)
  }

  const handleHeader = async () => {
    try {
      const url = await HttpHandler.request(
        "th",
        "GET",
        "30|04vhca5YsNEmZEsnnhHwnNZG5BcD3IfwNKCY7qD2ffe5475f"
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
    try {
      const url = await HttpHandler.request(
        `td?transactionHeader=${headerId}`,
        "GET"
      );
      const code = JSON.parse(url).code;
      const body = JSON.parse(url).body;

      if (code === 200) {
        const detailData = JSON.parse(body);

        setHeader((prevHeader) => {
          const newHeader = [...prevHeader];
          newHeader[index].details = detailData; // tambahkan data detail ke header tertentu
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
            item.details.map((detail, i) => (
              <div className="item-history-detail" key={i}>
                <img src={detail.product.image_url} alt={detail.product.name} />
                <div className="item-history-detail-text-container">
                  <div className="item-history-detail-text">
                    <h2>{detail.product.name}</h2>
                    <p>{detail.product.description}</p>
                    <div className="vertical">
                      <div className="view" style={{cursor: 'pointer'}} onClick={() => navigateToDetailProduct(detail.product.id)}>
                        <img src={Eye} alt="" />
                        <p style={{ color: "#67AE6E" }}>View Product</p>
                      </div>
                      <div className="view">
                        <img src={Qty} alt="" />
                        <p style={{ color: "#67AE6E" }}>{detail.qty} Unit</p>
                      </div>
                      <div className="view">
                        <img src={Pay} alt="" />
                        <p style={{ color: "#67AE6E" }}>
                          {formatPrice(detail.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button>Add Review</button>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default History;
