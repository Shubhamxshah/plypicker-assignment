// lib/api.ts

export const updateProduct = async (product: any) => {
    const response = await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  };
  
  export const createUpdateRequest = async (product: any) => {
    const response = await fetch('/api/update-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        changes: {
          productName: product.productName,
          productDescription: product.productDescription,
          price: product.price,
          image: product.image,
        },
      }),
    });
    if (!response.ok) throw new Error('Failed to create update request');
    return response.json();
  };
  
  // Add other API-related functions here as needed