// types/product.ts

export interface Product {
    id: string;
    productName: string;
    price: string;
    image: string;
    productDescription: string;
    department: string;
}

export interface ReviewProduct {
    id: string;
    productName: string;
    price: string;
    image: string;
    productDescription: string;
    department: string;
    status: string;
    createdAt: Date;
}