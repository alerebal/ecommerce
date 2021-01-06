import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/interfaces/Product';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  product: Product;
  userId: string;
  slideList: any[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private msg: MessengerService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.productsService.getProduct(param.id).subscribe((product: Product) => {
        this.product = product;
        this.getSlideList()
      }
      )
    });
    this.userId = localStorage.getItem('userId');

  }

  handleAddToCart() {
    this.cartService.addToCart(this.userId, this.product).subscribe(res => {
      this.msg.sendMsg(this.product, 'added');
    })
  }

  getSlideList() {
    const arr = this.product.filePathArray;
    for(let i = 1; i < arr.length; i++) {
      this.slideList.push(arr[i]);
    }
  }

}
