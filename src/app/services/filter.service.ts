import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  subject = new Subject;

  constructor() { }

  // sendFilter(...params: any[]) {
  //   this.subject.next(...params)
  // }


  sendFilter(params: any) {
    this.subject.next(params)
  }

  getFilter() {
    return this.subject.asObservable();
  }

}
