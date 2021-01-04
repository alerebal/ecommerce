export interface CartItem {
  _id?: string;
  userId: string;
  productId: string;
  productName: string;
  price: number;
  qty: number;
}
