import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/app/dbconfig/dbconfig';
import Product from '@/app/models/productmodule';

connect();

export async function POST(request: NextRequest) {
    try {
        // Fetch products from the external API
        const apiResponse = await fetch('https://64e0caef50713530432cafa1.mockapi.io/api/products');
        const apiProducts = await apiResponse.json();

        // Upsert products into the database
        for (const apiProduct of apiProducts) {
            await Product.findOneAndUpdate(
                { id: apiProduct.id },
                {
                    id: apiProduct.id,
                    productName: apiProduct.productName,
                    price: apiProduct.price,
                    image: apiProduct.image,
                    productDescription: apiProduct.productDescription,
                    department: apiProduct.department
                },
                { upsert: true, new: true }
            );
        }

        return NextResponse.json({ message: "Products synced successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error syncing products:', error);
        return NextResponse.json({ error: 'An error occurred while syncing products' }, { status: 500 });
    }
}