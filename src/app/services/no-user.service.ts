import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NoUser } from '../interfaces/NoUser';
import { noUserUrl } from '../config/api';


@Injectable({
  providedIn: 'root'
})
export class NoUserService {

  constructor(
    private http: HttpClient
  ) { }

  sendNoUser(noUser: NoUser) {
    return this.http.post(noUserUrl, noUser)
  }
}
