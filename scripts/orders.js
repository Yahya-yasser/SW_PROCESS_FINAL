import { renderAmazonHeader } from './components/amazon-header.js';
import { renderFooter } from './components/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  // Render Amazon header with search and user info turned off
  document.querySelector('.js-amazon-header-container').innerHTML = renderAmazonHeader({
    showSearch: false,
    showUserInfo: false
  });

  // Render footer
  document.querySelector('.js-footer-container').innerHTML = renderFooter();

  // Set up modal functionality
  setupModals();
});

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

function setupModals() {
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
} 