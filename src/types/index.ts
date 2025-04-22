export enum ProductCategory {
    ELECTRONICS = 'ELECTRONICS',
    CLOTHING = 'CLOTHING',
    BOOKS = 'BOOKS',
    FURNITURE = 'FURNITURE',
    ACCESSORIES = 'ACCESSORIES'
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: ProductCategory;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: ProductCategory;
  }