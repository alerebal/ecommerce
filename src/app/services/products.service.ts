import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { productsUrl } from 'src/app/config/api';
import { Product } from '../interfaces/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(productsUrl);
  }

}
