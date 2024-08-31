import { NextResponse } from 'next/server';
import  ReviewRequestProduct  from '@/models/ReviewRequestModule'; // Adjust the import path as needed

export async function POST(req: Request) {
    try {
        const { productData } = await req.json()
        
        const newReviewRequest = new ReviewRequestProduct({
          id: productData.id,
          productName: productData.productName,
          price: productData.price,
          image: productData.image,
          productDescription: productData.productDescription,
          department: productData.department,
          // status and createdAt will be set by default values in the schema
        })
  
        await newReviewRequest.save()
        
        return NextResponse.json({ message: 'Review request created successfully'}, {status: 201} );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}