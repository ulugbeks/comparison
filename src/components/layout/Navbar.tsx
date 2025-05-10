import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Menu, X, User, Heart, Store, Globe } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import SearchBar from '../search/SearchBar';
import LoginModal from '../auth/LoginModal';
import ShopLoginModal from '../auth/ShopLoginModal';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isShopLoginModalOpen, setIsShopLoginModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-primary-500 font-bold text-2xl">
              {t('app.name')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-500 transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/category/all" className="text-gray-700 hover:text-primary-500 transition-colors">
              {t('nav.categories')}
            </Link>
            <Link to="/deals" className="text-gray-700 hover:text-primary-500 transition-colors">
              {t('nav.deals')}
            </Link>
          </nav>

          {/* Desktop Search, User Profile, and Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {user ? (
              <>
                <Link to="/profile" className="p-2 text-gray-500 hover:text-primary-500 transition-colors">
                  <User size={20} />
                </Link>
                <Link to="/favorites" className="p-2 text-gray-500 hover:text-primary-500 transition-colors">
                  <Heart size={20} />
                </Link>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="btn btn-outline"
                >
                  {t('nav.login')}
                </button>
                <button 
                  onClick={() => setIsShopLoginModalOpen(true)}
                  className="btn btn-primary flex items-center"
                >
                  <Store size={18} className="mr-2" />
                  {t('nav.shopLogin')}
                </button>
              </>
            )}
            
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleSearch}
              className="p-2 mr-2 text-gray-500 hover:text-primary-500 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2 px-4 animate-slide-down">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="py-2 text-gray-700 hover:text-primary-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/category/all" 
              className="py-2 text-gray-700 hover:text-primary-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.categories')}
            </Link>
            <Link 
              to="/deals" 
              className="py-2 text-gray-700 hover:text-primary-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.deals')}
            </Link>
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="py-2 text-gray-700 hover:text-primary-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.profile')}
                </Link>
                <Link 
                  to="/favorites" 
                  className="py-2 text-gray-700 hover:text-primary-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.favorites')}
                </Link>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="py-2 text-gray-700 hover:text-primary-500 transition-colors text-left"
                >
                  {t('nav.login')}
                </button>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsShopLoginModalOpen(true);
                  }}
                  className="py-2 text-gray-700 hover:text-primary-500 transition-colors text-left flex items-center"
                >
                  <Store size={18} className="mr-2" />
                  {t('nav.shopLogin')}
                </button>
              </>
            )}
            <div className="py-2">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}

      {/* Expanded Search */}
      {isSearchOpen && (
        <div className="border-t border-gray-200 py-3 px-4 bg-white animate-slide-down">
          <SearchBar onSearch={handleSearchSubmit} />
        </div>
      )}

      {/* Auth Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      <ShopLoginModal 
        isOpen={isShopLoginModalOpen} 
        onClose={() => setIsShopLoginModalOpen(false)} 
      />
    </header>
  );
};

export default Navbar;