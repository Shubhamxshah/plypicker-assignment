'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import Product from '@/app/models/productmodule';

type ProductType = {
  id: string;
  productName: string;
  price: string;
  image: string;
  productDescription: string;
  department: string;
};

interface ProductContextType {
  products: ProductType[];
  fetchProducts: () => Promise<void>;
  createUpdateRequest: (productId: string, changes: Partial<ProductType>) => Promise<void>;
  syncProductsFromAPI: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const createUpdateRequest = async (productId: string, changes: Partial<ProductType>) => {
    try {
      const response = await fetch('/api/update-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, changes }),
      });
      if (!response.ok) {
        throw new Error('Failed to create update request');
      }
    } catch (error) {
      console.error('Error creating update request:', error);
      throw error;
    }
  };

  const syncProductsFromAPI = async () => {
    try {
      const response = await fetch('/api/sync-products', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to sync products from API');
      }
      await fetchProducts(); // Refresh products after sync
    } catch (error) {
      console.error('Error syncing products:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchProducts, createUpdateRequest, syncProductsFromAPI }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};