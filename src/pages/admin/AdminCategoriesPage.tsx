import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronRight, 
  ChevronDown, 
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
import Sidebar from '../../components/admin/Sidebar';
import AdminHeader from '../../components/admin/AdminHeader';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: React.ReactNode;
  productsCount: number;
  parentId?: string;
  children?: Category[];
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    icon: <Tv size={20} />,
    productsCount: 3254,
    children: [
      {
        id: '1-1',
        name: 'Smartphones',
        slug: 'smartphones',
        icon: <Smartphone size={20} />,
        productsCount: 1257,
        parentId: '1'
      },
      {
        id: '1-2',
        name: 'Computers & Laptops',
        slug: 'computers-laptops',
        icon: <Laptop size={20} />,
        productsCount: 987,
        parentId: '1'
      },
      {
        id: '1-3',
        name: 'TV & Home Theatre',
        slug: 'tv-home-theatre',
        icon: <Tv size={20} />,
        productsCount: 432,
        parentId: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'Home & Appliances',
    slug: 'home-appliances',
    icon: <Home size={20} />,
    productsCount: 2145,
    children: [
      {
        id: '2-1',
        name: 'Kitchen Appliances',
        slug: 'kitchen-appliances',
        icon: <ShoppingCart size={20} />,
        productsCount: 854,
        parentId: '2'
      },
      {
        id: '2-2',
        name: 'Furniture',
        slug: 'furniture',
        icon: <Home size={20} />,
        productsCount: 652,
        parentId: '2'
      }
    ]
  },
  {
    id: '3',
    name: 'Fashion',
    slug: 'fashion',
    icon: <Shirt size={20} />,
    productsCount: 1876,
    children: [
      {
        id: '3-1',
        name: 'Men\'s Clothing',
        slug: 'mens-clothing',
        icon: <Shirt size={20} />,
        productsCount: 732,
        parentId: '3'
      },
      {
        id: '3-2',
        name: 'Women\'s Clothing',
        slug: 'womens-clothing',
        icon: <Shirt size={20} />,
        productsCount: 876,
        parentId: '3'
      }
    ]
  },
  {
    id: '4',
    name: 'Beauty & Health',
    slug: 'beauty-health',
    icon: <Heart size={20} />,
    productsCount: 1234,
    children: []
  },
  {
    id: '5',
    name: 'Auto & Tools',
    slug: 'auto-tools',
    icon: <Car size={20} />,
    productsCount: 895,
    children: []
  }
];

const AdminCategoriesPage: React.FC = () => {
  const { t } = useTranslation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    '1': true, // Initially expand Electronics
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const toggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  // Filter categories based on search query
  const filterCategories = (categories: Category[], query: string): Category[] => {
    if (!query) return categories;
    
    return categories.filter(category => {
      const matchesName = category.name.toLowerCase().includes(query.toLowerCase());
      let filteredChildren: Category[] = [];
      
      if (category.children && category.children.length > 0) {
        filteredChildren = filterCategories(category.children, query);
      }
      
      if (filteredChildren.length > 0) {
        return {
          ...category,
          children: filteredChildren
        };
      }
      
      return matchesName;
    });
  };
  
  const filteredCategories = filterCategories(mockCategories, searchQuery);
  
  // Recursively render category tree
  const renderCategoryTree = (categories: Category[], level = 0) => {
    return categories.map(category => (
      <React.Fragment key={category.id}>
        <tr 
          className={`hover:bg-gray-50 ${selectedCategory === category.id ? 'bg-primary-50' : ''}`}
          onClick={() => setSelectedCategory(category.id)}
        >
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
              {category.children && category.children.length > 0 ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategory(category.id);
                  }}
                  className="mr-2 text-gray-400 hover:text-gray-600"
                >
                  {expandedCategories[category.id] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
              ) : (
                <div className="w-4 mr-2"></div>
              )}
              <div className="flex items-center">
                <div className="p-1 rounded-md bg-gray-100 text-gray-700 mr-2">
                  {category.icon}
                </div>
                <div className="text-sm font-medium text-gray-900">{category.name}</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-500">{category.slug}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {category.productsCount}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <button className="p-1 text-gray-500 hover:text-primary-500 transition-colors">
                <Edit size={18} />
              </button>
              <button className="p-1 text-gray-500 hover:text-error-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </td>
        </tr>
        
        {/* Render children if category is expanded */}
        {category.children && 
          category.children.length > 0 && 
          expandedCategories[category.id] && 
          renderCategoryTree(category.children, level + 1)}
      </React.Fragment>
    ));
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
        <AdminHeader title={t('admin.categories')} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 md:px-8">
          {/* Header with actions */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-semibold text-gray-900">{t('admin.categories')}</h1>
              <p className="text-gray-600 mt-1">Manage product categories and hierarchy</p>
            </div>
            <button className="btn btn-primary">
              <Plus size={16} className="mr-2" />
              {t('admin.addNew')}
            </button>
          </div>
          
          {/* Search */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Categories tree */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Slug
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Products
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {renderCategoryTree(filteredCategories)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Category edit form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedCategory ? 'Edit Category' : 'Category Details'}
                </h2>
                
                {selectedCategory ? (
                  <form>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="category-name" className="block text-sm font-medium text-gray-700 mb-1">
                          Category Name
                        </label>
                        <input
                          type="text"
                          id="category-name"
                          className="input"
                          defaultValue={mockCategories.find(c => c.id === selectedCategory)?.name || ''}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="category-slug" className="block text-sm font-medium text-gray-700 mb-1">
                          Slug
                        </label>
                        <input
                          type="text"
                          id="category-slug"
                          className="input"
                          defaultValue={mockCategories.find(c => c.id === selectedCategory)?.slug || ''}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="category-parent" className="block text-sm font-medium text-gray-700 mb-1">
                          Parent Category
                        </label>
                        <select id="category-parent" className="input py-2">
                          <option value="">None (Top Level)</option>
                          {mockCategories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="category-icon" className="block text-sm font-medium text-gray-700 mb-1">
                          Icon
                        </label>
                        <select id="category-icon" className="input py-2">
                          <option value="tv">TV</option>
                          <option value="smartphone">Smartphone</option>
                          <option value="laptop">Laptop</option>
                          <option value="home">Home</option>
                          <option value="shirt">Shirt</option>
                        </select>
                      </div>
                      
                      <div className="flex justify-end space-x-3 pt-4">
                        <button 
                          type="button" 
                          className="btn btn-outline"
                          onClick={() => setSelectedCategory(null)}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                    <p>Select a category to edit</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;