import { ProductProvider } from '@/components/ProductContext'
import React from 'react';

export default function SubmissionsLayout({
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