import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ReviewProduct } from '../types/Product';

interface ReviewProductCardProps {
  product: ReviewProduct;
}

const ReviewProductCard: React.FC<ReviewProductCardProps> = ({ product }) => {
  const [imageSrc, setImageSrc] = useState(product.image);
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    setImageSrc(`${product.image}?random=${product.id}`);
  }, [product.id, product.image]);

  const handleApprove = () => {
    setStatus('approved');
  };

  const handleReject = () => {
    setStatus('rejected');
  };

  return (
    <div className="bg-white bg-opacity-5 rounded overflow-hidden shadow-lg">
      <div className="flex">
        <div className="w-1/3">
          <Image 
            src={imageSrc} 
            alt={product.productName} 
            width={200} 
            height={200} 
            className="object-cover w-full h-full rounded-xl p-1"
            unoptimized
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
      <div className="flex justify-center p-4">
        {status === 'pending' && (
          <>
            <button
              onClick={handleApprove}
              className="px-4 py-2 rounded bg-green-200 text-green-800 hover:bg-green-300 mr-2"
            >
              Approve
            </button>
            <button
              onClick={handleReject}
              className="px-4 py-2 rounded bg-red-200 text-red-800 hover:bg-red-300 ml-2"
            >
              Reject
            </button>
          </>
        )}
        {status === 'approved' && (
          <div className="px-4 py-2 rounded bg-green-500 text-white">
            Approved
          </div>
        )}
        {status === 'rejected' && (
          <div className="px-4 py-2 rounded bg-red-500 text-white">
            Rejected
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewProductCard;