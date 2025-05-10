import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Store, 
  Users, 
  Settings, 
  BarChart, 
  ChevronRight,
  LogOut
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { path: '/admin', label: t('admin.dashboard'), icon: <LayoutDashboard size={20} /> },
    { path: '/admin/products', label: t('admin.products'), icon: <Package size={20} /> },
    { path: '/admin/categories', label: t('admin.categories'), icon: <Tags size={20} /> },
    { path: '/admin/vendors', label: t('admin.vendors'), icon: <Store size={20} /> },
    { path: '/admin/users', label: t('admin.users'), icon: <Users size={20} /> },
    { path: '/admin/statistics', label: t('admin.statistics'), icon: <BarChart size={20} /> },
    { path: '/admin/settings', label: t('admin.settings'), icon: <Settings size={20} /> }
  ];
  
  return (
    <aside className="bg-gray-900 text-white w-64 flex-shrink-0 hidden md:block">
      <div className="p-4 border-b border-gray-800">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">UzbCompare</span>
          <span className="text-xs bg-primary-500 text-white px-2 py-1 rounded">Admin</span>
        </Link>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {isActive(item.path) && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 pt-4 border-t border-gray-800">
          <Link
            to="/"
            className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span>{t('nav.logout')}</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;