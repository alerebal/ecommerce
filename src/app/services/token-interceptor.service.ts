import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

import { UsersService } from 'src/app/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private usersServices: UsersService
  ) { }

  intercept(req: any, next: any) {
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.usersServices.getToken()}`
      }
    });
    return next.handle(tokenizeReq)
  }
}

