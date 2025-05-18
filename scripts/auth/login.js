import { auth } from '../utils/auth.js';

document.querySelector('.js-login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('.js-email').value;
  const password = document.querySelector('.js-password').value;

  try {
    const success = await auth.login(email, password);
    if (success) {
      window.location.href = 'amazon.html';
    }
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
}); 