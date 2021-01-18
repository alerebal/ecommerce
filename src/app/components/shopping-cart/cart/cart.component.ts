import { Component, OnInit } from '@angular/core';

import { MessengerService } from 'src/app/services/messenger.service';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/interfaces/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList: any[] = [];
  user: User;
  userId: string;
  cartTotal: number;
  isUser: boolean;

  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    private usersService: UsersService,
  ) {
    this.userId = localStorage.getItem('userId');
   }

  ngOnInit(): void {
    this.isUserGet();
    this.handleToGetCart();
    this.loadCartItems();
  }

  isUserGet() {
    this.isUser = this.usersService.loggedIn();
    if (this.isUser) {
      this.getUser();
    }
  }

  getUser() {
    this.usersService.getUser(this.userId).subscribe(res => {
      this.user = res;
    })
  }

  handleToGetCart() {
    this.msg.getMsg().subscribe((res: any) => {
      this.loadCartItems();
    })

  }


  loadCartItems() {
    if (!this.isUser) {
      this.cartList = this.cartService.getCartItemsFromLocal();
      if(this.cartList === null) {
        this.cartList = []
      }
      this.calcCartItems()
    } else {
      this.cartService.getCartItems(this.userId).subscribe(res => {
        this.cartList = res;
        this.calcCartItems()
      })
    }
  }

  calcCartItems() {
    this.cartTotal = 0;
    this.cartList.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }


}
