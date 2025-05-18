export function renderAmazonHeader(options = {}) {
  // Default options
  const defaults = {
    showSearch: true,
    showUserInfo: true
  };

  // Merge provided options with defaults
  const settings = { ...defaults, ...options };

  return `
  <div class="amazon-header">
    <div class="header-left-section">
      <a href="amazon.html" class="shop-logo">
        ZO<span>SHOP</span>
      </a>
      <a href="amazon.html" class="mobile-logo">
        ZO<span>S</span>
      </a>
    </div>

    <div class="amazon-header-middle-section">
      ${settings.showSearch ? `
      <input class="search-bar js-search-bar" type="text" placeholder="Search">

      <button class="search-button js-search-button">
        <img class="search-icon" src="images/icons/search-icon.png">
      </button>
      ` : '<!-- Search bar hidden -->'}
    </div>

    <div class="amazon-header-right-section">
      ${settings.showUserInfo ? `
      <div class="user-info js-user-info">
        <span class="welcome-text">Hello, <span class="js-user-name">Guest</span></span>
        <button class="auth-button js-auth-button">Sign In</button>
      </div>
      ` : ''}

      <a class="orders-link header-link" href="orders.html">
        <span class="returns-text">Returns</span>
        <span class="orders-text">& Orders</span>
      </a>

      <a class="cart-link header-link" href="checkout.html">
        <img class="cart-icon" src="images/icons/cart-icon.png">
        <div class="cart-quantity js-cart-quantity">0</div>
        <div class="cart-text">Cart</div>
      </a>
    </div>
  </div>
  `;
} 