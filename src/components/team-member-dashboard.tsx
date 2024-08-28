'use client'

import React, { useEffect } from 'react';
import ProductGrid from './ProductGrid';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/components/ProductContext';

const TeamMemberDashboard: React.FC = () => {
  const { products, fetchProducts, syncProductsFromAPI } = useProducts();
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/product/${id}`);
  };

  const handleSync = async () => {
    await syncProductsFromAPI();
  };

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.15] bg-dot-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="h-{30rem} container mx-auto py-36 relative z-10">
        <h1 className="text-4xl sm:text-7xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
          Team Member Dashboard
        </h1>
        <button 
          onClick={handleSync}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Sync Products from API
        </button>
        <ProductGrid products={products} isEditable={true} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default TeamMemberDashboard;