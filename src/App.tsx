import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import SearchResultsPage from './pages/SearchResultsPage';
import UserProfilePage from './pages/UserProfilePage';
import DemoUserProfilePage from './pages/DemoUserProfilePage';
import ShopProfilePage from './pages/ShopProfilePage';
import ShopDashboardPage from './pages/ShopDashboardPage';
import XmlDocsPage from './pages/XmlDocsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminVendorsPage from './pages/admin/AdminVendorsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminStatisticsPage from './pages/admin/AdminStatisticsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<HomePage />} />
        <Route path="category/:categoryId" element={<CategoryPage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="search" element={<SearchResultsPage />} />
        <Route path="profile" element={<UserProfilePage />} />
        <Route path="demo-profile" element={<DemoUserProfilePage />} />
        <Route path="shop/:shopId" element={<ShopProfilePage />} />
        <Route path="xml-docs" element={<XmlDocsPage />} />
        
        {/* Shop routes */}
        <Route path="shop-dashboard" element={<ShopDashboardPage />} />
        
        {/* Admin routes */}
        <Route path="admin" element={<AdminDashboardPage />} />
        <Route path="admin/products" element={<AdminProductsPage />} />
        <Route path="admin/vendors" element={<AdminVendorsPage />} />
        <Route path="admin/categories" element={<AdminCategoriesPage />} />
        <Route path="admin/users" element={<AdminUsersPage />} />
        <Route path="admin/settings" element={<AdminSettingsPage />} />
        <Route path="admin/statistics" element={<AdminStatisticsPage />} />
        
        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;