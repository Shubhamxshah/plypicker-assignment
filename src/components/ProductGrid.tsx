// components/ProductGrid.tsx
import React from 'react';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: any[];
  isEditable: boolean;
  onEdit: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isEditable, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isEditable={isEditable} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default ProductGrid;