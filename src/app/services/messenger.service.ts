import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject()

  constructor() { }

  sendMsg(product: any, message: string) {
    this.subject.next({product, message});
  }

  getMsg() {
    return this.subject.asObservable();
  }

}
