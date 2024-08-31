'use client'

import React, { useEffect } from 'react';
import ReviewProductGrid from '@/components/ReviewProductGrid';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/components/ProductContext';

const PendingReqPage: React.FC = () => {
  const { reviewProducts, fetchReviewProducts } = useProducts();
  const router = useRouter();

  useEffect(() => {
    fetchReviewProducts();
  }, []);


  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.15] bg-dot-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="h-{30rem} container mx-auto py-36 relative z-10">
        <h1 className="text-4xl sm:text-7xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
          Pending Requests list
        </h1>
        <ReviewProductGrid products={reviewProducts} />
      </div>
    </div>
  );
};

export default PendingReqPage;