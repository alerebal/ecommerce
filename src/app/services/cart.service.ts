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

  addToCartLocal(product: Product) {
    let localListProducts: any[] = []
    localListProducts = JSON.parse(localStorage.getItem('localListProducts'));

    if (!localListProducts) {
      localListProducts = [];
      localListProducts.push(product);
      localStorage.setItem('localListProducts', JSON.stringify(localListProducts))
    } else {
      localListProducts.push(product);
      localStorage.setItem('localListProducts', JSON.stringify(localListProducts))
    }
    return localListProducts;


    // if (!localListProducts) {
    //   localListProducts = [];
    //   localListProducts.push(newProduct);
    //   localStorage.setItem('localListProducts', JSON.stringify(localListProducts))
    // } else {
    //   localListProducts.push(newProduct);
    //   localStorage.setItem('localListProducts', JSON.stringify(localListProducts))
    // }
    // return localListProducts;
  }

  addProductFromCart(id: string, userId: string) {
    return this.http.post(`${cartItemsUrl}/addProduct/${id}`, {userId});
  }

  addProductFromCartToLocal(productId: any) {
    let localListProducts: Product[] = [];
    localListProducts = JSON.parse(localStorage.getItem('localListProducts'));
    let findOne = false;
    let i = 0
    while (!findOne) {

      if(productId === localListProducts[i]._id) {
        const newProduct = localListProducts[i];
        localListProducts.push(newProduct);
        findOne = true;
      }
      i++
    }
    return localStorage.setItem('localListProducts', JSON.stringify(localListProducts))

  }

  deleteCartItem(id: string) {
    return this.http.delete(`${cartItemsUrl}/${id}`);
  }

  deleteCartItemFromLocal(productId: any) {
    let localListProducts: Product[] = JSON.parse(localStorage.getItem('localListProducts'));
    let findOne = false;
    let i = localListProducts.length - 1;
    // While loop desc to keep product list ordered
    while (!findOne) {
      if(productId === localListProducts[i]._id) {
        const index = localListProducts.indexOf(localListProducts[i]);
        localListProducts.splice(index, 1)
        findOne = true
      }
      i--
    }
    const newListLocal = localStorage.setItem('localListProducts', JSON.stringify(localListProducts))
    return newListLocal

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

  getCartItemsFromLocal() {
    let localListProducts: Product[] = []
    let arr: CartItem[] = [];
    localListProducts = JSON.parse(localStorage.getItem('localListProducts'));

    if(!localListProducts) {
      return localListProducts
    } else {
      localListProducts.map((item: Product) => {
          arr.push(new CartItem(null, null, item._id, item.name, item.price, 1))
      })

      let cartItems: CartItem[] = [];
      for(let item of arr) {
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

    }

  }

  getCarItemstoPayment(id: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${cartItemsUrl}/${id}`);
  }

}
