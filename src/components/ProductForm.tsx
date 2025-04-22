import React from 'react';
import { useForm } from 'react-hook-form';
import { ProductCategory, ProductFormData } from '../types';
import { getCategoryLabel } from '../utils/formatters';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Select from './ui/Select';
import Button from './ui/Button';
import Card, { CardContent, CardFooter } from './ui/Card';

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
  isLoading: boolean;
}

const defaultValues: ProductFormData = {
  name: '',
  description: '',
  price: 0,
  stockQuantity: 0,
  category: ProductCategory.ELECTRONICS,
};

const ProductForm: React.FC<ProductFormProps> = ({ 
  initialData = defaultValues, 
  onSubmit,
  isLoading 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ProductFormData>({
    defaultValues: initialData
  });

  const categoryOptions = Object.values(ProductCategory).map(category => ({
    value: category,
    label: getCategoryLabel(category)
  }));

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Product Name"
            fullWidth
            {...register('name', { 
              required: 'Product name is required' 
            })}
            error={errors.name?.message}
          />
          
          <Select
            label="Category"
            options={categoryOptions}
            fullWidth
            {...register('category', { 
              required: 'Category is required' 
            })}
            error={errors.category?.message}
          />
          
          <div className="col-span-1 md:col-span-2">
            <Textarea
              label="Description"
              rows={4}
              fullWidth
              {...register('description', { 
                required: 'Description is required',
                minLength: {
                  value: 10,
                  message: 'Description should be at least 10 characters'
                }
              })}
              error={errors.description?.message}
            />
          </div>
          
          <Input
            label="Price"
            type="number"
            step="0.01"
            min="0"
            fullWidth
            {...register('price', { 
              required: 'Price is required',
              min: {
                value: 0.01,
                message: 'Price must be greater than 0'
              },
              valueAsNumber: true
            })}
            error={errors.price?.message}
          />
          
          <Input
            label="Stock Quantity"
            type="number"
            min="0"
            fullWidth
            {...register('stockQuantity', { 
              required: 'Stock quantity is required',
              min: {
                value: 0,
                message: 'Stock cannot be negative'
              },
              valueAsNumber: true
            })}
            error={errors.stockQuantity?.message}
          />
        </CardContent>
        
        <CardFooter className="flex justify-end">
          <Button 
            type="submit" 
            variant="primary"
            isLoading={isLoading}
          >
            {initialData.name ? 'Update Product' : 'Create Product'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProductForm;