import { Component, OnInit } from '@angular/core';

import { FilterService } from 'src/app/services/filter.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  reset: any[] = [{}];
  resetFilter: any;

  constructor (
    private filterService: FilterService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getFilter();
  }

  getFilter() {
    this.filterService.getFilter().subscribe(res => {
      if (res !== null) {
        return false
      }
      this.onReset()
    })
  }

  onReset() {
    this.reset[0] = {}
  }


}
