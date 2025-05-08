const CartManager = {
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),

  addToCart(item) {
    // Cek apakah item sudah ada di cart
    const index = this.cart.findIndex(p => p.product_id === item.product_id);
    if (index !== -1) {
      this.cart[index].qty += item.qty;
    } else {
      this.cart.push(item);
    }
    this.saveCart();
  },

  getCart() {
    return this.cart;
  },

  updateQty(product_id, qty) {
    const index = this.cart.findIndex(p => p.product_id === product_id);
    if (index !== -1) {
      this.cart[index].qty = qty;
      this.saveCart();
    }
  },

  removeItem(product_id) {
    this.cart = this.cart.filter(item => item.product_id !== product_id);
    this.saveCart();
  },
  

  clearCart() {
    this.cart = [];
    this.saveCart();
  },

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
};

export default CartManager;
