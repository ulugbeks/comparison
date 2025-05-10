import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BarChart as BarChartIcon, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Store, 
  Download,
  Calendar
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import Sidebar from '../../components/admin/Sidebar';
import AdminHeader from '../../components/admin/AdminHeader';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdminStatisticsPage: React.FC = () => {
  const { t } = useTranslation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('7d');
  
  const toggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Mock data for charts
  const visitorsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Visitors',
        data: [1500, 1800, 2200, 1900, 2400, 2800, 2600],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const productViewsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Product Views',
        data: [3200, 3800, 4100, 3900, 4500, 5200, 4800],
        backgroundColor: 'rgba(59, 130, 246, 0.8)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
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
        <AdminHeader title={t('admin.statistics')} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 md:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Statistics & Analytics</h1>
              <p className="text-gray-600 mt-1">Monitor your platform's performance and growth</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="input py-2"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              
              <button className="btn btn-outline">
                <Download size={16} className="mr-2" />
                Export
              </button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Users className="h-6 w-6 text-primary-500" />
                </div>
                <span className="text-sm text-success-500 flex items-center">
                  <TrendingUp size={16} className="mr-1" />
                  +12.5%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">12,842</h3>
              <p className="text-gray-600">Total Users</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-secondary-50 rounded-lg">
                  <Store className="h-6 w-6 text-secondary-500" />
                </div>
                <span className="text-sm text-success-500 flex items-center">
                  <TrendingUp size={16} className="mr-1" />
                  +8.1%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">87</h3>
              <p className="text-gray-600">Active Shops</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-accent-50 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-accent-500" />
                </div>
                <span className="text-sm text-success-500 flex items-center">
                  <TrendingUp size={16} className="mr-1" />
                  +32.7%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">1,259</h3>
              <p className="text-gray-600">Total Products</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-error-50 rounded-lg">
                  <BarChartIcon className="h-6 w-6 text-error-500" />
                </div>
                <span className="text-sm text-error-500 flex items-center">
                  <TrendingUp size={16} className="mr-1" />
                  -2.4%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">584,295</h3>
              <p className="text-gray-600">Page Views</p>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Visitors Overview</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  Last 7 days
                </div>
              </div>
              <div className="h-80">
                <Line data={visitorsData} options={chartOptions} />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Product Views</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  Last 7 days
                </div>
              </div>
              <div className="h-80">
                <Bar data={productViewsData} options={chartOptions} />
              </div>
            </div>
          </div>
          
          {/* Top Products Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CTR
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded object-cover" src="https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=100" alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">iPhone 13 Pro</div>
                          <div className="text-sm text-gray-500">Electronics</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      15,482
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      3,845
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      24.8%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded object-cover" src="https://images.pexels.com/photos/434346/pexels-photo-434346.jpeg?auto=compress&cs=tinysrgb&w=100" alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">MacBook Pro</div>
                          <div className="text-sm text-gray-500">Computers</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      12,938
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2,987
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      23.1%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminStatisticsPage;