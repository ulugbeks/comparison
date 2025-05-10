import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../products/ProductGrid';
import { Product } from '../../types';
import { mockProducts } from '../../data/mockData';

interface PopularProductsProps {
  title: string;
  viewAllLink: string;
  products: Product[];
  onToggleFavorite?: (id: string) => void;
}

const PopularProducts: React.FC<PopularProductsProps> = ({
  title,
  viewAllLink,
  products,
  onToggleFavorite
}) => {
  const { t } = useTranslation();
  
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <Link 
            to={viewAllLink}
            className="flex items-center text-primary-500 hover:text-primary-600 transition-colors text-sm font-medium"
          >
            {t('nav.deals')}
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <ProductGrid products={products} onToggleFavorite={onToggleFavorite} />
      </div>
    </section>
  );
};

// Predefined components with different titles
export const PopularDeals: React.FC<{ onToggleFavorite?: (id: string) => void }> = ({ onToggleFavorite }) => {
  const { t } = useTranslation();
  return (
    <PopularProducts
      title={t('nav.deals')}
      viewAllLink="/deals"
      products={mockProducts.slice(0, 10)}
      onToggleFavorite={onToggleFavorite}
    />
  );
};

export const NewArrivals: React.FC<{ onToggleFavorite?: (id: string) => void }> = ({ onToggleFavorite }) => {
  const { t } = useTranslation();
  return (
    <PopularProducts
      title="New Arrivals"
      viewAllLink="/new-arrivals"
      products={mockProducts.slice(10, 20).sort(() => Math.random() - 0.5)}
      onToggleFavorite={onToggleFavorite}
    />
  );
};

export const TrendingProducts: React.FC<{ onToggleFavorite?: (id: string) => void }> = ({ onToggleFavorite }) => {
  const { t } = useTranslation();
  return (
    <PopularProducts
      title="Trending Products"
      viewAllLink="/trending"
      products={mockProducts.slice(0, 20).sort(() => Math.random() - 0.5).slice(0, 10)}
      onToggleFavorite={onToggleFavorite}
    />
  );
};

export default PopularProducts;