export type ProductType = {
    id: string;
    productName: string;
    price: string;
    image: string;
    productDescription: string;
    department: string;
};

export type ReviewProductType = {
    id: string;
    productName: string;
    price: string;
    image: string;
    productDescription: string;
    department: string;
    status: string;
    createdAt: Date;
};