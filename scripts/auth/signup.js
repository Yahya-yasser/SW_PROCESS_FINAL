import { auth } from '../utils/auth.js';

document.querySelector('.js-signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.querySelector('.js-name').value;
  const email = document.querySelector('.js-email').value;
  const password = document.querySelector('.js-password').value;
  const confirmPassword = document.querySelector('.js-confirm-password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  try {
    const success = await auth.signup(name, email, password);
    if (success) {
      window.location.href = 'login.html';
    }
  } catch (error) {
    alert('Signup failed: ' + error.message);
  }
}); 