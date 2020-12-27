import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(
    private productService: ProductsService
  ) { }

  productList: Product[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(res => {
      this.productList = res;
      console.log(this.productList)
    },
    err => {console.log(err)});
  }

}
