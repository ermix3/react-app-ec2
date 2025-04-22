import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { ProductFormData } from '../types';
import ProductForm from '../components/ProductForm';

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateProduct = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);
      const newProduct = await productAPI.createProduct(data);
      navigate(`/products/${newProduct.id}`);
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product. Please check your inputs and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Products</span>
        </Link>
      </div>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Product</h1>
        <p className="text-gray-600 mt-1">Add a new product to your inventory</p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <ProductForm 
        onSubmit={handleCreateProduct}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default CreateProduct;