import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Heart, 
  Share2, 
  Star, 
  Bell, 
  ExternalLink, 
  ShoppingCart, 
  ChevronRight,
  Info 
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProductPage: React.FC = () => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  
  // Find the product by ID
  const product = mockProducts.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  // Format price with thousand separators
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Prepare chart data for price history
  const priceHistoryData = {
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Average Price (UZS)',
        data: [
          product.price * 1.05,
          product.price * 1.03,
          product.price * 1.07,
          product.price * 1.08,
          product.price * 1.04,
          product.price * 1.02,
          product.price * 1.01,
          product.price * 0.99,
          product.price * 0.98,
          product.price * 0.97,
          product.price * 0.95,
          product.price
        ],
        borderColor: 'rgb(31, 75, 143)',
        backgroundColor: 'rgba(31, 75, 143, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${formatPrice(context.raw)} UZS`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value: any) {
            return formatPrice(value) + ' UZS';
          }
        }
      }
    }
  };
  
  // Find similar products
  const similarProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-primary-500 transition-colors">
                {t('nav.home')}
              </Link>
            </li>
            <li className="mx-2 text-gray-400">
              <ChevronRight size={14} />
            </li>
            <li>
              <Link to={`/category/${product.category}`} className="text-gray-500 hover:text-primary-500 transition-colors">
                {t(`category.${product.category.toLowerCase()}`) || product.category}
              </Link>
            </li>
            <li className="mx-2 text-gray-400">
              <ChevronRight size={14} />
            </li>
            <li className="text-gray-700 truncate">{product.name}</li>
          </ol>
        </nav>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {/* Product Image */}
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-80 object-contain"
              />
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-warning-500 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      stroke={i < Math.floor(product.rating) ? 'currentColor' : 'currentColor'}
                      className={i < Math.floor(product.rating) ? '' : 'opacity-50'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviewCount} {t('product.reviews')})
                </span>
              </div>
              
              {/* Price */}
              <div className="mb-4">
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)} {product.currency}
                  </span>
                  {product.oldPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      {formatPrice(product.oldPrice)} {product.currency}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {t('product.compareFrom')} {product.vendorCount} {t('product.vendors')}
                </p>
              </div>
              
              {/* Availability */}
              <div className="flex items-center mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                  {t('product.inStock')}
                </span>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-3 mb-6">
                <button
                  onClick={toggleFavorite}
                  className={`btn ${
                    isFavorite ? 'bg-error-50 text-error-500 border border-error-500' : 'btn-outline'
                  }`}
                >
                  <Heart size={18} className="mr-2" fill={isFavorite ? 'currentColor' : 'none'} />
                  {isFavorite ? t('product.removeFromFavorites') : t('product.addToFavorites')}
                </button>
                
                <button className="btn btn-outline">
                  <Share2 size={18} className="mr-2" />
                  Share
                </button>
              </div>
              
              {/* Set price alert */}
              <div className="p-4 bg-primary-50 rounded-lg mb-4">
                <div className="flex items-start">
                  <Bell size={20} className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{t('product.priceAlert')}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Get notified when the price drops below your target.
                    </p>
                    <div className="flex items-center">
                      <div className="relative flex-grow mr-2">
                        <input
                          type="text"
                          placeholder="Enter price"
                          className="input py-1 px-3 text-sm"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm">{product.currency}</span>
                        </div>
                      </div>
                      <button className="btn btn-primary py-1">
                        Set Alert
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Key specifications preview */}
              {product.specifications && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-900 mb-3">{t('product.specifications')}</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {product.specifications.slice(0, 3).map((spec, index) => (
                      <li key={index} className="flex">
                        <span className="font-medium w-24 flex-shrink-0">{spec.name}:</span>
                        <span>{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className="text-primary-500 hover:text-primary-600 transition-colors text-sm font-medium mt-2"
                    onClick={() => setActiveTab('specifications')}
                  >
                    View all specifications
                  </button>
                </div>
              )}
            </div>
            
            {/* Vendors */}
            <div className="lg:border-l lg:border-gray-200 lg:pl-6">
              <h2 className="font-semibold text-xl mb-4">Available from</h2>
              
              <div className="space-y-4">
                {product.vendors?.map((vendor) => (
                  <div key={vendor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <img 
                          src={vendor.logo}
                          alt={vendor.name}
                          className="w-10 h-10 object-contain mr-3"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{vendor.name}</h3>
                          <div className="flex items-center text-sm">
                            <div className="flex text-warning-500 mr-1">
                              <Star size={14} fill="currentColor" />
                            </div>
                            <span className="text-gray-600">
                              {vendor.rating.toFixed(1)} ({vendor.reviewCount})
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-lg">
                        {formatPrice(vendor.price)} {product.currency}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className={`flex items-center ${vendor.inStock ? 'text-success-600' : 'text-error-600'}`}>
                        {vendor.inStock ? t('product.inStock') : t('product.outOfStock')}
                      </span>
                      {vendor.deliveryInfo && (
                        <span className="text-gray-600">{vendor.deliveryInfo}</span>
                      )}
                    </div>
                    
                    <a
                      href={vendor.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full"
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Go to Shop
                      <ExternalLink size={14} className="ml-2" />
                    </a>
                  </div>
                ))}
                
                {/* View all vendors button */}
                <Link to={`/product/${product.id}/vendors`} className="btn btn-outline w-full">
                  View all {product.vendorCount} vendors
                </Link>
              </div>
              
              {/* Price history preview */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">{t('product.priceHistory')}</h3>
                  <button className="text-primary-500 hover:text-primary-600 transition-colors text-sm font-medium">
                    View Full History
                  </button>
                </div>
                <div className="h-40">
                  <Line data={priceHistoryData} options={chartOptions} />
                </div>
                <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
                  <Info size={14} className="mr-1" />
                  <span>Price has dropped 5% in the last 3 months</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'description'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t('product.description')}
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'specifications'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t('product.specifications')}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t('product.reviews')} ({product.reviewCount})
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p>{product.description || 'No description available.'}</p>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {product.specifications ? (
                    <div className="space-y-4">
                      {product.specifications.map((spec, index) => (
                        <div key={index} className="flex border-b border-gray-200 pb-3">
                          <span className="font-medium w-40 flex-shrink-0">{spec.name}:</span>
                          <span className="text-gray-700">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No specifications available.</p>
                  )}
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <p className="text-center py-8 text-gray-500">
                    Reviews coming soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{t('product.similar')}</h2>
              <Link 
                to={`/category/${product.category}`}
                className="text-primary-500 hover:text-primary-600 transition-colors text-sm font-medium"
              >
                View all
                <ChevronRight size={16} className="inline ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {similarProducts.map((similarProduct) => (
                <Link 
                  key={similarProduct.id} 
                  to={`/product/${similarProduct.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="bg-gray-100 p-4 aspect-square flex items-center justify-center">
                      <img 
                        src={similarProduct.image} 
                        alt={similarProduct.name}
                        className="max-h-36 object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                        {similarProduct.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="flex text-warning-500 mr-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < Math.floor(similarProduct.rating) ? 'currentColor' : 'none'}
                              stroke={i < Math.floor(similarProduct.rating) ? 'currentColor' : 'currentColor'}
                              className={i < Math.floor(similarProduct.rating) ? '' : 'opacity-50'}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {similarProduct.rating.toFixed(1)}
                        </span>
                      </div>
                      <div className="font-bold">
                        {formatPrice(similarProduct.price)} {similarProduct.currency}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;