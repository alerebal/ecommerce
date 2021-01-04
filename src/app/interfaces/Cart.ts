import { Product } from "./Product";

export interface Cart {
  _id?: string,
  userId: string,
  productList: Array<Product>
}
