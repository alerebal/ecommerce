import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';

import { ProductsService } from 'src/app/services/products.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(
    private productService: ProductsService,
    private filterService: FilterService
  ) { }

  productList: Product[] = [];

  ngOnInit(): void {
    this.getProducts();
    this.getFilters();
  }

  getProducts() {
    this.productService.getProducts().subscribe(res => {
      this.productList = res;
    },
    err => {console.log(err)});
  }

  getFilters() {
    this.filterService.getFilter().subscribe((res: any) => {
      this.productService.getProducts().subscribe(res2 => {
        this.productList = res2;
        for(let i in res) {
          if(res.hasOwnProperty(i)) {
            let filter = i;
            this.productList = this.productList.filter(item =>
              item[filter] === res[i]
            );
          }
        }
      })
    })
  }


}
