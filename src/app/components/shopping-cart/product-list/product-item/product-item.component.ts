import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/interfaces/Product';
import { MessengerService } from 'src/app/services/messenger.service';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product;
  localListProducts: any[] = [];
  userId: string;
  isUser: boolean;

  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    private router: Router,
    private usersService: UsersService
  ) {
    this.userId = localStorage.getItem('userId')
  }

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


  handleAddToCart() {
    this.cartService.addToCart(this.userId, this.productItem).subscribe(res => {
      this.msg.sendMsg(this.productItem, 'added');
    },
    err => console.log(err));
  }

  handleAddToCartLocal() {
    this.cartService.addToCartLocal(this.productItem);
    this.msg.sendMsg(this.productItem, 'added');
  }

  sendToView(id: string) {
    this.router.navigate(['/productView/', id])
  }

}
