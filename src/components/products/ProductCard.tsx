import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Star, TrendingDown, TrendingUp } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  currency: string;
  vendorCount: number;
  rating: number;
  reviewCount: number;
  category: string;
  isFavorite?: boolean;
  priceChange?: 'up' | 'down' | null;
  onToggleFavorite?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  price,
  oldPrice,
  currency,
  vendorCount,
  rating,
  reviewCount,
  category,
  isFavorite = false,
  priceChange = null,
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
  
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };
  
  return (
    <Link to={`/product/${id}`} className="group">
      <div className="card h-full flex flex-col transition-all duration-300 hover:scale-[1.02]">
        {/* Product image */}
        <div className="relative overflow-hidden rounded-t-lg bg-gray-100 aspect-square">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-4"
            loading="lazy"
          />
          
          {/* Discount badge */}
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
          
          {/* Category badge */}
          <div className="absolute bottom-2 left-2 badge badge-info">
            {t(`category.${category.toLowerCase()}`) || category}
          </div>
        </div>
        
        {/* Product info */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-medium text-sm mb-2 line-clamp-2 text-gray-800 group-hover:text-primary-600 transition-colors">
            {name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex text-warning-500 mr-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                  stroke={i < Math.floor(rating) ? 'currentColor' : 'currentColor'}
                  className={i < Math.floor(rating) ? '' : 'opacity-50'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {rating.toFixed(1)} ({reviewCount})
            </span>
          </div>
          
          {/* Price with trend */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <span className={`font-bold text-lg ${priceChange === 'down' ? 'price-drop' : priceChange === 'up' ? 'price-rise' : ''}`}>
                  {formatPrice(price)} {currency}
                </span>
                {oldPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(oldPrice)} {currency}
                  </span>
                )}
              </div>
              
              {priceChange && (
                <div className={`flex items-center ${priceChange === 'down' ? 'text-success-500' : 'text-error-500'}`}>
                  {priceChange === 'down' ? (
                    <TrendingDown size={16} className="mr-1" />
                  ) : (
                    <TrendingUp size={16} className="mr-1" />
                  )}
                </div>
              )}
            </div>
            
            {/* Vendor count */}
            <div className="text-xs text-gray-500">
              {t('product.compareFrom')} {vendorCount} {t('product.vendors')}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;