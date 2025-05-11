// Categories data and functionality
const categories = [
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'computers', name: 'Computers', icon: '💻' },
  { id: 'phones', name: 'Phones', icon: '📱' },
  { id: 'household', name: 'Household', icon: '🏠' },
  { id: 'appliances', name: 'Appliances', icon: '🔌' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'beauty', name: 'Beauty', icon: '💄' },
  { id: 'sports', name: 'Sports', icon: '⚽' }
];

export const loadCategories = () => {
  const categoriesGrid = document.querySelector('.categories-grid');
  if (!categoriesGrid) return;

  categoriesGrid.innerHTML = categories.map(category => `
    <a href="/category/${category.id}" class="category-card">
      <div class="category-icon">${category.icon}</div>
      <h3 class="category-name">${category.name}</h3>
    </a>
  `).join('');
};