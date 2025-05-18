export function saveOrder(orderData) {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(orderData);
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getCartItems() {
  const cartData = JSON.parse(localStorage.getItem('cartData'));
  return cartData ? cartData.cart : [];
}

export function calculateOrderTotal(cartItems) {
  console.log('Cart Items:', cartItems); // Debug log

  const subtotal = cartItems.reduce((total, item) => {
    console.log('Item:', item); // Debug log
    return total + item.quantity * item.priceCents;
  }, 0);

  console.log('Subtotal:', subtotal); // Debug log

  const tax = Math.round(subtotal * 0.1); // 10% tax
  const total = subtotal + tax;

  console.log('Final amounts:', { subtotal, tax, total }); // Debug log

  return {
    subtotal: subtotal,
    tax: tax,
    total: total
  };
} 