import { ProductProvider } from '@/components/ProductContext'
import React from 'react';

export default function PendingLayout({
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