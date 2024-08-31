// ProductContext.tsx

'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductType, ReviewProductType } from '@/types/types';

interface ProductContextType {
  products: ProductType[];
  reviewProducts: ReviewProductType[];
  fetchProducts: () => Promise<void>;
  createUpdateRequest: (productId: string, changes: Partial<ProductType>) => Promise<void>;
  syncProductsFromAPI: () => Promise<void>;
  createReviewRequest: (productData: ProductType) => Promise<void>;
  fetchReviewProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [reviewProducts, setreviewProducts] = useState<ReviewProductType[]>([]);

  const fetchProducts = async () => {
    try { 
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchReviewProducts = async () => {
    try { 
      const response = await fetch('/api/reviewProducts');
      const data = await response.json();
      setreviewProducts(data);
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

  const createReviewRequest = async (productData: ProductType) => {
    try {
      const response = await fetch('/api/review-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productData}),
      });
      if (!response.ok) {
        throw new Error('Failed to create review request');
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
    <ProductContext.Provider value={{ products, reviewProducts, fetchProducts, fetchReviewProducts ,createUpdateRequest, syncProductsFromAPI, createReviewRequest }}>
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