import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NoUser } from '../interfaces/NoUser';

@Injectable({
  providedIn: 'root'
})
export class ChangeUserStateService {

  subject = new Subject();

  constructor() { }

  sendChangeState(emailChecked: boolean, noUser: NoUser) {
    this.subject.next({emailChecked, noUser});
  }

  getState() {
    return this.subject.asObservable();
  }
}
