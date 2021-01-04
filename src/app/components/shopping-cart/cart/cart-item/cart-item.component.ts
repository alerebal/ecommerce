import { Component, Input, OnInit } from '@angular/core';

import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: CartItem;

  constructor(
    private cartService: CartService,
    private msg: MessengerService
  ) { }

  ngOnInit(): void {
  }

  handleAddToCart(id: string, userId: string) {
    this.cartService.addProductFromCart(id, userId).subscribe(res => {
      this.msg.sendMsg(this.cartItem, 'added')
    })
  }

  handleDeleteFromCart(id: string) {
    this.cartService.deleteCartItem(id).subscribe(() => {
      this.msg.sendMsg(this.cartItem, 'deleted');
    })
  }

}
