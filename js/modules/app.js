// App initialization and configuration
export const initializeApp = () => {
  // Initialize any global configurations or settings
  console.log('App initialized');
};

// Helper functions
export const formatPrice = (price, currency = 'UZS') => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + ' ' + currency;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('uz-UZ');
};