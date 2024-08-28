'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';
import { useProducts } from '@/components/ProductContext';
import { Product } from '@/components/types/Product';

const EditProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { products, createUpdateRequest } = useProducts();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id && products.length > 0) {
      const product = products.find(p => p.id === id);
      if (product) {
        setEditedProduct(product);
      } else {
        // Handle product not found
        router.push('/dashboard');
      }
    }
  }, [id, products]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedProduct) return;

    try {
      // Create update request
      await createUpdateRequest(editedProduct.id, editedProduct);
      setIsEditing(false);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving changes:', error);
      // Show error message
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleImageChange = () => {
    // Implement image upload and cropping functionality here
    // You can use a library like react-image-crop for this
    // After uploading to Firebase, update the editedProduct state with the new image URL
  };

  if (!editedProduct) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 pr-4">
          <div className="relative">
            <Image 
              src={editedProduct.image} 
              alt={editedProduct.productName} 
              width={400} 
              height={400} 
              className="object-cover rounded"
            />
            {isEditing && (
              <button 
                className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full"
                onClick={handleImageChange}
              >
                <FaCamera />
              </button>
            )}
          </div>
        </div>
        <div className="md:w-1/2">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                name="productName"
                value={editedProduct.productName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="productDescription"
                value={editedProduct.productDescription}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
              <input
                type="text"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <button 
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit Changes
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{editedProduct.productName}</h2>
              <p>{editedProduct.productDescription}</p>
              <p className="text-lg font-bold">${editedProduct.price}</p>
              <button 
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;