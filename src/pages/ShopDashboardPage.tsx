import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Store, Package, Star, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface ShopData {
  id: string;
  name: string;
  description: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  logo_url: string;
}

const ShopDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [shop, setShop] = useState<ShopData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        if (!user) return;

        // Get shop owner data
        const { data: shopOwner } = await supabase
          .from('shop_owners')
          .select('shop_id')
          .eq('user_id', user.id)
          .single();

        if (!shopOwner) {
          throw new Error('No shop found');
        }

        // Get shop details
        const { data: shopData } = await supabase
          .from('shops')
          .select('*')
          .eq('id', shopOwner.shop_id)
          .single();

        if (shopData) {
          setShop(shopData);
        }
      } catch (error) {
        console.error('Error fetching shop data:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have access to any shop dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Store size={24} className="text-primary-500 mr-2" />
              <span className="font-bold text-xl">{shop.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-outline text-error-500 hover:bg-error-50 hover:border-error-500"
            >
              <LogOut size={18} className="mr-2" />
              {t('auth.signOut')}
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Package size={20} className="text-primary-500 mr-2" />
                  <span>Active Products</span>
                </div>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star size={20} className="text-warning-500 mr-2" />
                  <span>Average Rating</span>
                </div>
                <span className="font-semibold">N/A</span>
              </div>
            </div>
          </div>

          {/* Shop Information */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Shop Information</h3>
              <button className="btn btn-outline">
                <Settings size={18} className="mr-2" />
                Edit
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{shop.contact_email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Phone
                </label>
                <p className="text-gray-900">{shop.contact_phone}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Address
                </label>
                <p className="text-gray-900">{shop.address || 'Not set'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Description
                </label>
                <p className="text-gray-900">{shop.description || 'No description'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* XML Feed Section */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Product Feed</h3>
            <a href="/xml-docs" className="btn btn-primary" target="_blank">
              View XML Documentation
            </a>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 mb-4">
              To list your products on Elkor.uz, you need to provide a product feed in XML format.
              Click the button above to view the documentation and requirements.
            </p>
            
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter your XML feed URL"
                className="input flex-grow mr-2"
              />
              <button className="btn btn-primary whitespace-nowrap">
                Save Feed URL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage;