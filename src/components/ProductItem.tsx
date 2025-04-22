import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '../types';
import Card, { CardContent } from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { formatPrice, getCategoryLabel, getCategoryColor, getStockLevelColor } from '../utils/formatters';

interface ProductItemProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete }) => {
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product.id);
    }
  };

  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md">
      <CardContent className="flex flex-col h-full">
        <div className="mb-2 flex justify-between items-start">
          <Badge className={getCategoryColor(product.category)}>
            {getCategoryLabel(product.category)}
          </Badge>
          <span className="text-lg font-semibold text-blue-600">
            {formatPrice(product.price)}
          </span>
        </div>
        
        <h3 className="text-lg font-medium mb-2 flex-grow">
          <Link to={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
            {product.name}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center mb-3">
            <span className="text-sm mr-1">Stock:</span>
            <span className={`text-sm font-medium ${getStockLevelColor(product.stockQuantity)}`}>
              {product.stockQuantity > 0 ? product.stockQuantity : 'Out of stock'}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <Link to={`/products/${product.id}/edit`} className="flex-1">
              <Button 
                variant="outline"
                size="sm"
                className="w-full"
                icon={<Edit size={16} />}
              >
                Edit
              </Button>
            </Link>
            <Button 
              variant="danger"
              size="sm"
              icon={<Trash2 size={16} />}
              onClick={handleDelete}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductItem;