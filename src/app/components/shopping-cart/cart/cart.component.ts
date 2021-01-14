import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { MessengerService } from 'src/app/services/messenger.service';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/interfaces/User';
import { UsersService } from 'src/app/services/users.service';
import { userId } from 'src/app/config/global';

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
  isUser: boolean;

  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    private usersService: UsersService,
  ) {
    this.isUser = this.usersService.loggedIn();
    this.userId = userId;
   }

  ngOnInit(): void {
    this.getUser();
    this.handleToGetCart();
    this.loadCartItems();
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
