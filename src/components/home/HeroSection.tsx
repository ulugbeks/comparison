import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
            {t('app.name')}
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {t('app.tagline')}
          </p>
          
          <form onSubmit={handleSearch} className="flex shadow-lg rounded-lg overflow-hidden animate-slide-up max-w-2xl mx-auto" style={{ animationDelay: '0.4s' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className="flex-grow py-4 px-6 text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-accent-500 hover:bg-accent-600 transition-colors px-6 flex items-center justify-center"
            >
              <Search size={20} className="mr-2" />
              <span className="font-medium">{t('search.button')}</span>
            </button>
          </form>
          
          <div className="mt-6 text-sm animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <span className="opacity-75 mr-2">{t('search.suggestions')}:</span>
            <div className="inline-flex flex-wrap gap-2 justify-center">
              <button 
                onClick={() => navigate('/search?q=smartphone')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full transition-colors"
              >
                Smartphone
              </button>
              <button 
                onClick={() => navigate('/search?q=laptop')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full transition-colors"
              >
                Laptop
              </button>
              <button 
                onClick={() => navigate('/search?q=headphones')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full transition-colors"
              >
                Headphones
              </button>
              <button 
                onClick={() => navigate('/search?q=television')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full transition-colors"
              >
                Television
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;