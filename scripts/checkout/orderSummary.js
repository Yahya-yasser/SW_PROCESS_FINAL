import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);

    if (!product) {
      return;
    }

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container
        js-cart-item-container-${product.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${product.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-price">
              $${formatCurrency(product.priceCents)}
            </div>
            <div class="product-quantity
              js-product-quantity-${product.id}">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="delete-quantity-link link-primary js-delete-link"
                data-product-id="${product.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(product.id, cartItem.deliveryOptionId)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  // Update cart quantity in header
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.return-to-home-link').textContent = `${cartQuantity} items`;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();

        renderPaymentSummary();

        // Update cart quantity after deletion
        const newCartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.return-to-home-link').textContent = `${newCartQuantity} items`;
      });
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}

function deliveryOptionsHTML(productId, selectedDeliveryOptionId) {
  return deliveryOptions.map(option => {
    const priceString = option.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(option.priceCents)} -`;

    const isChecked = option.id === selectedDeliveryOptionId;

    return `
      <div class="delivery-option js-delivery-option"
        data-product-id="${productId}"
        data-delivery-option-id="${option.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">
            ${dayjs().add(option.deliveryDays, 'days').format('dddd, MMMM D')}
          </div>
          <div class="delivery-option-price">
            ${priceString} ${option.label}
          </div>
        </div>
      </div>
    `;
  }).join('');
}