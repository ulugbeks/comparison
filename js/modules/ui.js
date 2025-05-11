// UI interactions and event handlers
export const initializeUI = () => {
  // Initialize search functionality
  initializeSearch();
  
  // Initialize modals
  initializeModals();
  
  // Initialize language switcher
  initializeLanguageSwitcher();
};

const initializeSearch = () => {
  const searchToggle = document.getElementById('searchToggle');
  const searchBar = document.getElementById('searchBar');
  const searchForm = document.getElementById('searchForm');
  const heroSearchForm = document.getElementById('heroSearchForm');

  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', () => {
      searchBar.classList.toggle('hidden');
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }

  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', handleSearch);
  }
};

const initializeModals = () => {
  const loginBtn = document.getElementById('loginBtn');
  const shopLoginBtn = document.getElementById('shopLoginBtn');
  const loginModal = document.getElementById('loginModal');
  const shopLoginModal = document.getElementById('shopLoginModal');
  const modalCloseButtons = document.querySelectorAll('.modal-close');
  const modalOverlays = document.querySelectorAll('.modal-overlay');

  if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', () => {
      loginModal.classList.remove('hidden');
    });
  }

  if (shopLoginBtn && shopLoginModal) {
    shopLoginBtn.addEventListener('click', () => {
      shopLoginModal.classList.remove('hidden');
    });
  }

  modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.modal').classList.add('hidden');
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      overlay.closest('.modal').classList.add('hidden');
    });
  });
};

const initializeLanguageSwitcher = () => {
  const langToggle = document.getElementById('langToggle');
  if (!langToggle) return;

  langToggle.addEventListener('click', () => {
    // Implement language switching logic here
    console.log('Language switch clicked');
  });
};

const handleSearch = (e) => {
  e.preventDefault();
  const searchInput = e.target.querySelector('input');
  if (!searchInput) return;

  const query = searchInput.value.trim();
  if (query) {
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }
};