import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { cartItemsUrl } from 'src/app/config/api';
import { Product } from '../interfaces/Product';
import { CartItem } from '../models/CartItem';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) { }

  addToCart(id: string, product: Product) {
    return this.http.post(`${cartItemsUrl}/${id}`, product );
  }

  addProductFromCart(id: string, userId: string) {
    return this.http.post(`${cartItemsUrl}/addProduct/${id}`, {userId});
  }

  deleteCartItem(id: string) {
    return this.http.delete(`${cartItemsUrl}/${id}`);
  }

  getCartItems(id: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${cartItemsUrl}/${id}`).pipe(
      map((result: any[]) => {

        let cartItems: CartItem[] = [];

        for(let item of result) {
          let productExists = false;

          for (let i in cartItems) {
            if (cartItems[i].productId === item.productId) {
              cartItems[i].qty++;
              productExists = true;
              break
            }
          }

          if (!productExists) {
            cartItems.push(new CartItem( item._id ,item.userId, item.productId, item.name, item.price))
          }
        }
        return cartItems;
    }))
  }

  getCarItemstoPayment(id: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${cartItemsUrl}/${id}`);
  }

}
