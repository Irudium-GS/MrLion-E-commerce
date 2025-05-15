export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  image: string;
  category: string;
  rating: number;
  ratingCount: number;
  stock: number;
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ProductFilter {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  limit?: number;
}