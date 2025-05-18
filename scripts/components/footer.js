export function renderFooter() {
  return `
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Customer Service</h3>
        <ul class="footer-links">
          <li><a onclick="openModal('help-center')">Help Center</a></li>
          <li><a onclick="openModal('returns')">Returns</a></li>
          <li><a onclick="openModal('shipping')">Shipping Info</a></li>
          <li><a onclick="openModal('contact')">Contact Us</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Policy</h3>
        <ul class="footer-links">
          <li><a onclick="openModal('privacy')">Privacy Policy</a></li>
          <li><a onclick="openModal('terms')">Terms of Service</a></li>
          <li><a onclick="openModal('cookies')">Cookie Settings</a></li>
          <li><a onclick="openModal('security')">Security</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 ZO SHOP. All rights reserved.</p>
    </div>
  </footer>
  `;
} 