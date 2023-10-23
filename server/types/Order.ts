export interface Order {
  id: number;
  products: Carts[];
}

export interface Carts {
  productId: number;
  quantity: number;
}
