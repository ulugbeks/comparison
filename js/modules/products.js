// Products data and functionality
const products = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    price: 9500000,
    oldPrice: 10200000,
    image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'phones',
    rating: 4.8,
    reviewCount: 245
  },
  // Add more products as needed
];

export const loadProducts = () => {
  const productsGrid = document.querySelector('.products-grid');
  if (!productsGrid) return;

  productsGrid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">
          <span class="current-price">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
        </div>
        <div class="product-rating">
          <span class="stars">★★★★★</span>
          <span class="rating-text">${product.rating} (${product.reviewCount})</span>
        </div>
      </div>
    </div>
  `).join('');
};

const formatPrice = (price, currency = 'UZS') => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + ' ' + currency;
};