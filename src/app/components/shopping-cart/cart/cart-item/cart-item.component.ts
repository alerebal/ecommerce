import { Component, Input, OnInit } from '@angular/core';

import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: CartItem;
  isUser: boolean;

  constructor(
    private cartService: CartService,
    private msg: MessengerService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUserLogged()
  }

  getUserLogged() {
    if(this.usersService.loggedIn()) {
      this.isUser = true
    } else {
      this.isUser = false
    }
  }

  handleAddToCart(productId: string, userId: string) {
    this.cartService.addProductFromCart(productId, userId).subscribe(res => {
      this.msg.sendMsg(this.cartItem, 'added')
    })
  }

  handleDeleteFromCart(id: string) {
    this.cartService.deleteCartItem(id).subscribe(() => {
      this.msg.sendMsg(this.cartItem, 'deleted');
    })
  }

  handleAddToCartLocal(productId: string) {
    this.cartService.addProductFromCartToLocal(productId);
    this.msg.sendMsg(this.cartItem, 'added');
  }

  handleDeleteFromCartLocal(productId: any) {
    this.cartService.deleteCartItemFromLocal(productId);
    this.msg.sendMsg(this.cartItem, 'deleted')
  }


}
