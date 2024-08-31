// components/ProductGrid.tsx
import React from 'react';
import ReviewProductCard from './ReviewProductCard';

interface ProductGridProps {
  products: any[];

}

const ReviewProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {products.map((product) => (
        <ReviewProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ReviewProductGrid;