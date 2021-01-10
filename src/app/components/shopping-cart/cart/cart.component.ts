import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/interfaces/Product';
import { MessengerService } from 'src/app/services/messenger.service';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/interfaces/User';
import { UsersService } from 'src/app/services/users.service';
import { CartItem } from 'src/app/models/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList: any[] = [];
  // cartListItems: any[] = [];
  user: User;
  userId: string;
  cartTotal: number;
  // message: string = '';
  // classMsg: string;

  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.handleToGetCart();
  }

  getUser() {
    this.usersService.getUser(localStorage.getItem('userId')).subscribe(res => {
      this.user = res;
      this.userId = res._id;
      this.loadCartItems();
    })
  }

  handleToGetCart() {
    this.msg.getMsg().subscribe((res: any) => {
      this.loadCartItems();
    })

  }


  loadCartItems() {
    this.cartService.getCartItems(this.user._id).subscribe(res => {
      this.cartList = res;
      this.calcCartItems()
    })
  }

  calcCartItems() {
    this.cartTotal = 0;
    this.cartList.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }


}
