import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react';

interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

interface PriceRange {
  min: string;
  max: string;
}

interface FilterSidebarProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  priceRange: PriceRange;
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onPriceChange: (range: PriceRange) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  selectedFilters,
  priceRange,
  onFilterChange,
  onPriceChange,
  onClearFilters,
  isMobile = false,
  onCloseMobile
}) => {
  const { t } = useTranslation();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    // Initially expand first 2 filter groups
    filters.reduce((acc, filter, index) => {
      acc[filter.id] = index < 2;
      return acc;
    }, {} as Record<string, boolean>)
  );
  const [localPriceRange, setLocalPriceRange] = useState<PriceRange>(priceRange);
  
  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };
  
  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'min' | 'max') => {
    const value = e.target.value;
    // Allow only numbers and empty string
    if (value === '' || /^\d+$/.test(value)) {
      setLocalPriceRange(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };
  
  const handlePriceSubmit = () => {
    onPriceChange(localPriceRange);
  };
  
  const hasActiveFilters = () => {
    return Object.values(selectedFilters).some(group => group.length > 0) || 
           (priceRange.min !== '' || priceRange.max !== '');
  };
  
  const sidebarClasses = isMobile
    ? "fixed inset-0 z-50 bg-white overflow-auto animate-slide-up"
    : "sticky top-24 h-fit max-h-screen overflow-auto";
  
  return (
    <div className={sidebarClasses}>
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <SlidersHorizontal size={20} className="mr-2 text-primary-500" />
            <h3 className="text-lg font-medium">{t('filters.title')}</h3>
          </div>
          <button 
            onClick={onCloseMobile}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
      )}
      
      <div className="p-4">
        {/* Clear filters button */}
        {hasActiveFilters() && (
          <button
            onClick={onClearFilters}
            className="mb-4 text-primary-500 text-sm font-medium hover:text-primary-600 flex items-center"
          >
            <X size={16} className="mr-1" />
            {t('filters.clear')}
          </button>
        )}
        
        {/* Price range filter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">{t('filters.price')}</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label htmlFor="price-min" className="sr-only">Min Price</label>
              <input
                id="price-min"
                type="text"
                placeholder="Min"
                value={localPriceRange.min}
                onChange={(e) => handlePriceInputChange(e, 'min')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label htmlFor="price-max" className="sr-only">Max Price</label>
              <input
                id="price-max"
                type="text"
                placeholder="Max"
                value={localPriceRange.max}
                onChange={(e) => handlePriceInputChange(e, 'max')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
          
          <button
            onClick={handlePriceSubmit}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm transition-colors"
          >
            {t('filters.apply')}
          </button>
        </div>
        
        {/* Filter groups */}
        {filters.map((group) => (
          <div key={group.id} className="mb-6 border-t border-gray-200 pt-6 first:border-t-0 first:pt-0">
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex justify-between items-center w-full mb-3 focus:outline-none"
            >
              <h4 className="font-medium text-gray-900">{t(`filters.${group.id}`) || group.name}</h4>
              {expandedGroups[group.id] ? (
                <ChevronUp size={18} className="text-gray-500" />
              ) : (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </button>
            
            {expandedGroups[group.id] && (
              <div className="space-y-2">
                {group.options.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      id={`${group.id}-${option.id}`}
                      type="checkbox"
                      checked={selectedFilters[group.id]?.includes(option.id) || false}
                      onChange={(e) => onFilterChange(group.id, option.id, e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                    <label
                      htmlFor={`${group.id}-${option.id}`}
                      className="ml-2 text-sm text-gray-700 flex-grow"
                    >
                      {option.name}
                    </label>
                    {option.count !== undefined && (
                      <span className="text-xs text-gray-500">{option.count}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isMobile && (
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={onCloseMobile}
            className="w-full py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            {t('filters.apply')}
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;