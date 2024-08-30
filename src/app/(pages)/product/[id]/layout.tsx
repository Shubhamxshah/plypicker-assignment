
import { ProductProvider } from '@/components/ProductContext'
import React from 'react';

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ProductProvider>
      {children}
    </ProductProvider>
  );
}