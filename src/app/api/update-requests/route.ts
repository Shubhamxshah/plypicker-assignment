import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/app/dbconfig/dbconfig';
import Product from '@/app/models/productmodule';

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { productId, changes } = await req.json();

    if (!productId || !changes) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    // Find the product
    const product = await Product.findOne({ id: productId });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Update the product
    for (const [key, value] of Object.entries(changes)) {
      if (product[key] !== undefined) {
        product[key] = value;
      }
    }

    // Save the updated product
    await product.save();

    return NextResponse.json({ message: 'Update request processed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing update request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}