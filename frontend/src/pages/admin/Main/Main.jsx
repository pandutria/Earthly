import React from "react";
import SideBar from "../../../components/SideBar/SideBar";
import "./Main.css"
import ctg from "../../../assets/images/categoryd.png"
import products from "../../../assets/images/productd.png"
import trx from "../../../assets/images/transactiond.png"
import reviews from "../../../assets/images/reviewd.png"
import { useState, useEffect } from "react";
import TransactionChart from "../../../components/TransactionChart/TransactionChart"; // Sesuaikan path jika perlu
import HttpHandler from "../../../data/HttpHandler"

const Main = () => {
  const [product, setProduct] = useState(null)
  const [category, setcategory] = useState(null)
  const [transaction, setTransaction] = useState(null)
  const [review, setReview] = useState(null)
  const [transactionData, setTransactionData] = useState([]);

  const handleProduct = async() => {
    try {
      const url = await HttpHandler.request("products", "GET")
      const code = JSON.parse(url).code
      const body = JSON.parse(url).body

      if (code === 200) {
        const data = JSON.parse(body)
        setProduct(data.length)
      }
    } catch (err) {

    }
  }

   const handleCategory = async() => {
    try {
      const url = await HttpHandler.request("categories", "GET")
      const code = JSON.parse(url).code
      const body = JSON.parse(url).body

      if (code === 200) {
        const data = JSON.parse(body)
        setcategory(data.length)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleTh = async() => {
    try {
      const url = await HttpHandler.request("publicTh", "GET")
      const code = JSON.parse(url).code
      const body = JSON.parse(url).body

      if (code === 200) {
        const data = JSON.parse(body)
        setTransaction(data.length)
         setTransactionData(data);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleReview = async() => {
    try {
      const url = await HttpHandler.request("publicReview", "GET")
      const code = JSON.parse(url).code
      const body = JSON.parse(url).body

      if (code === 200) {
        const data = JSON.parse(body)
        setReview(data.length)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleProduct()
    handleCategory()
    handleTh()
    handleReview()
  }, []);
  
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar />
      <div className="dashboard-section">
        <h1>Dashboard</h1>
        <div className="dashboard-container">
          <div className="dashboard-item">
            <div className="dashboard-item-title">
              <h2>Category</h2>
              <img src={ctg} alt="" />
            </div>
            <h3>{category}</h3>
            <h2>Total Category</h2>
          </div>
          <div className="dashboard-item">
            <div className="dashboard-item-title">
              <h2>Product</h2>
              <img src={products} alt="" />
            </div>
            <h3>{product}</h3>
            <h2>Total Product</h2>
          </div>
          <div className="dashboard-item">
            <div className="dashboard-item-title">
              <h2>Transaction</h2>
              <img src={trx} alt="" />
            </div>
            <h3>{transaction}</h3>
            <h2>Total Transaction</h2>
          </div>
          <div className="dashboard-item">
            <div className="dashboard-item-title">
              <h2>Review</h2>
              <img src={reviews} alt="" />
            </div>
            <h3>{review}</h3>
            <h2>Total Review</h2>
          </div>
        </div>
        {transactionData && <TransactionChart data={transactionData} />}
      </div>
      
    </div>
  );
};

export default Main;
