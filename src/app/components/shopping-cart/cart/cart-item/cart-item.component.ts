import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
