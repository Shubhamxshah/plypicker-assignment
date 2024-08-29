'use client';

import { ProductProvider } from '@/components/ProductContext';

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