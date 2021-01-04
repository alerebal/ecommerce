import { Component, OnInit } from '@angular/core';

import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  brand: string;
  category: string;
  filter: any = {};

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
  }

  sendParams(params: any) {
    this.filterService.sendFilter(params);
  }

  brandSelected(e: any) {
    this.brand = e.target.id
  }

  categorySelect(e: any) {
    this.category = e.target.id
  }

  sendFilter() {
    if(this.brand){
      this.filter.brand = this.brand;
    }
    if(this.category){
      this.filter.category = this.category
    }
    this.filterService.sendFilter(this.filter);
  }

  clearFilter() {
    this.brand = '';
    this.category = '';
    this.filterService.sendFilter({})
  }
}
