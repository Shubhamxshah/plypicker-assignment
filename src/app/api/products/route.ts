import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/app/dbconfig/dbconfig';
import Product from '@/app/models/productmodule';

connect();

export async function GET(request: NextRequest) {
    try {
        const products = await Product.find({}).lean();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'An error occurred while fetching products' }, { status: 500 });
    }
}