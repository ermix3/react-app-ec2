import React from 'react';
import { ProductCategory } from '../types';
import { getCategoryLabel } from '../utils/formatters';

interface CategoryFilterProps {
  selectedCategory: ProductCategory | null;
  onChange: (category: ProductCategory | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onChange }) => {
  const categories = Object.values(ProductCategory);

  const handleCategoryClick = (category: ProductCategory | null) => {
    onChange(category);
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            selectedCategory === null 
              ? 'bg-blue-100 text-blue-800 font-medium' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === category 
                ? 'bg-blue-100 text-blue-800 font-medium' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {getCategoryLabel(category)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;