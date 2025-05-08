import React from 'react'
import "./Cart.css"
import Img from "../../../assets/images/wonder1.png"

const Cart = () => {
  return (
    <div className='cart-section'>
      <h1>Your Cart</h1>
      <div className='cart-header'>
        <h1 style={{width: '320px'}}>PRODUCT</h1>
        <h1>PRICE</h1>
        <h1>QUANTITY</h1>
        <h1>TOTAL</h1>
      </div>
      <hr />
      <div className='cart-item'>
        <img src={Img} alt="" />
        <div className='cart-text'>
            <h3>Smart Solar Panel</h3>
            <p>Smart Solar Panel</p>
        </div>
        <h1>Rp. 500.000</h1>
        <div className='qty'>
            <h2>-</h2>
            <h1>1</h1>
            <h2>+</h2>
        </div>
        <h1>Rp. 500.000</h1>
      </div>
      <hr />
    </div>
  )
}

export default Cart
