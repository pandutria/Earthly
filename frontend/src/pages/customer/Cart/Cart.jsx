import React from 'react'
import "./Cart.css"

const Cart = () => {
  return (
    <div className='cart-section'>
      <h1>Your Cart</h1>
      <div className='cart-header'>
        <h1 style={{width: '300px'}}>PRODUCT</h1>
        <h1>PRICE</h1>
        <h1>QUANTITY</h1>
        <h1>TOTAL</h1>
      </div>
      <hr />
    </div>
  )
}

export default Cart
