const CartManager = {
    cart: [],
    addToCart(item) {
      this.cart.push(item);
    },
    getCart() {
      return this.cart;
    },
    clearCart() {
      this.cart = [];
    }
  };
  
  export default CartManager;
  