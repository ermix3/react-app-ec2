import React, { useState } from 'react';
import { Plus, Search, SortAsc, SortDesc } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, ProductCategory } from '../types';
import Button from './ui/Button';
import ProductItem from './ProductItem';
import CategoryFilter from './CategoryFilter';

interface ProductListProps {
  products: Product[];
  onDelete: (id: number) => void;
  isLoading: boolean;
}

type SortField = 'name' | 'price' | 'stockQuantity';
type SortDirection = 'asc' | 'desc';

const ProductList: React.FC<ProductListProps> = ({ products, onDelete, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Filter products by search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'price') {
      comparison = a.price - b.price;
    } else if (sortField === 'stockQuantity') {
      comparison = a.stockQuantity - b.stockQuantity;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Products</h1>
        <Link to="/products/new">
          <Button icon={<Plus size={18} />}>
            Add New Product
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => toggleSort('name')}
              className={`flex items-center px-3 py-2 text-sm border rounded ${
                sortField === 'name' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300'
              }`}
            >
              Name
              {sortField === 'name' && (
                sortDirection === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
              )}
            </button>
            
            <button
              onClick={() => toggleSort('price')}
              className={`flex items-center px-3 py-2 text-sm border rounded ${
                sortField === 'price' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300'
              }`}
            >
              Price
              {sortField === 'price' && (
                sortDirection === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
              )}
            </button>
            
            <button
              onClick={() => toggleSort('stockQuantity')}
              className={`flex items-center px-3 py-2 text-sm border rounded ${
                sortField === 'stockQuantity' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300'
              }`}
            >
              Stock
              {sortField === 'stockQuantity' && (
                sortDirection === 'asc' ? <SortAsc size={16} className="ml-1" /> : <SortDesc size={16} className="ml-1" />
              )}
            </button>
          </div>
        </div>
        
        <CategoryFilter
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map(product => (
            <ProductItem 
              key={product.id} 
              product={product} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">
            {products.length === 0 
              ? 'No products found. Start by adding your first product!' 
              : 'No products match your search criteria.'}
          </p>
          {products.length === 0 && (
            <div className="mt-4">
              <Link to="/products/new">
                <Button icon={<Plus size={18} />}>
                  Add New Product
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;