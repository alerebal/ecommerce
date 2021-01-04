import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/interfaces/Product';
import { MessengerService } from 'src/app/services/messenger.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product;
  userId: string;

  constructor(
    private msg: MessengerService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  handleAddToCart() {
    this.cartService.addToCart(this.userId, this.productItem).subscribe(res => {
      this.msg.sendMsg(this.productItem, 'added');
    },
    err => console.log(err));
  }

  getUser() {
    return this.userId = localStorage.getItem('userId');
  }

  sendToView(id: string) {
    this.router.navigate(['/productView/', id])
  }

}
