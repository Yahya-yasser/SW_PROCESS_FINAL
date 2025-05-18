import { renderFooter } from './components/footer.js';
import { renderAmazonHeader } from './components/amazon-header.js';

document.addEventListener('DOMContentLoaded', () => {
  // Render Amazon header with search and user info turned off
  document.querySelector('.js-amazon-header-container').innerHTML = renderAmazonHeader({
    showSearch: false,
    showUserInfo: false
  });

  // Render footer
  document.querySelector('.js-footer-container').innerHTML = renderFooter();

  // Update progress bar
  updateProgressBar();
});

// Update progress bar based on current status
function updateProgressBar() {
  const progressBar = document.querySelector('.progress-bar');
  const labels = document.querySelectorAll('.progress-label');
  let progress = 0;

  labels.forEach((label, index) => {
    if (label.classList.contains('completed-status')) {
      progress += 1;
    } else if (label.classList.contains('current-status')) {
      progress += 0.5;
    }
  });

  const percentage = (progress / (labels.length - 1)) * 100;
  progressBar.style.width = `${percentage}%`;
}

// Modal functions
function openModal(id) {
  document.getElementById(`${id}-modal`).classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(`${id}-modal`).classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Make modal functions globally available
window.openModal = openModal;
window.closeModal = closeModal;

// Set up event listeners for modals
document.addEventListener('DOMContentLoaded', () => {
  // Close modal when clicking outside
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = 'auto';
    }
  });

  // Get URL parameters
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  // You can use these parameters to load order data if needed
}); 