import React from "react";
import "./History.css";
import { useState, useEffect } from "react";
import HttpHandler from "../../../data/HttpHandler";
import DataStorage from "../../../helper/DataStorage";

const History = () => {
  const [header, setHeader] = useState([]);

  const handleHeader = async() => {
    try {
        const url = await HttpHandler.request("th", "GET", "30|04vhca5YsNEmZEsnnhHwnNZG5BcD3IfwNKCY7qD2ffe5475f") 
        const code = JSON.parse(url).code
        const body = JSON.parse(url).body

        if (code === 200) {
            const data = JSON.parse(body)
            setHeader(data)
        } else {
            
        }
    } catch (err) {
        console.log(err)
    }
  }

  
  useEffect(() => {
    handleHeader();
  }, []);

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
                  width: '200px',
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
        </div>
      ))}
    </div>
  );
};

export default History;
