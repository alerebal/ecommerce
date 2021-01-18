import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stripeUrl } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(
    private http: HttpClient
  ) { }

  sendToken(payment: any) {
    return this.http.post(stripeUrl, {payment});
  }

  sendTokenNoUser(payment: any) {
    return this.http.post(`${stripeUrl}NoUser`, {payment})
  }
}
