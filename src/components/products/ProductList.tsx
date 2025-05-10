import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Star, TrendingDown, TrendingUp, ExternalLink } from 'lucide-react';
import { Product, Vendor } from '../../types';

interface ProductListItemProps {
  product: Product;
  vendors?: Vendor[];
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const ProductList: React.FC<{ products: Product[], onToggleFavorite?: (id: string) => void }> = ({ 
  products, 
  onToggleFavorite 
}) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          vendors={product.vendors}
          isFavorite={product.isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

const ProductListItem: React.FC<ProductListItemProps> = ({ 
  product, 
  vendors, 
  isFavorite = false, 
  onToggleFavorite 
}) => {
  const { t } = useTranslation();
  
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  };
  
  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;
  
  return (
    <div className="card">
      <div className="flex flex-col md:flex-row">
        {/* Product image */}
        <Link to={`/product/${product.id}`} className="md:w-1/4 lg:w-1/5 relative">
          <div className="aspect-square bg-gray-100 rounded-t-lg md:rounded-l-lg md:rounded-t-none overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-contain p-4"
              loading="lazy"
            />
            
            {discount > 0 && (
              <div className="absolute top-2 left-2 badge badge-error">
                -{discount}%
              </div>
            )}
            
            {/* Favorite button */}
            <button
              onClick={handleFavoriteClick}
              className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md ${
                isFavorite ? 'text-error-500' : 'text-gray-400'
              } hover:text-error-500 transition-colors`}
              aria-label={isFavorite ? t('product.removeFromFavorites') : t('product.addToFavorites')}
            >
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </Link>
        
        {/* Product info */}
        <div className="p-4 md:p-5 md:w-3/4 lg:w-4/5 flex flex-col">
          <div className="flex flex-col md:flex-row">
            {/* Left column - main info */}
            <div className="md:w-2/3 pr-0 md:pr-8">
              <Link to={`/product/${product.id}`} className="block">
                <h3 className="text-lg font-medium mb-2 hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              {/* Rating */}
              <div className="flex items-center mb-3">
                <div className="flex text-warning-500 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      stroke={i < Math.floor(product.rating) ? 'currentColor' : 'currentColor'}
                      className={i < Math.floor(product.rating) ? '' : 'opacity-50'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating.toFixed(1)} ({product.reviewCount})
                </span>
              </div>
              
              {/* Short description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 md:line-clamp-3">
                {product.description || 'No description available.'}
              </p>
              
              {/* Specifications preview */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="hidden md:block">
                  <h4 className="text-sm font-medium mb-2">{t('product.specifications')}</h4>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    {product.specifications.slice(0, 3).map((spec, index) => (
                      <li key={index} className="flex">
                        <span className="font-medium mr-2">{spec.name}:</span>
                        <span>{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Right column - price and vendors */}
            <div className="md:w-1/3 mt-4 md:mt-0">
              <div className="border border-gray-200 rounded-md p-4">
                {/* Price with trend */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-col">
                    <span className={`font-bold text-xl ${product.priceChange === 'down' ? 'price-drop' : product.priceChange === 'up' ? 'price-rise' : ''}`}>
                      {formatPrice(product.price)} {product.currency}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.oldPrice)} {product.currency}
                      </span>
                    )}
                  </div>
                  
                  {product.priceChange && (
                    <div className={`flex items-center ${product.priceChange === 'down' ? 'text-success-500' : 'text-error-500'}`}>
                      {product.priceChange === 'down' ? (
                        <TrendingDown size={18} />
                      ) : (
                        <TrendingUp size={18} />
                      )}
                    </div>
                  )}
                </div>
                
                {/* Vendor info */}
                <div className="text-sm text-gray-600 mb-4">
                  {t('product.compareFrom')} {product.vendorCount} {t('product.vendors')}
                </div>
                
                {/* Top vendors */}
                {vendors && vendors.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {vendors.slice(0, 3).map((vendor) => (
                      <Link 
                        key={vendor.id}
                        to={`/vendor/${vendor.id}/product/${product.id}`}
                        className="flex items-center justify-between p-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <img 
                            src={vendor.logo} 
                            alt={vendor.name}
                            className="w-6 h-6 object-contain mr-2"
                          />
                          <span className="text-sm truncate">{vendor.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-1">
                            {formatPrice(vendor.price)} {product.currency}
                          </span>
                          <ExternalLink size={14} className="text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                
                {/* Details button */}
                <Link
                  to={`/product/${product.id}`}
                  className="btn btn-primary w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;