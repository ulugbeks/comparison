import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart3, Users, ShoppingBag, Store, Compass, DollarSign, Clock, Layers } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import StatCard from '../../components/admin/Dashboard/StatCard';
import RecentActivity from '../../components/admin/Dashboard/RecentActivity';
import { mockActivities } from '../../data/mockData';

const AdminDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 md:hidden" onClick={toggleSidebar}></div>
      )}
      
      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:static md:inset-auto md:z-auto`}>
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader title={t('admin.dashboard')} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 md:px-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Products"
              value="1,259"
              icon={<ShoppingBag size={20} />}
              change={12.5}
              color="primary"
            />
            <StatCard
              title="Active Vendors"
              value="87"
              icon={<Store size={20} />}
              change={8.1}
              color="secondary"
            />
            <StatCard
              title="Total Users"
              value="12,842"
              icon={<Users size={20} />}
              change={32.7}
              color="accent"
            />
            <StatCard
              title="Page Views"
              value="584,295"
              icon={<Compass size={20} />}
              change={-2.4}
              color="error"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <RecentActivity activities={mockActivities} />
            </div>
            
            {/* More Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Quick Stats</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-success-50 text-success-500 mr-3">
                        <DollarSign size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Total Revenue</p>
                        <p className="text-xs text-gray-500">Last 30 days</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">75,245,000 UZS</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-primary-50 text-primary-500 mr-3">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Avg. Time on Site</p>
                        <p className="text-xs text-gray-500">Last 30 days</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">3m 42s</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-warning-50 text-warning-500 mr-3">
                        <Layers size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">New Categories</p>
                        <p className="text-xs text-gray-500">Last 30 days</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">7</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-secondary-50 text-secondary-500 mr-3">
                        <BarChart3 size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Top Category</p>
                        <p className="text-xs text-gray-500">By views</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">Smartphones</p>
                  </div>
                </div>
              </div>
              
              {/* Todo List */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">To-Do List</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 mr-3"
                      />
                      <span className="text-gray-700">Review new vendor applications (5)</span>
                    </li>
                    <li className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 mr-3"
                      />
                      <span className="text-gray-700">Update featured products list</span>
                    </li>
                    <li className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 mr-3"
                        checked
                        readOnly
                      />
                      <span className="text-gray-500 line-through">Prepare monthly report</span>
                    </li>
                    <li className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 mr-3"
                      />
                      <span className="text-gray-700">Respond to user feedback tickets (3)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;