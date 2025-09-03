export interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
}

export interface ProductCategory {
    id: string;
    name: string;
    products: Product[];
}
