import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { Product, ProductFormData } from '../types';
import ProductForm from '../components/ProductForm';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const productId = parseInt(id, 10);
        const data = await productAPI.getProductById(productId);
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. The product may not exist or has been removed.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!id || !product) return;
    
    try {
      setIsSubmitting(true);
      const productId = parseInt(id, 10);
      await productAPI.updateProduct(productId, data);
      navigate(`/products/${productId}`);
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product. Please check your inputs and try again.');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error || 'Product not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Transform product to form data format
  const productFormData: ProductFormData = {
    name: product.name,
    description: product.description,
    price: product.price,
    stockQuantity: product.stockQuantity,
    category: product.category,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to={`/products/${id}`} className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Product</span>
        </Link>
      </div>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <p className="text-gray-600 mt-1">Update product information</p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <ProductForm 
        initialData={productFormData}
        onSubmit={handleUpdateProduct}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default EditProduct;