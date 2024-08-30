// /app/product/[id]/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaCamera } from "react-icons/fa";
import { ProductProvider, useProducts } from "@/components/ProductContext";
import { ProductType } from "@/types/types";

const EditProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { products, createUpdateRequest, fetchProducts, createReviewRequest } = useProducts();
  const [editedProduct, setEditedProduct] = useState<ProductType | null>(null);
  const [userRole, setUserRole] = useState(null);


  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch('/api/role');
        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role);
        } else {
          console.error('Failed to fetch user role');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    if (id && products.length > 0) {
      const product = products.find((p) => p.id === id);
      if (product) {
        setEditedProduct(product);
      } else {
        console.error("Product not found");
        router.push("/dashboard");
      }
    }
  }, [id, products, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct((prev) =>
          prev ? { ...prev, image: reader.result as string } : null
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!editedProduct) return;

    try {
      if (userRole === "admin") {
        const changes: Partial<ProductType> = {};
        for (const key in editedProduct) {
          if (
            editedProduct[key as keyof ProductType] !==
            products.find((p) => p.id === id)?.[key as keyof ProductType]
          ) {
            changes[key as keyof ProductType] =
              editedProduct[key as keyof ProductType];
          }
        }
        await createUpdateRequest(editedProduct.id, changes);
      } else {
        // Send all product data for review, including the id
        const reviewData: ProductType = {
          ...editedProduct,
          id: id // Ensure the id is included
        };
        await createReviewRequest(reviewData);
      }
      await fetchProducts();
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving changes:", error);
      // Show error message to user
    }
  };

  const handleCancel = () => {
    router.push(`/dashboard`);
  };

  if (!editedProduct) return <div>Loading...</div>;

  return (
    <ProductProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Product Image
            </label>
            <div className="relative">
              {editedProduct.image && (
                <img
                  src={editedProduct.image}
                  alt={editedProduct.productName}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  className="rounded"
                />
              )}
              <label className="cursor-pointer absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full">
                <FaCamera />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="productName"
            >
              Product Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="productName"
              type="text"
              name="productName"
              value={editedProduct.productName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="productDescription"
            >
              Product Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="productDescription"
              name="productDescription"
              value={editedProduct.productDescription}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="text"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="department"
            >
              Department
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="department"
              type="text"
              name="department"
              value={editedProduct.department}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSave}
            >
              {userRole === "admin" ? "Save Changes" : "Submit for Review"}
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ProductProvider>
  );
};

export default EditProductPage;