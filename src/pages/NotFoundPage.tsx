import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          We couldn't find the page you're looking for. The page might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn btn-primary w-full sm:w-auto">
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          <Link to="/search" className="btn btn-outline w-full sm:w-auto">
            <Search size={18} className="mr-2" />
            Search Products
          </Link>
        </div>
        
        <button 
          onClick={() => window.history.back()}
          className="mt-8 flex items-center justify-center mx-auto text-primary-500 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;