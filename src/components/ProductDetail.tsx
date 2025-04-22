import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, ArrowLeft, Package } from 'lucide-react';
import { Product } from '../types';
import Card, { CardContent, CardHeader } from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { 
  formatPrice, 
  formatDate, 
  getCategoryLabel, 
  getCategoryColor, 
  getStockLevelColor 
} from '../utils/formatters';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Products</span>
        </Link>
        
        <Link to={`/products/${product.id}/edit`}>
          <Button 
            variant="outline" 
            icon={<Edit size={16} />}
          >
            Edit Product
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader className="border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <Badge className={getCategoryColor(product.category)}>
                {getCategoryLabel(product.category)}
              </Badge>
              <h1 className="text-2xl font-bold mt-2">{product.name}</h1>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-2xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
              
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Product Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">ID</p>
                    <p className="font-medium">{product.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{getCategoryLabel(product.category)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created At</p>
                    <p className="font-medium">{formatDate(product.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">{formatDate(product.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-100 text-blue-600 mb-4 mx-auto">
                <Package size={32} />
              </div>
              
              <div className="text-center mb-4">
                <h3 className="font-medium">Stock Status</h3>
                <p className={`text-lg font-bold ${getStockLevelColor(product.stockQuantity)}`}>
                  {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-medium mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <Link to={`/products/${product.id}/edit`} className="block">
                    <Button 
                      variant="primary" 
                      size="md" 
                      icon={<Edit size={16} />}
                      className="w-full"
                    >
                      Edit Product
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetail;