// Import modules
import { initializeApp } from './modules/app.js';
import { initializeAuth } from './modules/auth.js';
import { initializeUI } from './modules/ui.js';
import { loadCategories } from './modules/categories.js';
import { loadProducts } from './modules/products.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  initializeAuth();
  initializeUI();
  loadCategories();
  loadProducts();
});