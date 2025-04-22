import { format, parseISO } from 'date-fns';
import { ProductCategory } from '../types';

// Format price as currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Format date
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  return format(parseISO(dateString), 'MMM d, yyyy');
};

// Get category label (more human readable)
export const getCategoryLabel = (category: ProductCategory): string => {
  const labels: Record<ProductCategory, string> = {
    [ProductCategory.ELECTRONICS]: 'Electronics',
    [ProductCategory.CLOTHING]: 'Clothing',
    [ProductCategory.BOOKS]: 'Books',
    [ProductCategory.FURNITURE]: 'Furniture',
    [ProductCategory.ACCESSORIES]: 'Accessories',
  };
  return labels[category] || category;
};

// Get color based on stock level
export const getStockLevelColor = (quantity: number): string => {
  if (quantity <= 0) return 'text-red-600';
  if (quantity < 10) return 'text-amber-500';
  return 'text-emerald-600';
};

// Get category color
export const getCategoryColor = (category: ProductCategory): string => {
  const colors: Record<ProductCategory, string> = {
    [ProductCategory.ELECTRONICS]: 'bg-blue-100 text-blue-800',
    [ProductCategory.CLOTHING]: 'bg-purple-100 text-purple-800',
    [ProductCategory.BOOKS]: 'bg-amber-100 text-amber-800',
    [ProductCategory.FURNITURE]: 'bg-emerald-100 text-emerald-800',
    [ProductCategory.ACCESSORIES]: 'bg-rose-100 text-rose-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};