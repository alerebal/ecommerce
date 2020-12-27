import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { cartUrl } from 'src/app/config/api';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) { }

  addToCart(id: string, product: Product) {
    return this.http.post(`${cartUrl}/${id}`, product);
  }

}
