import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';
import { Product } from './types/Product';

interface ProductCardProps {
  product: Product;
  isEditable: boolean;
  onEdit: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isEditable, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageSrc, setImageSrc] = useState(product.image);

  useEffect(() => {
    // Generate a unique image URL on component mount
    setImageSrc(`${product.image}?random=${product.id}`);
  }, [product.id, product.image]);

  return (
    <div 
      className="relative bg-white bg-opacity-5 rounded overflow-hidden shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex">
        <div className="w-1/3">
          <Image 
            src={imageSrc} 
            alt={product.productName} 
            width={200} 
            height={200} 
            className="object-cover w-full h-full rounded-xl p-1"
            unoptimized // This bypasses Next.js image optimization
          />
        </div>
        <div className="w-2/3 p-4">
          <div className="bg-white bg-opacity-0 p-2 rounded">
            <h3 className="text-lg font-semibold">{product.productName}</h3>
            <p className="text-sm">{product.productDescription}</p>
          </div>
          <div className="mt-4 p-2">
            <span className="text-lg font-bold">${product.price}</span>
          </div>
        </div>
      </div>
      {isEditable && isHovered && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
          onClick={() => onEdit(product.id)}
        >
          <FaEdit className="text-slate-300 text-3xl" />
        </div>
      )}
    </div>
  );
};

export default ProductCard;