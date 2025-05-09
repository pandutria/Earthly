import React, { useState, useEffect } from "react";
import "./Cart.css";
import CartManager from "../../../data/CartManager";
import Location from "../../../assets/images/location.png";
import HttpHandler from "../../../data/HttpHandler";
import DataStorage from "../../../helper/DataStorage";
import Swal from "sweetalert2";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [headerId, setHeaderId] = useState(0);

  useEffect(() => {
    setCart(CartManager.getCart());
  }, []);

  const handlePlusQty = (product_id) => {
    const item = cart.find((item) => item.product_id === product_id);
    CartManager.updateQty(product_id, item.qty + 1);
    setCart(CartManager.getCart());
  };

  const handleMinusQty = (product_id) => {
    const item = cart.find((item) => item.product_id === product_id);
    if (item.qty === 1) {
      CartManager.removeItem(product_id);
    } else {
      CartManager.updateQty(product_id, item.qty - 1);
    }
    setCart(CartManager.getCart());
  };

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);

  const handlePostHeader = async () => {
    Swal.fire({
      title: "Processing Order...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const json = {
        address: address,
        total_price: subtotal,
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
      };

      const url = await HttpHandler.request(
        "th",
        "POST",
        "32|nOdUNT5ZXuCtkwyvV6f0OM1KQmuS6dK8vs8QCdSF8f8142f2",
        json
      );

      const code = JSON.parse(url).code;
      const body = JSON.parse(url).body;

      Swal.close();

      if (code === 201) {
        const data = JSON.parse(body);
        setHeaderId(data.id);
        await handlePostDetail(data.id);

        // === CALL MIDTRANS SNAP ===
        window.snap.pay(data.snap_token, {
          onSuccess: function (result) {
            Swal.fire(
              "Payment Success!",
              "Transaction ID: " + result.transaction_id,
              "success"
            );
          },
          onPending: function (result) {
            Swal.fire("Pending", "Transaction is pending", "info");
          },
          onError: function (result) {
            Swal.fire("Failed", "Payment Failed", "error");
          },
          onClose: function () {
            Swal.fire("Cancelled", "You closed the payment popup", "warning");
          },
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", `${err}`, "error");
    }
  };

  const handlePostDetail = async (headerId) => {
    try {
      for (let i = 0; i < cart.length; i++) {
        const json = {
          product_id: cart[i].product_id,
          header_id: headerId,
          qty: cart[i].qty,
          price: cart[i].price,
        };

        const url = await HttpHandler.request("td", "POST", null, json);
        const code = JSON.parse(url).code;

        if (code !== 201) {
          console.error("Failed to post detail:", json);
        }
      }
      CartManager.clearCart();
      setCart([]);
    } catch (err) {
      console.log(err);
    }
  };

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
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column" }}
            >
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
              <h2 onChange={(x) => setTotal(x.target.value)}>
                Rp. {subtotal.toLocaleString("id-ID")}
              </h2>
            </div>
          </div>
          <div className="login-input-wrapper">
            <img src={Location} alt="user" className="login-input-icon" />
            <input
              type="text"
              placeholder="Write your address"
              value={address}
              onChange={(x) => setAddress(x.target.value)}
            />
          </div>
          <button onClick={handlePostHeader}>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
