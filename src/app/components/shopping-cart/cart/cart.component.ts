import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/interfaces/Product';
import { MessengerService } from 'src/app/services/messenger.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList: Product[] = [];

  constructor(
    private msg: MessengerService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.handleAddToCartList();
  }

  handleAddToCartList() {
    this.msg.getMsg().subscribe((product: Product) => {
      this.cartList.push(product);
      this.cartService.addToCart('33', product).subscribe(res => {
        console.log(res);
      })
    })

  }


}
