import { formatCurrency } from './utils/money.js';
import { addOrder } from './data/orders.js';

document.addEventListener('DOMContentLoaded', () => {
  // Get cart data from localStorage
  const cartData = JSON.parse(localStorage.getItem('cartData'));
  if (!cartData) {
    window.location.href = 'checkout.html';
    return;
  }

  // Display order summary
  const summaryDetailsElement = document.querySelector('.js-summary-details');
  const totalAmountElement = document.querySelector('.js-total-amount');

  let summaryHTML = `
    <div class="summary-row">
      <span>Items (${cartData.cartQuantity}):</span>
      <span>$${formatCurrency(cartData.productPriceCents)}</span>
    </div>
    <div class="summary-row">
      <span>Shipping & handling:</span>
      <span>$${formatCurrency(cartData.shippingPriceCents)}</span>
    </div>
    <div class="summary-row">
      <span>Total before tax:</span>
      <span>$${formatCurrency(cartData.totalBeforeTaxCents)}</span>
    </div>
    <div class="summary-row">
      <span>Estimated tax (10%):</span>
      <span>$${formatCurrency(cartData.taxCents)}</span>
    </div>
  `;

  summaryDetailsElement.innerHTML = summaryHTML;
  totalAmountElement.textContent = `$${formatCurrency(cartData.totalCents)}`;

  // Handle payment form submission
  const paymentForm = document.querySelector('.js-payment-form');
  paymentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      // Create order
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cartData.cart,
          totalCents: cartData.totalCents
        })
      });

      const order = await response.json();
      addOrder(order);

      // Clear cart data from localStorage
      localStorage.removeItem('cartData');

      // Redirect to orders page
      window.location.href = 'orders.html';
    } catch (error) {
      console.log('Payment failed. Please try again later.');
      alert('Payment failed. Please try again later.');
    }
  });
});
