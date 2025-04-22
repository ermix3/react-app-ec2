import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Package className="h-6 w-6 mr-2" />
              <span className="text-xl font-semibold">ShopiYES</span>
            </Link>
          </div>
          
          <nav className="flex space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/')} hover:bg-blue-700 transition duration-150`}
            >
              Products
            </Link>
            <Link 
              to="/products/new" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/products/new')} hover:bg-blue-700 transition duration-150`}
            >
              Add Product
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;