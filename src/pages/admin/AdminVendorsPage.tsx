import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Filter, Edit, Trash2, MoreHorizontal, Star, CheckCircle, XCircle } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';
import AdminHeader from '../../components/admin/AdminHeader';

interface Vendor {
  id: string;
  name: string;
  logo: string;
  website: string;
  productsCount: number;
  rating: number;
  reviewCount: number;
  status: 'active' | 'pending' | 'suspended';
  joinedDate: string;
}

const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'UzTech Store',
    logo: 'https://images.pexels.com/photos/7616977/pexels-photo-7616977.jpeg?auto=compress&cs=tinysrgb&w=100',
    website: 'https://uztech.uz',
    productsCount: 1254,
    rating: 4.8,
    reviewCount: 892,
    status: 'active',
    joinedDate: '2023-05-12'
  },
  {
    id: '2',
    name: 'Apple Store Tashkent',
    logo: 'https://images.pexels.com/photos/7616977/pexels-photo-7616977.jpeg?auto=compress&cs=tinysrgb&w=100',
    website: 'https://apple-tashkent.uz',
    productsCount: 328,
    rating: 4.9,
    reviewCount: 1245,
    status: 'active',
    joinedDate: '2023-02-28'
  },
  {
    id: '3',
    name: 'Mobile World',
    logo: 'https://images.pexels.com/photos/7616977/pexels-photo-7616977.jpeg?auto=compress&cs=tinysrgb&w=100',
    website: 'https://mobileworld.uz',
    productsCount: 876,
    rating: 4.3,
    reviewCount: 465,
    status: 'active',
    joinedDate: '2023-08-15'
  },
  {
    id: '4',
    name: 'Tech Plaza',
    logo: 'https://images.pexels.com/photos/7616977/pexels-photo-7616977.jpeg?auto=compress&cs=tinysrgb&w=100',
    website: 'https://techplaza.uz',
    productsCount: 612,
    rating: 4.5,
    reviewCount: 327,
    status: 'active',
    joinedDate: '2023-09-02'
  },
  {
    id: '5',
    name: 'MediaPark',
    logo: 'https://images.pexels.com/photos/7616977/pexels-photo-7616977.jpeg?auto=compress&cs=tinysrgb&w=100',
    website: 'https://mediapark.uz',
    productsCount: 751,
    rating: 4.6,
    reviewCount: 512,
    status: 'active',
    joinedDate: '2023-04-18'
  },
  {
    id: '6',
    name: 'ElectroMart',
    logo: 'https://images.pexels.com/photos/7616977/pexels-photo-7616977.jpeg?auto=compress&cs=tinysrgb&w=100',
    website: 'https://electromart.uz',
    productsCount: 0,
    rating: 0,
    reviewCount: 0,
    status: 'pending',
    joinedDate: '2023-10-28'
  },
  {
    id: '7',
    name: 'CityTech',
    logo: 'https://images.pexels.com/photos/7616977/pexels-photo-7616977.jpeg?auto=compress&cs=tinysrgb&w=100',
    website: 'https://citytech.uz',
    productsCount: 329,
    rating: 4.4,
    reviewCount: 187,
    status: 'suspended',
    joinedDate: '2023-03-07'
  }
];

const AdminVendorsPage: React.FC = () => {
  const { t } = useTranslation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  
  const toggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  // Filter vendors based on search query and status filter
  const filteredVendors = mockVendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === '' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
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
        <AdminHeader title={t('admin.vendors')} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 md:px-8">
          {/* Header with actions */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-semibold text-gray-900">{t('admin.vendors')}</h1>
              <p className="text-gray-600 mt-1">Manage vendor accounts and information</p>
            </div>
            <button className="btn btn-primary">
              <Plus size={16} className="mr-2" />
              {t('admin.addNew')}
            </button>
          </div>
          
          {/* Filters and search */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="btn btn-outline">
                  <Filter size={16} className="mr-2" />
                  Filter
                </button>
                
                <select 
                  className="input py-2"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Vendors table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              src={vendor.logo}
                              alt={vendor.name}
                              className="h-10 w-10 object-cover rounded-full"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                            <div className="text-xs text-gray-500">{vendor.website}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            vendor.status === 'active' 
                              ? 'bg-success-100 text-success-800'
                              : vendor.status === 'pending'
                                ? 'bg-warning-100 text-warning-800'
                                : 'bg-error-100 text-error-800'
                          }`}
                        >
                          {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{vendor.productsCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {vendor.rating > 0 ? (
                            <>
                              <Star size={16} className="text-warning-500 mr-1" fill="currentColor" />
                              <div className="text-sm text-gray-900">{vendor.rating.toFixed(1)}</div>
                              <span className="text-xs text-gray-500 ml-1">({vendor.reviewCount})</span>
                            </>
                          ) : (
                            <span className="text-xs text-gray-500">No ratings</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(vendor.joinedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          {vendor.status === 'pending' && (
                            <>
                              <button className="p-1 text-success-500 hover:text-success-600 transition-colors">
                                <CheckCircle size={18} />
                              </button>
                              <button className="p-1 text-error-500 hover:text-error-600 transition-colors">
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
                          <button className="p-1 text-gray-500 hover:text-primary-500 transition-colors">
                            <Edit size={18} />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-error-500 transition-colors">
                            <Trash2 size={18} />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredVendors.length}</span> of{' '}
                    <span className="font-medium">{filteredVendors.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-50 text-sm font-medium text-primary-600 hover:bg-primary-100"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminVendorsPage;