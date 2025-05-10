import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedCategories from '../components/home/FeaturedCategories';
import { PopularDeals, NewArrivals, TrendingProducts } from '../components/home/PopularProducts';

const HomePage: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
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
  
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      <div className="py-8">
        <FeaturedCategories />
        
        <PopularDeals onToggleFavorite={handleToggleFavorite} />
        
        <NewArrivals onToggleFavorite={handleToggleFavorite} />
        
        <TrendingProducts onToggleFavorite={handleToggleFavorite} />
      </div>
    </div>
  );
};

export default HomePage;