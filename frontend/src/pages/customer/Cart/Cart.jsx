import React, { useState, useEffect } from "react";
import "./Cart.css";
import CartManager from "../../../data/CartManager";
import Location from "../../../assets/images/location.png";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(CartManager.getCart());
  }, []);

  const handlePlusQty = (product_id) => {
    const item = cart.find(item => item.product_id === product_id);
    CartManager.updateQty(product_id, item.qty + 1);
    setCart(CartManager.getCart()); // Refresh data
  };

  const handleMinusQty = (product_id) => {
    const item = cart.find(item => item.product_id === product_id);
    if (item.qty === 1) {
      CartManager.removeItem(product_id);
    } else {
      CartManager.updateQty(product_id, item.qty - 1);
    }
    setCart(CartManager.getCart()); // Refresh data
  };

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);

  return (
    <div className="cart-section">
      <h1>Your Cart</h1>
      <div style={{ display: "flex", flexDirection: "row", gap: "60px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="cart-header">
            <h1 style={{ width: "320px" }}>PRODUCT</h1>
            <h1>PRICE</h1>
            <h1>QUANTITY</h1>
            <h1>TOTAL</h1>
          </div>
          <hr />

          {cart.map((item, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column" }}>
              <div className="cart-item">
                <img src={item.image} alt="" />
                <div className="cart-text">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                </div>
                <h1>Rp. {item.price.toLocaleString("id-ID")}</h1>
                <div className="qty">
                  <h2 onClick={() => handleMinusQty(item.product_id)}>-</h2>
                  <h1>{item.qty}</h1>
                  <h2 onClick={() => handlePlusQty(item.product_id)}>+</h2>
                </div>
                <h1>Rp. {(item.price * item.qty).toLocaleString("id-ID")}</h1>
              </div>
              <hr />
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-order">
            <h1>Order Summary</h1>
            <hr style={{ width: "300px" }} />
            <div className="cart-order-container">
              <div className="cart-order-text">
                <p>Subtotal</p>
                <p>Rp. {subtotal.toLocaleString("id-ID")}</p>
              </div>
              <div className="cart-order-text">
                <p>Shipping</p>
                <p>Rp. 0</p>
              </div>
            </div>
            <div className="cart-order-total">
              <h2>Total</h2>
              <h2>Rp. {subtotal.toLocaleString("id-ID")}</h2>
            </div>
          </div>
          <div className="login-input-wrapper">
            <img src={Location} alt="user" className="login-input-icon" />
            <input type="text" placeholder="Write your address" />
          </div>
          <button>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
