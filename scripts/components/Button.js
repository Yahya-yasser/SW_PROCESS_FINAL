export function renderButton({ text, className = '', onClick, type = 'button', icon = null }) {
  const buttonHTML = `
    <button class="${className}" type="${type}">
      ${icon ? `<img src="${icon}" alt="icon">` : ''}
      ${text}
    </button>
  `;
  return buttonHTML;
}

export function renderAddToCartButton(productId) {
  return `
    <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${productId}">
      Add to Cart
    </button>
  `;
} 