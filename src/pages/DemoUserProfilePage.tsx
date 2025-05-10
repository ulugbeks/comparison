import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Heart, Bell, Clock, Settings, LogOut } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import { mockProducts } from '../data/mockData';

const DemoUserProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'favorites' | 'alerts' | 'history' | 'settings'>('favorites');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['1', '3', '6', '12']));

  // Demo user data
  const demoUser = {
    name: 'Demo User',
    email: 'demo@example.com',
    joinDate: 'January 2024',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
  };

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

  // Get favorite products
  const favoriteProducts = mockProducts
    .filter(product => favorites.has(product.id))
    .map(product => ({
      ...product,
      isFavorite: true
    }));

  // Mock price alerts
  const priceAlerts = [
    { id: '1', product: mockProducts[0], targetPrice: 9200000, currentPrice: 9500000, active: true },
    { id: '2', product: mockProducts[2], targetPrice: 16000000, currentPrice: 16500000, active: true },
    { id: '3', product: mockProducts[5], targetPrice: 2000000, currentPrice: 2300000, active: true }
  ];

  // Mock browsing history
  const browsingHistory = [
    { id: '1', product: mockProducts[3], viewedAt: new Date(Date.now() - 1000 * 60 * 30) }, // 30 minutes ago
    { id: '2', product: mockProducts[9], viewedAt: new Date(Date.now() - 1000 * 60 * 60) }, // 1 hour ago
    { id: '3', product: mockProducts[2], viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) }, // 2 hours ago
    { id: '4', product: mockProducts[7], viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 8) } // 8 hours ago
  ];

  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        {/* User Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6">
              <img
                src={demoUser.avatar}
                alt={demoUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{demoUser.name}</h1>
              <p className="text-gray-600">{demoUser.email}</p>
              <p className="text-sm text-gray-500 mt-1">Member since {demoUser.joinDate}</p>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-auto space-y-2 md:space-y-0 md:flex md:items-center md:space-x-4">
              <button className="btn btn-outline w-full md:w-auto">
                <Settings size={16} className="mr-2" />
                Edit Profile
              </button>
              <button className="btn btn-outline w-full md:w-auto text-error-500 border-error-500 hover:bg-error-50">
                <LogOut size={16} className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs and Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'favorites'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Heart size={16} className="inline mr-2" />
              {t('user.favorites')} ({favoriteProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'alerts'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Bell size={16} className="inline mr-2" />
              {t('user.priceAlerts')} ({priceAlerts.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'history'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Clock size={16} className="inline mr-2" />
              {t('user.history')}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Settings size={16} className="inline mr-2" />
              {t('user.settings')}
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Favorites */}
            {activeTab === 'favorites' && (
              <div>
                {favoriteProducts.length > 0 ? (
                  <ProductGrid 
                    products={favoriteProducts} 
                    onToggleFavorite={handleToggleFavorite} 
                  />
                ) : (
                  <div className="text-center py-8">
                    <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No favorites yet</h3>
                    <p className="text-gray-600 mb-4">
                      Add products to your favorites to keep track of them
                    </p>
                    <a href="/" className="btn btn-primary">
                      Explore Products
                    </a>
                  </div>
                )}
              </div>
            )}
            
            {/* Price Alerts */}
            {activeTab === 'alerts' && (
              <div>
                {priceAlerts.length > 0 ? (
                  <div className="space-y-4">
                    {priceAlerts.map(alert => (
                      <div key={alert.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start md:items-center flex-col md:flex-row">
                          <div className="flex items-center mb-3 md:mb-0">
                            <img 
                              src={alert.product.image} 
                              alt={alert.product.name}
                              className="w-12 h-12 object-cover rounded mr-4"
                            />
                            <div>
                              <h3 className="font-medium text-gray-900">{alert.product.name}</h3>
                              <div className="flex items-center mt-1">
                                <span className="text-sm text-gray-500">Current price:</span>
                                <span className="font-medium text-gray-900 ml-1">{alert.currentPrice.toLocaleString()} UZS</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="md:ml-auto flex items-center space-x-2 w-full md:w-auto">
                            <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-md text-sm">
                              Alert: {alert.targetPrice.toLocaleString()} UZS
                            </div>
                            
                            <button className="btn btn-sm btn-outline text-error-500 hover:bg-error-50 hover:border-error-500">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No price alerts</h3>
                    <p className="text-gray-600 mb-4">
                      Set price alerts to be notified when prices drop
                    </p>
                    <a href="/" className="btn btn-primary">
                      Browse Products
                    </a>
                  </div>
                )}
              </div>
            )}
            
            {/* Browsing History */}
            {activeTab === 'history' && (
              <div>
                <div className="space-y-4">
                  {browsingHistory.map(item => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start md:items-center flex-col md:flex-row">
                        <div className="flex items-center mb-3 md:mb-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded mr-4"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-gray-500">
                                Viewed {formatRelativeTime(item.viewedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:ml-auto flex items-center space-x-2 w-full md:w-auto">
                          <a href={`/product/${item.product.id}`} className="btn btn-sm btn-primary">
                            View Again
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Account Settings */}
            {activeTab === 'settings' && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                
                <form>
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input type="text" className="input" defaultValue="Demo" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input type="text" className="input" defaultValue="User" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input type="email" className="input" defaultValue="demo@example.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input type="tel" className="input" defaultValue="+998 90 123 45 67" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Password */}
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="text-lg font-medium mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input type="password" className="input" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input type="password" className="input" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input type="password" className="input" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Notification Settings */}
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">Price Drop Alerts</h4>
                            <p className="text-sm text-gray-600">Get notified when prices drop for your favorite products</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">Newsletter</h4>
                            <p className="text-sm text-gray-600">Receive weekly newsletter about the best deals</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button type="button" className="btn btn-outline">Cancel</button>
                      <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoUserProfilePage;