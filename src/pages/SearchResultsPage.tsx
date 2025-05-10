import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, LayoutGrid, LayoutList, X } from 'lucide-react';
import SearchBar from '../components/search/SearchBar';
import FilterSidebar from '../components/search/FilterSidebar';
import ProductGrid from '../components/products/ProductGrid';
import ProductList from '../components/products/ProductList';
import { mockProducts, mockFilters } from '../data/mockData';
import { Product } from '../types';

type ViewMode = 'grid' | 'list';
type SortOption = 'relevant' | 'priceLow' | 'priceHigh' | 'newest' | 'rating';

const SearchResultsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('relevant');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  // Handle toggling favorites
  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };
  
  // Filter and sort products when filters or sort option change
  useEffect(() => {
    let results = [...mockProducts];
    
    // Filter by search query
    if (searchQuery) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (categoryParam && categoryParam !== 'all') {
      results = results.filter(product => 
        product.category.toLowerCase() === categoryParam.toLowerCase()
      );
    }
    
    // Apply selected filters
    Object.entries(selectedFilters).forEach(([groupId, selectedOptions]) => {
      if (selectedOptions.length > 0) {
        // This is a mock implementation - in a real app, you'd have proper filter logic
        if (groupId === 'brand') {
          results = results.filter(product => 
            // Mock brand filter
            selectedOptions.some(brand => 
              product.name.toLowerCase().includes(brand.toLowerCase())
            )
          );
        } else if (groupId === 'rating') {
          const minRating = Math.min(...selectedOptions.map(opt => parseInt(opt.charAt(0))));
          if (!isNaN(minRating)) {
            results = results.filter(product => product.rating >= minRating);
          }
        }
        // Add more filter type handling as needed
      }
    });
    
    // Apply price range filter
    if (priceRange.min) {
      const minPrice = parseInt(priceRange.min);
      if (!isNaN(minPrice)) {
        results = results.filter(product => product.price >= minPrice);
      }
    }
    if (priceRange.max) {
      const maxPrice = parseInt(priceRange.max);
      if (!isNaN(maxPrice)) {
        results = results.filter(product => product.price <= maxPrice);
      }
    }
    
    // Sort products
    switch (sortBy) {
      case 'priceLow':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, you would sort by date
        results.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      // For 'relevant', use the default order
    }
    
    // Mark favorite products
    results = results.map(product => ({
      ...product,
      isFavorite: favorites.has(product.id)
    }));
    
    setFilteredProducts(results);
  }, [searchQuery, categoryParam, selectedFilters, priceRange, sortBy, favorites]);
  
  // Handle filter changes
  const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[groupId]) {
        newFilters[groupId] = [];
      }
      
      if (checked) {
        newFilters[groupId] = [...newFilters[groupId], optionId];
      } else {
        newFilters[groupId] = newFilters[groupId].filter(id => id !== optionId);
      }
      
      return newFilters;
    });
  };
  
  // Handle price range changes
  const handlePriceChange = (range: { min: string; max: string }) => {
    setPriceRange(range);
  };
  
  // Handle clearing all filters
  const handleClearFilters = () => {
    setSelectedFilters({});
    setPriceRange({ min: '', max: '' });
  };
  
  // Handle search form submission
  const handleSearch = (query: string) => {
    setSearchParams({ q: query });
  };
  
  // Handle sort option change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };
  
  // Count active filters
  const activeFilterCount = Object.values(selectedFilters).reduce(
    (count, options) => count + options.length, 
    0
  ) + (priceRange.min ? 1 : 0) + (priceRange.max ? 1 : 0);
  
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 mb-6">
        <div className="container mx-auto px-4 py-4">
          <SearchBar 
            onSearch={handleSearch} 
            initialValue={searchQuery}
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar for desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={mockFilters}
              selectedFilters={selectedFilters}
              priceRange={priceRange}
              onFilterChange={handleFilterChange}
              onPriceChange={handlePriceChange}
              onClearFilters={handleClearFilters}
            />
          </div>
          
          {/* Mobile filter sidebar */}
          {isMobileFiltersOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-30">
              <div className="relative h-full w-full max-w-xs ml-auto">
                <FilterSidebar
                  filters={mockFilters}
                  selectedFilters={selectedFilters}
                  priceRange={priceRange}
                  onFilterChange={handleFilterChange}
                  onPriceChange={handlePriceChange}
                  onClearFilters={handleClearFilters}
                  isMobile={true}
                  onCloseMobile={() => setIsMobileFiltersOpen(false)}
                />
              </div>
            </div>
          )}
          
          {/* Main content */}
          <div className="flex-1">
            {/* Results header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  {searchQuery 
                    ? `Results for "${searchQuery}"` 
                    : categoryParam 
                      ? `${t(`category.${categoryParam}`) || categoryParam}` 
                      : 'All Products'}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({filteredProducts.length} products)
                  </span>
                </h1>
                
                <div className="flex items-center">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${
                      viewMode === 'grid' 
                        ? 'text-primary-500' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${
                      viewMode === 'list' 
                        ? 'text-primary-500' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    aria-label="List view"
                  >
                    <LayoutList size={20} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-between mt-4">
                {/* Mobile filter button */}
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="md:hidden flex items-center text-gray-700 hover:text-primary-500 font-medium"
                >
                  <SlidersHorizontal size={16} className="mr-1" />
                  {t('filters.title')}
                  {activeFilterCount > 0 && (
                    <span className="ml-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                
                {/* Active filters */}
                <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                  {Object.entries(selectedFilters).map(([groupId, options]) =>
                    options.map(optionId => {
                      const group = mockFilters.find(f => f.id === groupId);
                      const option = group?.options.find(o => o.id === optionId);
                      if (group && option) {
                        return (
                          <div 
                            key={`${groupId}-${optionId}`}
                            className="flex items-center bg-gray-100 text-gray-700 text-sm rounded-full px-3 py-1"
                          >
                            <span>{group.name}: {option.name}</span>
                            <button
                              onClick={() => handleFilterChange(groupId, optionId, false)}
                              className="ml-1 text-gray-500 hover:text-gray-700"
                              aria-label={`Remove ${option.name} filter`}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        );
                      }
                      return null;
                    })
                  )}
                  
                  {priceRange.min && (
                    <div className="flex items-center bg-gray-100 text-gray-700 text-sm rounded-full px-3 py-1">
                      <span>Min: {priceRange.min} UZS</span>
                      <button
                        onClick={() => setPriceRange(prev => ({ ...prev, min: '' }))}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                        aria-label="Remove minimum price filter"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  
                  {priceRange.max && (
                    <div className="flex items-center bg-gray-100 text-gray-700 text-sm rounded-full px-3 py-1">
                      <span>Max: {priceRange.max} UZS</span>
                      <button
                        onClick={() => setPriceRange(prev => ({ ...prev, max: '' }))}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                        aria-label="Remove maximum price filter"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  
                  {activeFilterCount > 0 && (
                    <button
                      onClick={handleClearFilters}
                      className="text-primary-500 hover:text-primary-600 text-sm font-medium"
                    >
                      {t('filters.clear')}
                    </button>
                  )}
                </div>
                
                {/* Sort dropdown */}
                <div className="flex items-center mt-2 md:mt-0">
                  <label htmlFor="sort-select" className="mr-2 text-sm text-gray-600">
                    {t('filters.sort')}:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded-md text-sm p-2 focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                  >
                    <option value="relevant">{t('filters.sortOptions.relevant')}</option>
                    <option value="priceLow">{t('filters.sortOptions.priceLow')}</option>
                    <option value="priceHigh">{t('filters.sortOptions.priceHigh')}</option>
                    <option value="newest">{t('filters.sortOptions.newest')}</option>
                    <option value="rating">{t('filters.sortOptions.rating')}</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Results */}
            {filteredProducts.length > 0 ? (
              viewMode === 'grid' ? (
                <ProductGrid products={filteredProducts} onToggleFavorite={handleToggleFavorite} />
              ) : (
                <ProductList products={filteredProducts} onToggleFavorite={handleToggleFavorite} />
              )
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                  {t('search.noResults')}
                </h2>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="btn btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;