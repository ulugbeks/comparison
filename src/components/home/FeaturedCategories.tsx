import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Smartphone, 
  Tv, 
  Laptop, 
  Home, 
  ShoppingBag, 
  ShoppingCart, 
  Shirt, 
  Car, 
  Heart 
} from 'lucide-react';

const FeaturedCategories: React.FC = () => {
  const { t } = useTranslation();
  
  const categories = [
    { id: 'electronics', name: t('category.electronics'), icon: <Tv size={24} />, color: 'bg-blue-50 text-blue-500' },
    { id: 'phones', name: t('category.phones'), icon: <Smartphone size={24} />, color: 'bg-purple-50 text-purple-500' },
    { id: 'computers', name: t('category.computers'), icon: <Laptop size={24} />, color: 'bg-indigo-50 text-indigo-500' },
    { id: 'household', name: t('category.household'), icon: <Home size={24} />, color: 'bg-green-50 text-green-500' },
    { id: 'appliances', name: t('category.appliances'), icon: <ShoppingCart size={24} />, color: 'bg-yellow-50 text-yellow-500' },
    { id: 'fashion', name: t('category.fashion'), icon: <Shirt size={24} />, color: 'bg-pink-50 text-pink-500' },
    { id: 'beauty', name: t('category.beauty'), icon: <Heart size={24} />, color: 'bg-red-50 text-red-500' },
    { id: 'auto', name: t('category.auto'), icon: <Car size={24} />, color: 'bg-gray-50 text-gray-500' }
  ];
  
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">{t('category.all')}</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`}
              className="flex flex-col items-center p-4 rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${category.color} mb-3`}>
                {category.icon}
              </div>
              <span className="text-center text-sm font-medium text-gray-700">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;