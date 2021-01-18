import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  cartQty: number;
  userId: string;
  isUser: boolean;

  constructor(
    public usersService: UsersService,
    private msg: MessengerService,
    private cartService: CartService
  ) {
    this.userId = localStorage.getItem('userId');
   }

  ngOnInit(): void {
    this.getIsUser()
    this.getCartQty()
  }

  getIsUser() {
    if(this.usersService.loggedIn()) {
      this.isUser = true
    } else {
      this.isUser = false
    }
    this.getUserCartQty()
  }

  getCartQty() {
    this.msg.getMsg().subscribe((res: any) => {
      const msg = res.message;
      if(msg === 'added') {
        this.cartQty++
      }
      if(msg === 'deleted') {
        this.cartQty--
      }
      if(msg === 'erased') {
        this.cartQty = 0;
      }
    })
  }

  getUserCartQty() {
    if(this.isUser) {
      this.cartService.getCartItems(this.userId).subscribe(res => {
        if(res === null) {
          this.cartQty = 0;
        } else {
          this.cartQty = res.length;
        }
      })
    } else {
      const localList = JSON.parse(localStorage.getItem('localListProducts'))
      if(localList === null) {
        this.cartQty = 0;
      } else {
        this.cartQty = localList.length;
      }
    }
  }

}
