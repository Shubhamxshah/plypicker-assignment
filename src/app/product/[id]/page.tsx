'use client'

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaCamera } from "react-icons/fa";
import { ProductProvider, useProducts } from "@/components/ProductContext";
import Cropper from "react-easy-crop";
import { uploadImage } from "@/lib/firebase";

const EditProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { products, createUpdateRequest, fetchProducts } = useProducts();
  const [editedProduct, setEditedProduct] = useState<ProductType | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

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

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const createCroppedImage = async (
    imageSrc: string,
    pixelCrop: any
  ): Promise<Blob> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas is empty"));
        }
      }, "image/jpeg");
    });
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const handleSave = async () => {
    if (!editedProduct) {
      console.error("No edited product to save");
      return;
    }

    try {
      console.log("Starting save process");
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
      console.log("Changes to be saved:", changes);

      // Upload cropped image to Firebase if it exists
      if (croppedAreaPixels && editedProduct.image) {
        console.log("Cropping and uploading image");
        try {
          const croppedImageBlob = await createCroppedImage(
            editedProduct.image,
            croppedAreaPixels
          );
          const file = new File([croppedImageBlob], "cropped_image.jpg", {
            type: "image/jpeg",
          });
          const imageUrl = await uploadImage(
            file,
            `products/${editedProduct.id}`
          );
          changes.image = imageUrl;
          console.log("Image uploaded successfully:", imageUrl);
        } catch (imageError) {
          console.error("Error processing or uploading image:", imageError);
        }
      }

      console.log("Calling createUpdateRequest");
      await createUpdateRequest(editedProduct.id, changes);
      console.log("createUpdateRequest completed");

      console.log("Fetching updated products");
      await fetchProducts();
      console.log("Products fetched");

      console.log("Navigating to dashboard");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error in handleSave:", error);
      alert("An error occurred while saving changes. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
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
            <div
              className="relative"
              style={{ width: "100%", height: "300px" }}
            >
              <Cropper
                image={editedProduct.image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
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
              Save Changes
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
