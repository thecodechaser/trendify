export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: number;
}

export interface CartItem extends Product {
  quantity: number;
}