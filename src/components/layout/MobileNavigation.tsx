import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Search, Heart, User, Grid } from 'lucide-react';

const MobileNavigation: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 px-4 z-40">
      <Link
        to="/"
        className={`flex flex-col items-center justify-center ${
          isActive('/') ? 'text-primary-500' : 'text-gray-500'
        }`}
      >
        <Home size={20} />
        <span className="text-xs mt-1">{t('nav.home')}</span>
      </Link>
      
      <Link
        to="/category/all"
        className={`flex flex-col items-center justify-center ${
          isActive('/category/all') ? 'text-primary-500' : 'text-gray-500'
        }`}
      >
        <Grid size={20} />
        <span className="text-xs mt-1">{t('nav.categories')}</span>
      </Link>
      
      <Link
        to="/search"
        className={`flex flex-col items-center justify-center ${
          isActive('/search') ? 'text-primary-500' : 'text-gray-500'
        }`}
      >
        <Search size={20} />
        <span className="text-xs mt-1">{t('search.button')}</span>
      </Link>
      
      <Link
        to="/favorites"
        className={`flex flex-col items-center justify-center ${
          isActive('/favorites') ? 'text-primary-500' : 'text-gray-500'
        }`}
      >
        <Heart size={20} />
        <span className="text-xs mt-1">{t('nav.favorites')}</span>
      </Link>
      
      <Link
        to="/profile"
        className={`flex flex-col items-center justify-center ${
          isActive('/profile') ? 'text-primary-500' : 'text-gray-500'
        }`}
      >
        <User size={20} />
        <span className="text-xs mt-1">{t('nav.profile')}</span>
      </Link>
    </nav>
  );
};

export default MobileNavigation;