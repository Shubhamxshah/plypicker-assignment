'use client'

import React, { useEffect } from 'react';
import ProductGrid from '@/components/ProductGrid';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/components/ProductContext';

const SubmissionsPage: React.FC = () => {
  const { reviewProducts, fetchReviewProducts } = useProducts();
  const router = useRouter();

  useEffect(() => {
    fetchReviewProducts();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.15] bg-dot-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="h-{30rem} container mx-auto py-36 relative z-10">
        <h1 className="text-4xl sm:text-7xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
          Pending Requests
        </h1>
        <ProductGrid products={reviewProducts} isEditable={false} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default SubmissionsPage;