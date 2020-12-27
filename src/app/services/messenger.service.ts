import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject()

  constructor() { }

  sendMsg(product: Product) {
    this.subject.next(product);
  }

  getMsg() {
    return this.subject.asObservable();
  }

}
