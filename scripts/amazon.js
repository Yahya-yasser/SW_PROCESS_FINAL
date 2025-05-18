import { cart, addToCart } from '../data/cart.js';
import { products as rawProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { auth } from './utils/auth.js';
import { renderProductCard } from './components/ProductCard.js';
import { renderStickyHeader } from './components/StickyHeader.js';
import { renderFooter } from './components/footer.js';
import { renderAmazonHeader } from './components/amazon-header.js';
import { renderCategoryCard } from './components/CategoryCard.js';
import { convertToProductInstances, Product } from './utils/product-utils.js';

let categories = [];
let selectedCategory = '';
let searchQuery = '';
let products = [];

// Convert raw products to Product instances
function initializeProducts() {
  products = convertToProductInstances(rawProducts);
}

async function loadCategories() {
  const response = await fetch('data/categories.json');
  const data = await response.json();
  categories = data.categories;
  renderCategories();
}

function renderCategories() {
  const categoriesGrid = document.querySelector('.js-categories-grid');
  categoriesGrid.innerHTML = categories.map(category => renderCategoryCard(category)).join('');

  // Add click handlers for categories
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      selectedCategory = card.dataset.categoryId;
      renderProducts();
    });
  });
}

function getStarsUrl(rating) {
  // Round the rating to the nearest 0.5
  const roundedRating = Math.round(rating * 2) / 2;
  // Convert rating to a two-digit string with leading zero if needed
  const ratingString = (roundedRating * 10).toString().padStart(2, '0');
  return `/images/ratings/rating-${ratingString}.png`;
}

function renderProducts() {
  const productsGrid = document.querySelector('.js-products-grid');

  // Filter products based on both category and search query
  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product => {
      // Search in product name
      const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Search in keywords
      const keywordMatch = product.keywords.some(keyword =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return nameMatch || keywordMatch;
    });
  }

  renderProductsList(filteredProducts);
}

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

function updateAuthUI() {
  const userInfo = document.querySelector('.js-user-info');
  const userName = document.querySelector('.js-user-name');
  const authButton = document.querySelector('.js-auth-button');

  if (auth.isAuthenticated()) {
    const user = auth.getCurrentUser();
    userName.textContent = user.name;
    authButton.textContent = 'Sign Out';
    authButton.addEventListener('click', () => {
      auth.logout();
      window.location.reload();
    });
  } else {
    userName.textContent = 'Guest';
    authButton.textContent = 'Sign In';
    authButton.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
}

// Function to get random products
function getRandomProducts(count = 12) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to handle category clicks
function handleCategoryClick(category) {
  // Remove active class from all nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  // Add active class to clicked item
  event.target.classList.add('active');

  // Clear any existing search query
  searchQuery = '';
  document.querySelector('.js-search-bar').value = '';

  // Show random products based on category
  let filteredProducts;
  switch (category) {
    case 'all':
      filteredProducts = products;
      break;
    case 'best-sellers':
      // Get random products and increase their rating count
      filteredProducts = getRandomProducts().map(p => {
        const newProduct = new Product({ ...p });
        newProduct.rating = { ...p.rating, count: Math.floor(Math.random() * (10000 - 5000) + 5000) };
        return newProduct;
      });
      break;
    case 'flash-sales':
      // Get random products and apply 30% discount
      filteredProducts = getRandomProducts().map(p => {
        const newProduct = new Product({ ...p });
        newProduct.priceCents = Math.floor(p.priceCents * 0.7);
        return newProduct;
      });
      break;
    case 'todays-deals':
      // Get random products and apply 15% discount
      filteredProducts = getRandomProducts().map(p => {
        const newProduct = new Product({ ...p });
        newProduct.priceCents = Math.floor(p.priceCents * 0.85);
        return newProduct;
      });
      break;
    case 'new-releases':
      filteredProducts = getRandomProducts();
      break;
    default:
      filteredProducts = products;
  }

  renderProductsList(filteredProducts);
}

function renderProductsList(productsList) {
  const productsGrid = document.querySelector('.js-products-grid');
  productsGrid.innerHTML = productsList.map(product => renderProductCard(product)).join('');

  // Add event listeners for add to cart buttons
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();
      });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
  // Render sticky header
  document.querySelector('.js-sticky-header-container').innerHTML = renderStickyHeader();

  // Render Amazon header with full functionality
  document.querySelector('.js-amazon-header-container').innerHTML = renderAmazonHeader({
    showSearch: true,
    showUserInfo: true
  });

  // Render footer
  document.querySelector('.js-footer-container').innerHTML = renderFooter();

  initializeProducts();
  updateAuthUI();
  await loadCategories();

  // Add navigation menu functionality
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      const category = event.target.dataset.category;
      handleCategoryClick(category);
    });
  });

  // Add search functionality
  const searchBar = document.querySelector('.js-search-bar');
  const searchButton = document.querySelector('.js-search-button');

  // Search when user types (with debounce)
  let searchTimeout;
  searchBar.addEventListener('input', (event) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchQuery = event.target.value;
      renderProducts();
    }, 300); // Wait 300ms after user stops typing
  });

  // Search when search button is clicked
  searchButton.addEventListener('click', () => {
    searchQuery = searchBar.value;
    renderProducts();
  });

  // Search when Enter key is pressed
  searchBar.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      searchQuery = searchBar.value;
      renderProducts();
    }
  });

  // Initial render
  renderProducts();

  // Update cart quantity
  updateCartQuantity();
});