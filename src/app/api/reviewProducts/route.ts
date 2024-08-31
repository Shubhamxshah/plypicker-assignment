import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig/dbconfig';
import ReviewRequestProduct from '@/models/ReviewRequestModule';

connect();

export async function GET(request: NextRequest) {
    try {
        const reviewproducts = await ReviewRequestProduct.find({}).lean();
        return NextResponse.json(reviewproducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'An error occurred while fetching products' }, { status: 500 });
    }
}