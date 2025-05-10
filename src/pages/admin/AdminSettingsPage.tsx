import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, Globe, Mail, Bell, Shield, Database, Server } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';
import AdminHeader from '../../components/admin/AdminHeader';

const AdminSettingsPage: React.FC = () => {
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
        <AdminHeader title={t('admin.settings')} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">System Settings</h1>
            
            {/* General Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium flex items-center mb-4">
                <Globe size={20} className="mr-2 text-primary-500" />
                General Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    defaultValue="UzbCompare"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Description
                  </label>
                  <textarea
                    className="input"
                    rows={3}
                    defaultValue="Uzbekistan's premier price comparison website"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Language
                    </label>
                    <select className="input">
                      <option value="uz">O'zbekcha</option>
                      <option value="ru">Русский</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timezone
                    </label>
                    <select className="input">
                      <option value="Asia/Tashkent">Tashkent (UTC+5)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Email Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium flex items-center mb-4">
                <Mail size={20} className="mr-2 text-primary-500" />
                Email Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="smtp.example.com"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SMTP Port
                    </label>
                    <input
                      type="number"
                      className="input"
                      placeholder="587"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Encryption
                    </label>
                    <select className="input">
                      <option value="tls">TLS</option>
                      <option value="ssl">SSL</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="noreply@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="input"
                    placeholder="••••••••"
                  />
                </div>
                
                <button className="btn btn-outline">
                  Test Email Settings
                </button>
              </div>
            </div>
            
            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium flex items-center mb-4">
                <Bell size={20} className="mr-2 text-primary-500" />
                Notification Settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">New User Notifications</h3>
                    <p className="text-sm text-gray-500">Get notified when a new user registers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">New Shop Registrations</h3>
                    <p className="text-sm text-gray-500">Get notified when a new shop requests registration</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">System Alerts</h3>
                    <p className="text-sm text-gray-500">Get notified about system errors and issues</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Security Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium flex items-center mb-4">
                <Shield size={20} className="mr-2 text-primary-500" />
                Security Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Password Length
                  </label>
                  <input
                    type="number"
                    className="input"
                    defaultValue={8}
                    min={6}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password Requirements
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-primary-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Require uppercase letters</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-primary-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Require numbers</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-primary-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Require special characters</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    className="input"
                    defaultValue={60}
                    min={15}
                  />
                </div>
              </div>
            </div>
            
            {/* Cache Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium flex items-center mb-4">
                <Database size={20} className="mr-2 text-primary-500" />
                Cache Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cache Driver
                  </label>
                  <select className="input">
                    <option value="redis">Redis</option>
                    <option value="memcached">Memcached</option>
                    <option value="file">File</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cache Lifetime (minutes)
                  </label>
                  <input
                    type="number"
                    className="input"
                    defaultValue={60}
                    min={5}
                  />
                </div>
                
                <button className="btn btn-outline text-error-500 border-error-500 hover:bg-error-50">
                  Clear Cache
                </button>
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end">
              <button className="btn btn-primary">
                <Save size={18} className="mr-2" />
                Save Settings
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettingsPage;