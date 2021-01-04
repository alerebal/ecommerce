export class CartItem {
  _id?: string;
  userId: string;
  productId: string;
  name: string;
  price: number;
  qty: number;

  constructor(_id: string, userId: string, productId: string, productName: string, price: number, qty: number = 1) {
    this._id = _id;
    this.userId = userId;
    this.productId = productId;
    this.name = productName;
    this.price = price;
    this.qty = qty
  }

}
