import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig/dbconfig';
import Product from '@/models/productmodule';

connect();

export async function POST(request: NextRequest) {
  try {
    // Fetch products from the external API
    const apiResponse = await fetch('https://64e0caef50713530432cafa1.mockapi.io/api/products');
    const apiProducts = await apiResponse.json();

    // Get the highest ID from the database
    const highestDbProduct = await Product.findOne().sort('-id');
    const highestDbId = highestDbProduct ? parseInt(highestDbProduct.id) : 0;

    // Filter API products to only include ones with higher IDs
    const newProducts = apiProducts.filter((product: any) => parseInt(product.id) > highestDbId);

    // Insert only the new products into the database
    if (newProducts.length > 0) {
      await Product.insertMany(newProducts);
    }

    return NextResponse.json({ 
      message: `${newProducts.length} new products added successfully`,
      newProductCount: newProducts.length
    }, { status: 200 });
  } catch (error) {
    console.error('Error syncing products:', error);
    return NextResponse.json({ error: 'An error occurred while syncing products' }, { status: 500 });
  }
}