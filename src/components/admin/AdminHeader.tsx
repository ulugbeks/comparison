import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, User, Menu, Search } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  toggleSidebar?: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, toggleSidebar }) => {
  const { t } = useTranslation();
  
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t('search.placeholder')}
              className="py-1 pl-8 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-colors w-40 md:w-60"
            />
            <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <button className="relative p-1 text-gray-500 hover:text-gray-700 transition-colors">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-error-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:block">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;