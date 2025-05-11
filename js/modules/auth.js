// Authentication module
export const initializeAuth = () => {
  const loginForm = document.getElementById('loginForm');
  const shopLoginForm = document.getElementById('shopLoginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (shopLoginForm) {
    shopLoginForm.addEventListener('submit', handleShopLogin);
  }
};

const handleLogin = async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Implement your authentication logic here
    console.log('Login attempt:', { email });
    // Close modal after successful login
    document.getElementById('loginModal').classList.add('hidden');
  } catch (error) {
    console.error('Login error:', error);
  }
};

const handleShopLogin = async (e) => {
  e.preventDefault();
  const email = document.getElementById('shopEmail').value;
  const password = document.getElementById('shopPassword').value;

  try {
    // Implement your shop authentication logic here
    console.log('Shop login attempt:', { email });
    // Close modal after successful login
    document.getElementById('shopLoginModal').classList.add('hidden');
  } catch (error) {
    console.error('Shop login error:', error);
  }
};